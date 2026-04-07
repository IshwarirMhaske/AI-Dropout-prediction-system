// src/features/admin/components/TeacherListSection.jsx
import React from "react";

const TeacherListSection = ({
  activeTab,
  setActiveTab,
  teachers,
  onViewTeacher,
  onRemoveTeacher,
}) => {
  return (
    <section className="bg-white/10 border border-white/20 rounded-3xl p-5 mt-2">
      <div className="inline-flex rounded-full bg-white/10 p-1 text-[11px] text-white/80">
        {["all", "pending", "verified"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-full ${
              activeTab === tab
                ? "bg-white text-[#4e47dd] font-semibold"
                : "hover:bg-white/20"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {teachers.map((t) => (
          <article
            key={t.id}
            className="flex items-center justify-between bg-white/10 border border-white/20 px-4 py-3 rounded-xl"
          >
            <h3>
              {t.full_name} —{" "}
              <span className="opacity-75">{t.email}</span>
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewTeacher(t)}
                className="bg-white px-4 py-1 text-xs text-[#4e47dd] rounded-full"
              >
                View
              </button>

              <button
                onClick={() => onRemoveTeacher(t)}
                className="bg-red-500 px-4 py-1 text-xs text-white rounded-full"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TeacherListSection;
