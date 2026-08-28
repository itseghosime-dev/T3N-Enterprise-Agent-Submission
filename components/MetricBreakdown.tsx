"use client";

import { motion } from "framer-motion";

interface Props {
  demand: number;
  production: number;
  inventory: number;
}

export function MetricBreakdown({ demand, production, inventory }: Props) {
  const maxVal = Math.max(demand, production, inventory, 1);
  const getWidth = (val: number) => `${Math.max((val / maxVal) * 100, 5)}%`;

  return (
    <div className="mt-6 p-5 bg-[#050505] rounded-xl border border-zinc-800/80 font-mono">
      <h4 className="text-[10px] text-zinc-500 uppercase tracking-widest mb-5 flex justify-between items-center">
        <span>Capacity Analysis</span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
        </span>
      </h4>
      <div className="space-y-5">
        {[
          { label: "SARIMA Demand", val: demand, color: "bg-zinc-100" },
          { label: "Current Inventory", val: inventory, color: "bg-zinc-600" },
          {
            label: "Optimized Output",
            val: production,
            color: "bg-[#BEF264] shadow-[0_0_10px_#bef26480]",
          },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-[10px] mb-2 text-zinc-400">
              <span>{item.label}</span>
              <span className="text-zinc-200">
                {item.val.toLocaleString()} U
              </span>
            </div>
            <div className="w-full h-1 bg-zinc-900 rounded-none overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: getWidth(item.val) }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: "circOut" }}
                className={`h-full ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
