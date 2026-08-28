"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface Props {
  currentStep: number;
}

export function EnclaveVerificationStepper({ currentStep }: Props) {
  const steps = [
    "Establishing DID Telemetry Session...",
    "Ingesting T3N Enclave Datasets...",
    "Executing WASM Linear Programming...",
    "Verifying Attestation & Emitting Proof",
  ];

  return (
    <div className="w-full mx-auto font-mono text-sm bg-[#050505] p-6 sm:p-8 rounded-xl border border-zinc-800/80 shadow-2xl">
      <div className="flex items-center gap-2 mb-8 border-b border-zinc-800 pb-4">
        <Terminal className="w-4 h-4 text-[#BEF264]" />
        <span className="text-zinc-400 text-xs">
          SYS_LOG // OPTIMIZATION_SEQUENCE
        </span>
      </div>
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;
          const isPending = currentStep < index;

          return (
            <div
              key={index}
              className="flex items-start gap-4 transition-opacity duration-700"
            >
              <div className="mt-1">
                {isCompleted ? (
                  <span className="text-[#BEF264]">{`[OK]`}</span>
                ) : isActive ? (
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-pink-500"
                  >{`[..]`}</motion.span>
                ) : (
                  <span className="text-zinc-700">{`[  ]`}</span>
                )}
              </div>
              <motion.div
                initial={false}
                animate={{
                  color: isCompleted
                    ? "#d4d4d8"
                    : isActive
                      ? "#BEF264"
                      : "#3f3f46",
                  opacity: isPending ? 0.3 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <p
                  className={`tracking-tight transition-all duration-500 ${isActive ? "drop-shadow-[0_0_5px_rgba(190,242,100,0.4)]" : ""}`}
                >
                  {step}
                </p>
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-[1px] bg-pink-500/50 mt-2"
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
