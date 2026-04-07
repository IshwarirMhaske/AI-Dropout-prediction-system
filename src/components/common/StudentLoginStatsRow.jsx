import React from "react";
import { Calendar, Award, Target, BookOpen, TrendingUp } from "lucide-react";

export default function StudentLoginStatsRow({
  user,
  hoveredCard,
  onHoverChange,
}) {
  
  const base = (type, gradientClasses) =>
    `p-5 rounded-2xl border backdrop-blur-xl shadow-lg transition-transform duration-300 ${
      hoveredCard === type ? "transform scale-105 -translate-y-1" : ""
      } ${gradientClasses}`;


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Attendance */}
      <div
        onMouseEnter={() => onHoverChange("attendance")}
        onMouseLeave={() => onHoverChange(null)}
        className={base(
          "attendance",
          "bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30",
          "border-gray-200"
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Calendar size={18} className="text-purple-300" />
          </div>
          <div className="text-xs font-semibold text-purple-300">
            Last 6 weeks
          </div>
        </div>
        <div className="text-sm opacity-80 mb-1">Attendance Rate</div>
        <div className="text-3xl font-bold mb-2">{user.attendance}%</div>
        <div className="flex items-center gap-2 text-xs text-green-400">
          <TrendingUp size={14} /> +5% from last month
        </div>
      </div>

      {/* Marks */}
      <div
        onMouseEnter={() => onHoverChange("marks")}
        onMouseLeave={() => onHoverChange(null)}
        className={base(
          "marks",
          "bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 border-cyan-500/30",
          "border-gray-200"
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10">
            <Award size={18} className="text-cyan-300" />
          </div>
          <div className="text-xs font-semibold text-cyan-300">
            Current Sem
          </div>
        </div>
        <div className="text-sm opacity-80 mb-1">Average Marks</div>
        <div className="text-3xl font-bold mb-2">{user.avgMarks}%</div>
        <div className="flex items-center gap-2 text-xs text-amber-400">
          <Target size={14} /> Target: 75%
        </div>
      </div>

      {/* Risk */}
      <div
        onMouseEnter={() => onHoverChange("risk")}
        onMouseLeave={() => onHoverChange(null)}
        className={base(
          "risk",
          "bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-500/30",
          "border-gray-200"
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <BookOpen size={18} className="text-amber-300" />
          </div>
        </div>
        <div className="text-sm opacity-80 mb-1">Dropout Risk</div>
        <div className="text-3xl font-bold mb-2">{user.risk}</div>
        <div className="w-full bg-white/10 h-2 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 via-amber-400 to-amber-400 rounded-full"
            style={{ width: "55%" }}
          />
        </div>
      </div>
    </div>
  );
}
