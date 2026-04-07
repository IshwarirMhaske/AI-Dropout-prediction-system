// src/components/common/RiskBadge.jsx
import React from "react";

export default function RiskBadge({ level }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium border";
  if (level === "High") {
    return (
      <span className={`${base} border-[#FF6B6B] bg-[#FF6B6B]/20 text-rose-50`}>
        High
      </span>
    );
  }
  if (level === "Moderate") {
    return (
      <span
        className={`${base} border-[#F59E0B] bg-[#F59E0B]/20 text-amber-50`}
      >
        Moderate
      </span>
    );
  }
  return (
    <span
      className={`${base} border-[#10B981] bg-[#10B981]/20 text-emerald-50`}
    >
      Safe
    </span>
  );
}
