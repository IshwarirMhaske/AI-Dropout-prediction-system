// src/features/admin/components/TeacherProfilePanel.jsx
import React from "react";

const TeacherProfilePanel = ({ open, teacher, onClose, onRemove }) => {
  if (!open || !teacher) return null;

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-black/30">
      <aside className="bg-white text-slate-900 w-full max-w-md rounded-l-3xl shadow-2xl p-6">
        <h2 className="text-lg font-semibold">{teacher.full_name}</h2>
        <p className="text-xs opacity-75">{teacher.email}</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onRemove(teacher)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Remove
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-black text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </aside>
    </div>
  );
};

export default TeacherProfilePanel;
