// src/features/admin/components/NotificationsDropdown.jsx
import React from "react";

const NotificationsDropdown = ({
  pendingTeachers,
  verifiedTeachers,
  onApprove,
  onReject,
  onRemoveVerified,
}) => {
  return (
    <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white/95 shadow-xl backdrop-blur-xl border p-4 text-slate-900 z-20">
      <h3 className="text-sm font-semibold">Notifications</h3>

      {/* Pending */}
      <div className="mt-3">
        <h4 className="text-[11px] font-semibold uppercase">
          Pending Requests
        </h4>
        <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
          {pendingTeachers.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl"
            >
              <p className="font-medium">{t.full_name}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => onApprove(t)}
                  className="bg-green-500 text-white rounded-full px-2 py-1 text-[10px]"
                >
                  ✓
                </button>
                <button
                  onClick={() => onReject(t)}
                  className="bg-red-500 text-white rounded-full px-2 py-1 text-[10px]"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Verified */}
      <div className="mt-3 border-t pt-2">
        <h4 className="text-[11px] font-semibold uppercase">
          Verified Faculty
        </h4>
        <ul className="mt-2 space-y-2 max-h-32 overflow-y-auto">
          {verifiedTeachers.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl"
            >
              <p>{t.full_name}</p>

              <button
                onClick={() => onRemoveVerified(t)}
                className="bg-amber-500 text-white rounded-full px-2 py-1 text-[11px]"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
