// src/components/avighna/common/FeatureChip.jsx
import React from "react";

export default function FeatureChip({ icon: Icon, label, delay }) {
  return (
    <div
      className="mx-1 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 group opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
      style={{ animationDelay: delay }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
