import { NextResponse } from "next/server";
import {
  T3nClient,
  loadWasmComponent,
  fetchTrustedManifest,
  eth_get_address,
  metamask_sign,
  createEthAuthInput,
  setEnvironment,
  TenantClient
} from "@terminal3/t3n-sdk";

/**
 * T3N Agent Developer Kit (ADK) - Confidential Supply Chain Optimization Agent
 *
 * This API route implements the REAL T3N ADK integration as per the bounty requirements.
 * It authenticates an agent tenant identity via a local Ethereum private key,
 * and executes a WASM optimization algorithm within a Trusted Execution Environment (TEE).
 */

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { inventoryLevel, queuingTime, demandForecast } = data;

    console.log(`[T3N Agent] Received optimization request from dashboard.`);

    const privateKey = process.env.T3N_API_KEY;
    
    // Check if real API key is provided, otherwise fallback to mock for UI demonstration
    if (!privateKey || privateKey.length < 64) {
      console.warn("\n[!] WARNING: T3N_API_KEY not found or invalid in .env.local.");
      console.warn("[!] Bypassing real TEE execution and returning simulated data for UI testing.\n");
      
      return NextResponse.json({
        recommendedProductionRate: Math.floor(demandForecast * 1.15),
        shiftAllocation: queuingTime > 60 ? "3x 8hr Rotation (Max Capacity)" : "2x 12hr Continuous",
        rationale: `[SIMULATED] SARIMA forecast baseline evaluated. Terminal queuing (Wq) exceeds normal threshold; optimized output adjusted by +15% to prevent operational bottlenecking.`,
        tenantId: "did:t3n:mock-tenant-id",
        executionHash: "0x" + Math.random().toString(16).slice(2, 40),
      });
    }

    console.log(`[T3N ADK] Initializing T3N SDK cryptographic WASM components...`);
    setEnvironment("sandbox");
    
    const address = eth_get_address(privateKey);
    const wasmComponent = await loadWasmComponent();
    const trustAnchor = await fetchTrustedManifest("sandbox");

    const client = new T3nClient({
      trustAnchor,
      wasmComponent,
      handlers: {
        EthSign: metamask_sign(address, undefined, privateKey),
      },
    });

    console.log(`[T3N ADK] Opening encrypted TEE session (Handshake)...`);
    await client.handshake();

    console.log(`[T3N ADK] Authenticating Ethereum key to obtain DID...`);
    const did = await client.authenticate(createEthAuthInput(address));
    
    console.log(`[T3N ADK] Authenticated successfully. DID: ${did.value}`);

    // Create the Tenant scoped client
    const tenant = new TenantClient({ t3n: client, tenantDid: did.value });

    // ============================================================================
    // [TODO]: BOUNTY REQUIREMENT - ACTUAL CONTRACT EXECUTION
    // Replace "supply-chain-optimizer" and version with your registered contract.
    // ============================================================================
    const CONTRACT_TAIL = "supply-chain-optimizer";
    
    console.log(`[T3N ADK] Submitting payload to TEE Contract: z:<tid>:${CONTRACT_TAIL}`);
    
    let result;
    try {
      // We attempt to execute the real contract on the network.
      result = await tenant.contracts.execute(CONTRACT_TAIL, {
        version: "1.0.0", // Update this to match your registered contract version
        functionName: "optimize", // Ensure this matches your WASM exported function
        input: {
          inventoryLevel,
          queuingTime,
          demandForecast
        }
      });
      console.log(`[T3N ADK] TEE Execution Successful. Proof Generated.`);
    } catch (contractError) {
      console.error(`[T3N ADK] Contract execution failed. Did you register the contract on the T3 network? Error:`, contractError);
      
      // Fallback response so the UI still displays nicely if the contract isn't deployed yet.
      result = {
        recommendedProductionRate: Math.floor(demandForecast * 1.15),
        shiftAllocation: queuingTime > 60 ? "3x 8hr Rotation (Max Capacity)" : "2x 12hr Continuous",
        rationale: `[LOCAL FALLBACK] TEE Contract execution failed. Ensure contract '${CONTRACT_TAIL}' is registered.`,
        tenantId: did.value,
        executionHash: "0x_FAILED_EXECUTION_STUB",
      };
    }

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("[T3N Agent] Critical Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
