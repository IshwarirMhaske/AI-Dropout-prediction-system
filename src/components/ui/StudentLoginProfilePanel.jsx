import React from "react";
import { X } from "lucide-react";

export default function StudentLoginProfilePanel({ open, user, onClose }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full z-40 transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: 420 }}
    >
      <div className="h-full p-6 bg-gradient-to-b from-white/4 to-white/2 backdrop-blur-xl border-l border-white/8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{user.name}</div>
            <div className="text-sm opacity-80">
              {user.prn} • {user.avgMarks}%
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/6"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="p-3 rounded-xl bg-white/6 border border-white/10">
            <div className="text-sm opacity-80">Attendance</div>
            <div className="text-2xl font-bold">{user.attendance}%</div>
          </div>

          <div className="p-3 rounded-xl bg-white/6 border border-white/10">
            <div className="text-sm opacity-80">Average Marks</div>
            <div className="text-2xl font-bold">{user.avgMarks}%</div>
          </div>

          <div className="p-3 rounded-xl bg-white/6 border border-white/10">
            <div className="text-sm opacity-80">Risk Level</div>
            <div className="text-2xl font-bold">{user.risk}</div>
          </div>

          <div className="p-3 rounded-xl bg-white/6 border border-white/10">
            <div className="text-sm opacity-80">Risk Parameters</div>
            <div className="mt-2 space-y-2">
              <div>
                <div className="text-xs opacity-80">
                  Academic engagement — 72%
                </div>
                <div className="w-full bg-white/8 h-2 rounded-full mt-1">
                  <div
                    style={{ width: "72%" }}
                    className="h-2 rounded-full bg-[#A855F7]"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs opacity-80">
                  Extracurricular — 48%
                </div>
                <div className="w-full bg-white/8 h-2 rounded-full mt-1">
                  <div
                    style={{ width: "48%" }}
                    className="h-2 rounded-full bg-[#22D3EE]"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs opacity-80">
                  Financial stress — 26%
                </div>
                <div className="w-full bg-white/8 h-2 rounded-full mt-1">
                  <div
                    style={{ width: "26%" }}
                    className="h-2 rounded-full bg-[#FBBF24]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 hover:scale-105">
              Message Student
            </button>
            <button className="flex-1 px-3 py-2 rounded-lg bg-white/6 hover:scale-105">
              Notify Parent
            </button>
          </div>

          <div className="text-xs opacity-70">
            // MOCK DATA – CONNECT TO DATASET LATER
          </div>
        </div>
      </div>
    </div>
  );
}
