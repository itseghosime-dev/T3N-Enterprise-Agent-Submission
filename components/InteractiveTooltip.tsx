"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

interface Props {
  text: string;
}

export function InteractiveTooltip({ text }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center ml-2"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      <Info className="w-3.5 h-3.5 text-[#BEF264] hover:text-[#d9f99d] transition-colors cursor-help" />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 text-xs text-slate-300 bg-[#0A0A0A] border border-zinc-800 rounded-lg shadow-2xl z-50 text-center pointer-events-none font-mono tracking-tight"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
