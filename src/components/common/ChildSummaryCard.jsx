// src/features/parent/components/ChildSummaryCard.jsx

import React from "react";
import CircularProgress from "../ui/CircularProgress";
import { Phone, Calendar, Book } from "../ui/icons";

export default function ChildSummaryCard({
  child,
  risk,
  riskPercent,
  showToast,
}) {
  const initials = child.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-5 shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-[#FCD34D] to-[#F97316] flex items-center justify-center text-slate-900 font-semibold text-lg">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold">{child.name}</p>
            <p className="text-[11px] text-white/80">
              Class {child.className}
            </p>
            <p className="text-[11px] text-white/70 mt-1">
              Mentor: <span className="font-medium">{child.mentor}</span>
            </p>
            <p className="text-[11px] text-white/60">
              Student ID: {child.studentId}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[11px] text-white/70 mb-1">Risk Level</span>
          <CircularProgress percent={riskPercent} size={64} stroke={7} />
          <span
            className={`mt-2 inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-medium
              ${
                risk === "High"
                  ? "bg-[#FF6B6B]/20 text-rose-50 border border-[#FF6B6B]/60"
                  : risk === "Moderate"
                  ? "bg-[#F59E0B]/20 text-amber-50 border border-[#F59E0B]/60"
                  : "bg-[#10B981]/20 text-emerald-50 border border-[#10B981]/60"
              }`}
          >
            {risk} Risk
          </span>
        </div>
      </div>

      {/* Quick buttons */}
      <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
    
        <button
          type="button"
          onClick={() => showToast("Opening attendance...")}
          className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 hover:bg-white/20 transition-colors"
        >
          <Calendar />
          <span>Attendance</span>
        </button>
        <button
          type="button"
          onClick={() => showToast("Opening fees portal...")}
          className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/10 px-3 py-1.5 hover:bg-white/20 transition-colors"
        >
          <Book />
          <span>Pay Fees</span>
        </button>
      </div>
    </div>
  );
}
