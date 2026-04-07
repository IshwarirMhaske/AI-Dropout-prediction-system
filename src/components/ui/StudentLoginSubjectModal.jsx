import React from "react";
import { X } from "lucide-react";

export default function StudentLoginSubjectModal({
  open,
  subject,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-40 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[520px] p-6 rounded-2xl bg-white/6 border border-white/12 backdrop-blur-xl shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold">{subject?.name}</div>
            <div className="text-sm opacity-80 mt-1">
              Score: {subject?.score}%
            </div>
          </div>
          <button
            aria-label="Close subject"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/6"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-4 text-sm opacity-80">{subject?.details}</div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="px-3 py-2 rounded-lg bg-indigo-600 hover:scale-105">
            Open Resources
          </button>
          <button className="px-3 py-2 rounded-lg bg-white/6 hover:scale-105">
            Request Mentor
          </button>
        </div>
      </div>
    </div>
  );
}
