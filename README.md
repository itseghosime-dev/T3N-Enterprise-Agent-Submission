# T3N Confidential Supply Chain Optimization Agent

This project is a submission for the Terminal 3 (T3N) bounty to build a maintainable enterprise agent. It implements a "Confidential Supply Chain Optimization Agent" that processes sensitive manufacturing metrics to return an optimized production schedule.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark Mode, Glassmorphism UI)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Web3/Agent Integration:** T3 Agent Developer Kit (ADK) Mock Implementation

## Project Structure
- `app/page.tsx`: The main user interface featuring a glassmorphism dashboard. Collects inventory levels, queuing times, and demand forecasts.
- `app/api/optimize/route.ts`: The Next.js API route that handles backend logic. It initializes the T3 ADK, onboards a tenant identity, securely ingests data, and simulates execution of a TEE contract.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd t3n
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Open `app/api/optimize/route.ts` and ensure your T3N credentials are set, or provide them via a `.env.local` file:
   ```env
   T3N_AGENT_DID=your_agent_did_here
   T3N_API_KEY=your_t3n_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Privacy Mechanics & TEE Integration

This agent is built with enterprise confidentiality at its core, utilizing T3N's secure infrastructure:

1. **Tenant Isolation:** When a request is made, the ADK onboards a distinct `Tenant Identity`. This ensures that data from one supply chain participant cannot bleed into or be accessed by another.
2. **Confidential Ingestion:** Metrics (inventory, queuing time, demand) are ingested securely as an encrypted payload mapped to the specific tenant ID.
3. **Trusted Execution Environment (TEE):** The core optimization logic runs inside a simulated TEE contract. The execution happens in a secure enclave, meaning that the host machine (and even the agent provider) cannot inspect the plaintext data during processing.
4. **Verifiable Outputs:** The TEE returns the recommended production rate, shift allocation, and rationale, along with an `Execution Hash` (`TxHash`) which can be used to cryptographically verify the integrity of the execution on the T3N network.

## Bug Logs

| Date | Issue | Status | Resolution |
| :--- | :--- | :--- | :--- |
| YYYY-MM-DD | Initial project generation. | Open | N/A |
| | | | |

*(Developers: Please keep this log updated as issues are identified and resolved during testing.)*

## Post-Challenge Handover Process

To ensure a smooth transition of this agent to production or to another development team:

1. **Credential Rotation:** Before handover, ensure that all mock `T3N_AGENT_DID` and `T3N_API_KEY` values are stripped from the codebase and replaced with production placeholders.
2. **Documentation Review:** Ensure all inline comments (especially those marked with `[TODO]` in `app/api/optimize/route.ts`) are reviewed and understood by the incoming team.
3. **Real ADK Integration:** Replace the mock `t3Client` in the API route with the official `@t3n/adk` npm package once available. Map the mocked methods (`init`, `onboardTenant`, `executeContract`) to their exact official equivalents.
4. **Environment Setup:** Transfer any relevant `.env` templates and deployment scripts (e.g., Vercel, Docker).
5. **Knowledge Transfer:** Schedule a 30-minute walkthrough session to demonstrate the UI flow, explain the Next.js App Router structure, and clarify the TEE execution simulation.
