// src/features/parent/components/InterventionPlanSection.jsx

import React from "react";

export default function InterventionPlanSection({ showToast }) {
  return (
    <section className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-5 shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
      <header>
        <h2 className="text-sm font-semibold">
          Personalized Intervention Plan
        </h2>
        <p className="text-[11px] text-white/70">
          System-suggested actions (explainable)
        </p>
      </header>

      <ol className="mt-3 text-[11px] list-decimal list-inside space-y-1 text-white/90">
        <li>Weekly mentor check-ins (30 min)</li>
        <li>Targeted Maths practice: 3 assignments/week</li>
        <li>Attendance routine: set daily reminders and track progress</li>
      </ol>

      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        <button
          type="button"
          onClick={() => showToast("Schedule meeting opened")}
          className="inline-flex items-center rounded-full bg-white/10 border border-white/10 px-3 py-1.5 hover:bg-white/20 transition-colors"
        >
          Schedule
        </button>
        <button
          type="button"
          onClick={() => showToast("Practice packs opened")}
          className="inline-flex items-center rounded-full bg-white/10 border border-white/10 px-3 py-1.5 hover:bg-white/20 transition-colors"
        >
          Practice Packs
        </button>
      </div>
    </section>
  );
}
