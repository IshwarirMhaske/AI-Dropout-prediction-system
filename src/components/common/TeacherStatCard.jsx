// src/components/common/StatCard.jsx
import React from "react";

export default function StatCard({
  icon: Icon,
  iconBg,
  label,
  subLabel,
  value,
  pillText,
  pillToneClass,
  className = "",   // ✅ new prop
}) {
  return (
    <div
      className={`rounded-2xl bg-white/10 border border-white/10 px-4 py-3 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className={`h-9 w-9 rounded-2xl flex items-center justify-center ${iconBg}`}
        >
          {Icon && <Icon className="w-4 h-4 text-white" />}
        </div>
        {pillText && (
          <span className={`text-[11px] ${pillToneClass}`}>{pillText}</span>
        )}
      </div>
      <p className="text-[11px] text-white/70 mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-semibold">{value}</p>
        {subLabel && (
          <span className="text-[11px] text-white/70">{subLabel}</span>
        )}
      </div>
    </div>
  );
}
