// src/features/parent/components/ProgressTimelineSection.jsx

import React from "react";
import { formatDate } from "../Parent/parentRisk";

export default function ProgressTimelineSection({ child }) {
  return (
    <section className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-5 shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
      <header>
        <h2 className="text-sm font-semibold">Progress Timeline</h2>
        <p className="text-[11px] text-white/70">
          Recent activities &amp; important events
        </p>
      </header>

      <div className="mt-4 flex flex-col gap-3 text-[11px]">
        <div className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-[#F59E0B]" />
          <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
            <p className="font-semibold">Attendance Drop (Sept)</p>
            <p className="text-white/70">
              Missed 6 classes in September — mentor reached out.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-[#EF4444]" />
          <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
            <p className="font-semibold">Score Decline</p>
            <p className="text-white/70">
              Recent tests show a -8% trend — targeted tutoring recommended.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-[#06B6D4]" />
          <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 px-3 py-2">
            <p className="font-semibold">Counselling Recorded</p>
            <p className="text-white/70">
              Counselling on {formatDate(child.lastCounsellingDate)} — weekly
              mentor check-ins scheduled.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
