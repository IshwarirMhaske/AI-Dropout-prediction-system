// src/components/common/StatCard.jsx
import React from "react";

const StatCard = ({ label, value, tone, icon }) => {
  const toneStyles =
    tone === "success"
      ? "bg-emerald-400/20 border-emerald-300 text-emerald-50"
      : tone === "warning"
      ? "bg-amber-400/20 border-amber-300 text-amber-50"
      : "bg-white/10 border-white/30 text-white";

  return (
    <div
      className={`rounded-2xl border ${toneStyles} px-4 py-3 backdrop-blur-md shadow-sm`}
    >
      <p className="text-xs">{label}</p>
      <p className="text-xl font-bold">{value}</p>
      <div className="opacity-60">{icon}</div>
    </div>
  );
};

export default StatCard;
