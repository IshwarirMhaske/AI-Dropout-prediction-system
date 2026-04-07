// src/features/parent/components/ResourcesSection.jsx

import React from "react";

export default function ResourcesSection({ child }) {
  return (
    <section className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-5 shadow-[0_18px_45px_rgba(15,23,42,0.45)]">
      <header>
        <h2 className="text-sm font-semibold">Resources &amp; Support</h2>
        <p className="text-[11px] text-white/70">
          Curated for this child — tutoring, tips, and counselor contacts
        </p>
      </header>

      <ul className="mt-3 text-[11px] space-y-1 text-white/90">
        <li>Short maths video series (20 min/day)</li>
        <li>Attendance checklist &amp; reminders</li>
        <li>
          Counsellor: {child.mentor} — <span>98765XXXXX</span>
        </li>
      </ul>
    </section>
  );
}
