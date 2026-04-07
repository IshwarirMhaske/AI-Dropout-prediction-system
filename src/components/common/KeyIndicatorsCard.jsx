// src/features/parent/components/KeyIndicatorsCard.jsx

import React from "react";
import Sparkline from "../ui/SparkLine";
import { formatDate } from "../Parent/parentRisk";

export default function KeyIndicatorsCard({ child, risk, testValues }) {
  return (
    <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-4 shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
      <header className="flex items-center justify-between">
        <p className="text-sm font-semibold">Key Indicators</p>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium
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
      </header>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col items-center">
          <p className="text-xl font-semibold">{child.attendancePercent}%</p>
          <p className="text-white/70 text-[11px]">Attendance</p>
          <div className="mt-2 w-full">
            <Sparkline values={testValues} width={110} />
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col items-center">
          <p className="text-xl font-semibold">{child.avgMarksPercent}%</p>
          <p className="text-white/70 text-[11px]">Average Marks</p>
          <p className="mt-1 text-[11px] text-white/60">
            Trend {child.scoreTrendPercentChange}%
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col items-center">
          <p className="text-xl font-semibold">{child.feesDueMonths}</p>
          <p className="text-white/70 text-[11px]">Fees Due (months)</p>
          <p className="mt-1 text-[11px] text-white/60">
            Last counselling: {formatDate(child.lastCounsellingDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
