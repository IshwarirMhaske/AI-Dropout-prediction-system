import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Award } from "lucide-react";
import { mockSubjects } from "../../utils/constants";

export default function StudentLoginSubjectPerformance({
  poorestSubjects,
  activeQuick,
  onQuickAction,
  onSubjectClick,
}) {
  const card =
    "p-6 rounded-3xl border backdrop-blur-xl shadow-xl transition-all duration-300 bg-white/5 border-white/10";

  return (
    <div className={card}>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Award size={22} className="text-purple-400" /> Subject Performance
      </h3>

      {/* Bar chart */}
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={mockSubjects} onClick={(e) => onSubjectClick(e)}>
            <defs>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15,23,42,0.96)",
                borderRadius: 14,
                border: "1px solid rgba(148,163,184,0.6)",
                boxShadow: "0 18px 45px rgba(15,23,42,0.55)",
                color: "#e5e7eb",
                padding: 12,
              }}
              labelStyle={{ color: "#e5e7eb", fontSize: 12, fontWeight: 600 }}
            />
            <Bar
              dataKey="score"
              radius={[12, 12, 0, 0]}
              fill="url(#colorBar)"
              activeBar={{
                radius: [12, 12, 0, 0],
                fillOpacity: 1,
                fill: "rgba(226,232,240,0.25)",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom info cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Needs attention */}
        <div className="p-4 rounded-xl border bg-red-900/10 border-red-500/30">
          <div className="text-sm font-semibold mb-2">⚠️ Needs Attention</div>
          <div className="text-lg font-bold text-red-400">
            {poorestSubjects.map((s) => s.name).join(", ")}
          </div>
          <div className="text-xs mt-2 opacity-80">
            Allocate 2–3 hrs/week to improve scores
          </div>
        </div>

        {/* Quick actions */}
        <div className="p-4 rounded-xl border bg-cyan-900/10 border-cyan-500/30">
          <div className="text-sm font-semibold mb-2">💡 Quick Actions</div>
          <div className="space-y-1 text-sm">
            <div className="opacity-80">• Weekly mentoring</div>
            <div className="opacity-80">• Practice tests</div>
            <div className="opacity-80">• Contact mentors</div>
          </div>
        </div>

        {/* Next session */}
        <div className="p-4 rounded-xl border bg-purple-900/10 border-purple-500/30">
          <div className="text-sm font-semibold mb-2">📅 Next Session</div>
          <div className="text-sm font-semibold text-purple-400 mb-2">
            No sessions scheduled
          </div>
          <button
            onClick={() => onQuickAction("counsel")}
            className={`w-full px-3 py-2 rounded-lg ${
              activeQuick === "counsel"
                ? "bg-purple-500 text-white"
                : "bg-purple-500/20 text-purple-300"
            } hover:bg-purple-500 hover:text-white transition transform hover:scale-105`}
          >
            Schedule Now
          </button>
        </div>
      </div>
    </div>
  );
}
