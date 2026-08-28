"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";

export interface AuditData {
  timestamp: string;
  tenantId: string;
  executionHash: string;
  inputs: any;
  outputs: any;
}

interface Props {
  auditData: AuditData;
}

export function AuditExportButton({ auditData }: Props) {
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    const jsonStr = JSON.stringify(auditData, null, 2);

    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `t3n-audit-${auditData.executionHash?.substring(0, 8) || "export"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="group w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 rounded-lg transition-all duration-300 text-xs font-mono tracking-tight text-zinc-300 hover:text-white"
    >
      {copied ? (
        <Check className="w-4 h-4 text-[#BEF264]" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {copied ? (
        <span className="text-[#BEF264]">DATA_EXPORTED</span>
      ) : (
        "EXPORT_AUDIT_LOG"
      )}
    </button>
  );
}
