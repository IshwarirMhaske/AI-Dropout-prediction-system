// src/components/common/StudentsTable.jsx
import React from "react";
import { ArrowRight } from "lucide-react";
import IconAvatar from "./TeacherIconAvatar.jsx";
import RiskBadge from "./RiskBadge.jsx";

export default function StudentsTable({
  students,
  totalStudents,
  onStudentClick,
}) {
  return (
    <section className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.45)] p-5 text-white">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-white/15">
            👥
          </span>
          <div>
            <h2 className="text-sm font-semibold">Students</h2>
            <p className="text-xs text-white/70">
              {totalStudents} students in this class
            </p>
          </div>
        </div>

        {/* Small legend on the right (no big header row) */}
        <div className="hidden md:flex items-center gap-4 text-[10px] text-white/60">
          <span>Attendance</span>
          <span>GPA</span>
          <span>Risk</span>
        </div>
      </header>

      {/* List */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {students.map((s) => {
          const gpa = (s.avgMarks / 10).toFixed(1);

          return (
            <div
              key={s.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 px-3 py-3 hover:bg-white/10 transition-colors"
            >
              {/* LEFT: Avatar + basic info */}
              <div className="flex items-center gap-3 min-w-0">
                <IconAvatar name={s.name} />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold truncate">
                    {s.name}
                  </span>
                  <span className="text-[10px] text-white/70">
                    PRN: {s.id}
                  </span>
                  <span className="text-[10px] text-white/60">
                    {s.branch} • Sem {s.semester}
                  </span>
                </div>
              </div>

              {/* RIGHT: Stats + action */}
              <div className="flex items-center gap-3 ml-2">
                {/* Attendance */}
                <div className="hidden sm:flex flex-col items-center min-w-[64px]">
                  <span className="text-[10px] text-white/60">Attendance</span>
                  <span className="text-xs font-semibold">
                    {s.attendance}%
                  </span>
                </div>

                {/* GPA */}
                <div className="hidden sm:flex flex-col items-center min-w-[48px]">
                  <span className="text-[10px] text-white/60">GPA</span>
                  <span className="text-xs font-semibold">{gpa}</span>
                </div>

                {/* Risk */}
                <div className="flex flex-col items-center min-w-[72px]">
                  <span className="text-[10px] text-white/60 mb-0.5">Risk</span>
                  <RiskBadge level={s.risk} />
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => onStudentClick(s)}
                  className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#4e47dd] hover:bg-white shadow-sm transition-all hover:scale-105"
                >
                  View
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}

        {students.length === 0 && (
          <p className="text-[11px] text-white/60 text-center py-6">
            No students found in this class.
          </p>
        )}
      </div>
    </section>
  );
}
