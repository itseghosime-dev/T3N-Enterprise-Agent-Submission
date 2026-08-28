"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Clock,
  TrendingUp,
  ShieldCheck,
  Cpu,
  ArrowLeft,
  Activity,
  Zap,
} from "lucide-react";

// Components
import { InteractiveTooltip } from "@/components/InteractiveTooltip";
import { ScenarioPresets, Scenario } from "@/components/ScenarioPresets";
import { EnclaveVerificationStepper } from "@/components/EnclaveVerificationStepper";
import { MetricBreakdown } from "@/components/MetricBreakdown";
import { AuditExportButton } from "@/components/AuditExportButton";

export default function Home() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [showResults, setShowResults] = useState(false);

  const [formData, setFormData] = useState({
    inventoryLevel: 1500,
    queuingTime: 45,
    demandForecast: 2200,
  });

  const handleScenarioSelect = (scenario: Scenario, metrics: any) => {
    setActiveScenario(scenario);
    setFormData(metrics);
  };

  const handleOptimize = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setShowResults(true);
    setResult(null);
    setCurrentStep(0);

    try {
      // Step 1: Smooth 1.5s delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep(1);

      // Step 2: Gentle 2s ingestion phase
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStep(2);

      // Simulating heavy API response
      const simulatedData = {
        recommendedProductionRate: Math.floor(formData.demandForecast * 1.15),
        shiftAllocation:
          formData.queuingTime > 60
            ? "3x 8hr Rotation (Max Capacity)"
            : "2x 12hr Continuous",
        rationale: `SARIMA forecast baseline evaluated. Terminal queuing (Wq) exceeds normal threshold; optimized output adjusted by +15% to prevent operational bottlenecking.`,
        tenantId: "T3N-ORG-088A",
        executionHash: "0x" + Math.random().toString(16).slice(2, 40),
      };

      // Step 3: Deep WASM computation phase (2.5s)
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setCurrentStep(3);

      // Step 4: Final verification (1.5s)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep(4);

      // Brief pause before showing results
      await new Promise((resolve) => setTimeout(resolve, 600));
      setResult(simulatedData);
      setIsOptimizing(false);
    } catch (error) {
      console.error("Optimization failed:", error);
      setIsOptimizing(false);
    }
  };

  const handleRecalculate = () => {
    setShowResults(false);
    setResult(null);
  };

  return (
    <main className="min-h-[100dvh] bg-[#020202] text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#BEF264]/30 relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      {/* Header */}
      <motion.div
        layout="position"
        className="z-10 w-full max-w-6xl flex justify-between items-end mb-8 sm:mb-12 border-b border-zinc-800 pb-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-pink-500 rounded-sm animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              T3N Agent Active
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">
            CHAIN<span className="text-[#BEF264]">OPT</span>
          </h1>
        </div>
        <div className="hidden sm:flex flex-col items-end text-[10px] font-mono text-zinc-500 uppercase">
          <span>Sys: Online</span>
          <span>Ver: 2.1.0-beta</span>
        </div>
      </motion.div>

      {/* Dynamic Layout Container */}
      <motion.div
        layout
        transition={{ type: "spring", bounce: 0, duration: 0.8 }}
        className={`w-full z-10 flex flex-col lg:flex-row gap-6 sm:gap-10 ${
          showResults ? "max-w-6xl" : "max-w-md"
        }`}
      >
        {/* INPUT FORM */}
        <AnimatePresence mode="popLayout">
          {(!showResults ||
            (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
            <motion.div
              layout
              key="input-form"
              initial={
                typeof window !== "undefined" && window.innerWidth < 1024
                  ? { opacity: 0, y: 20 }
                  : false
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                typeof window !== "undefined" && window.innerWidth < 1024
                  ? { opacity: 0, scale: 0.95 }
                  : {}
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`w-full flex flex-col ${showResults ? "lg:w-5/12 hidden lg:flex" : ""}`}
            >
              <form
                onSubmit={handleOptimize}
                className="flex-1 flex flex-col bg-[#0A0A0A] border border-zinc-800/80 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-zinc-800 to-transparent opacity-30" />

                <ScenarioPresets
                  onSelect={handleScenarioSelect}
                  activeScenario={activeScenario}
                />

                <div className="space-y-6 flex-1 flex flex-col justify-center font-mono">
                  {[
                    {
                      id: "inventoryLevel",
                      label: "Current Inventory",
                      icon: <Box className="w-4 h-4 text-zinc-400" />,
                      unit: "UNITS",
                      tooltip:
                        "Total volume of units currently held in warehouse storage.",
                    },
                    {
                      id: "queuingTime",
                      label: "Avg Queuing Time (Wq)",
                      icon: <Clock className="w-4 h-4 text-zinc-400" />,
                      unit: "MINS",
                      tooltip:
                        "Queue time constraint based on M/M/s models. High wait times flag terminal bottlenecks.",
                    },
                    {
                      id: "demandForecast",
                      label: "Projected Demand",
                      icon: <TrendingUp className="w-4 h-4 text-zinc-400" />,
                      unit: "UNITS",
                      tooltip:
                        "Anticipated demand derived from SARIMA time-series forecasting baselines.",
                    },
                  ].map((field) => (
                    <div key={field.id} className="relative group">
                      <div className="flex items-center text-[11px] font-medium text-zinc-400 mb-2 uppercase tracking-wide transition-colors group-hover:text-zinc-300">
                        {field.label}
                        <InteractiveTooltip text={field.tooltip} />
                      </div>
                      <div className="relative flex items-stretch">
                        <div className="flex items-center justify-center px-4 bg-zinc-900 border border-r-0 border-zinc-800 rounded-l-lg transition-colors group-hover:border-zinc-600">
                          {field.icon}
                        </div>
                        <input
                          type="number"
                          value={formData[field.id as keyof typeof formData]}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [field.id]: Number(e.target.value),
                            });
                            setActiveScenario(null);
                          }}
                          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-r-lg px-4 py-3 text-lg text-white placeholder-zinc-700 focus:outline-none focus:border-[#BEF264] focus:bg-zinc-900 transition-all duration-300"
                          disabled={showResults}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px] pointer-events-none transition-opacity group-hover:opacity-50">
                          {field.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isOptimizing || showResults}
                  className="w-full mt-8 bg-white text-black hover:bg-[#BEF264] disabled:bg-zinc-800 disabled:text-zinc-500 py-4 px-6 rounded-lg font-bold tracking-tight uppercase transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {isOptimizing ? (
                    <Activity className="w-5 h-5 animate-pulse" />
                  ) : (
                    <Zap className="w-5 h-5 fill-current" />
                  )}
                  {isOptimizing ? "Compiling Sequence..." : "Run Sequence"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULTS SCREEN */}
        <AnimatePresence mode="wait">
          {showResults && (
            <motion.div
              layout
              key="results-screen"
              initial={
                typeof window !== "undefined" && window.innerWidth >= 1024
                  ? { opacity: 0, x: 20 }
                  : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.8 }}
              className="w-full lg:w-7/12 h-full flex flex-col bg-[#0A0A0A] border border-zinc-800/80 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              {isOptimizing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 flex flex-col items-center justify-center py-12"
                >
                  <EnclaveVerificationStepper currentStep={currentStep} />
                </motion.div>
              ) : result ? (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6 w-full flex-1 flex flex-col h-full"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-tight">
                      <ShieldCheck className="w-5 h-5 text-[#BEF264]" />
                      Computation Verified
                    </h3>
                    <div className="flex items-center gap-2 bg-[#BEF264]/10 text-[#BEF264] px-3 py-1.5 rounded text-[10px] font-mono border border-[#BEF264]/20 uppercase">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#BEF264] animate-pulse" />
                      TEE Enclave Valid
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800 transition-colors hover:border-zinc-700">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                        Target Prod. Rate
                      </div>
                      <p className="text-3xl font-black text-white tracking-tighter">
                        {result.recommendedProductionRate?.toLocaleString()}{" "}
                        <span className="text-xs text-zinc-500 font-normal font-mono">
                          U / HR
                        </span>
                      </p>
                    </div>
                    <div className="bg-zinc-900 rounded-lg p-5 border border-zinc-800 transition-colors hover:border-zinc-700">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                        Resource Shift Alloc.
                      </div>
                      <p className="text-lg font-bold text-white mt-1 tracking-tight">
                        {result.shiftAllocation}
                      </p>
                    </div>
                  </div>

                  <div className="bg-pink-500/5 rounded-lg p-5 border border-pink-500/20 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-l-lg" />
                    <div className="text-[10px] font-mono text-pink-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5" />
                      Agent Rationale
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed font-mono">
                      {result.rationale}
                    </p>
                  </div>

                  <MetricBreakdown
                    demand={formData.demandForecast}
                    production={result.recommendedProductionRate * 24}
                    inventory={formData.inventoryLevel}
                  />

                  <div className="mt-auto pt-6 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-mono text-zinc-500 bg-zinc-950 p-4 rounded-lg border border-zinc-900 break-all">
                      <div>
                        <span className="text-zinc-600 block mb-1">
                          TENANT_ID
                        </span>
                        <span className="text-zinc-300">{result.tenantId}</span>
                      </div>
                      <div>
                        <span className="text-zinc-600 block mb-1">
                          TX_HASH (ATTESTATION)
                        </span>
                        <span className="text-zinc-300">
                          {result.executionHash}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleRecalculate}
                        className="flex-1 flex justify-center items-center py-3 px-4 bg-transparent border border-zinc-700 hover:border-zinc-400 hover:bg-zinc-900 rounded-lg transition-all duration-300 text-xs font-mono tracking-tight text-white group"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2 text-zinc-500 group-hover:text-white transition-colors" />
                        RECALCULATE
                      </button>
                      <div className="flex-1">
                        <AuditExportButton
                          auditData={{
                            timestamp: new Date().toISOString(),
                            tenantId: result.tenantId,
                            executionHash: result.executionHash,
                            inputs: formData,
                            outputs: {
                              recommendedProductionRate:
                                result.recommendedProductionRate,
                              shiftAllocation: result.shiftAllocation,
                              rationale: result.rationale,
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
