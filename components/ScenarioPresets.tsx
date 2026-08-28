"use client";

import { motion } from "framer-motion";

export type Scenario = "Baseline" | "Peak Surge" | "Constraint (M/M/s)";

interface ScenarioMetrics {
  inventoryLevel: number;
  queuingTime: number;
  demandForecast: number;
}

interface Props {
  onSelect: (scenario: Scenario, metrics: ScenarioMetrics) => void;
  activeScenario: Scenario | null;
}

export function ScenarioPresets({ onSelect, activeScenario }: Props) {
  const presets: { name: Scenario; metrics: ScenarioMetrics }[] = [
    {
      name: "Baseline",
      metrics: { inventoryLevel: 2500, queuingTime: 15, demandForecast: 2200 },
    },
    {
      name: "Peak Surge",
      metrics: { inventoryLevel: 1200, queuingTime: 45, demandForecast: 3800 },
    },
    {
      name: "Constraint (M/M/s)",
      metrics: { inventoryLevel: 800, queuingTime: 120, demandForecast: 2500 },
    },
  ];

  return (
    <div className="flex flex-col gap-2 mb-8">
      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
        Execution Profiles
      </span>
      <div className="grid grid-cols-3 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onSelect(preset.name, preset.metrics)}
            className={`relative py-3 px-2 rounded-lg text-[10px] sm:text-xs font-mono font-medium tracking-tight transition-all duration-300 border ${
              activeScenario === preset.name
                ? "bg-[#BEF264]/10 border-[#BEF264] text-[#BEF264] shadow-[0_0_15px_rgba(190,242,100,0.15)]"
                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            {preset.name}
            {activeScenario === preset.name && (
              <motion.div
                layoutId="active-preset-indicator"
                className="absolute -top-[1px] -right-[1px] w-2 h-2 bg-[#BEF264] rounded-bl-sm"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
