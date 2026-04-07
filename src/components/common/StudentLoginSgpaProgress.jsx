import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { mockSGPA } from "../../utils/constants";

export default function StudentLoginSgpaProgress() {
  const card =
    "p-6 rounded-3xl border backdrop-blur-xl shadow-xl transition-all duration-300 bg-white/5 border-white/10";

  return (
    <div className={card}>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp size={22} className="text-green-400" /> SGPA Progress
      </h3>

      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={mockSGPA}>
            <defs>
              <linearGradient id="colorSGPA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#A855F7" stopOpacity={0.08} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="sem"
              tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 12 }}
            />

            <YAxis
              domain={[5, 9]}
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

            <Area
              type="monotone"
              dataKey="sgpa"
              stroke="#A855F7"
              fill="url(#colorSGPA)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
