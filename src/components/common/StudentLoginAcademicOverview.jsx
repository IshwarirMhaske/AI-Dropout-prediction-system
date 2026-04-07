import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp } from "lucide-react";
import {
  mockAttendance,
  participationData,
  partColors,
} from "../../utils/constants";

// Custom label so 48% / 22% / 30% are visible inside the donut
const RADIAN = Math.PI / 180;
const renderParticipationLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#020617"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

export default function StudentLoginAcademicOverview() {
  const card =
    "p-6 rounded-3xl border backdrop-blur-xl shadow-xl transition-all duration-300 bg-white/5 border-white/10";

  return (
    <div className={card}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Academic Overview
          </h2>
          <p className="text-sm mt-1 opacity-80">
            Your performance trends and participation metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Attendance chart */}
        <div className="col-span-1 md:col-span-2 p-4 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-cyan-400" /> Attendance Trend
            (Last 6 weeks)
          </h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <AreaChart data={mockAttendance}>
                <defs>
                  <linearGradient
                    id="colorAttendance"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#22D3EE"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#22D3EE"
                      stopOpacity={0.08}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="week"
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                />
                <YAxis
                  domain={[50, 100]}
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.96)",
                    borderRadius: 14,
                    border: "1px solid rgba(148,163,184,0.6)",
                    boxShadow: "0 18px 45px rgba(15,23,42,0.55)",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#fff", fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#22D3EE"
                  fill="url(#colorAttendance)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Participation pie */}
        <div className="p-4 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300">
          <h3 className="text-sm font-semibold mb-3">Participation Mix</h3>
          <div style={{ width: "100%", height: 180 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={participationData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={70}
                  labelLine={false}
                  label={renderParticipationLabel}
                >
                  {participationData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={partColors[index % partColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#A855F7]" />
                <span className="opacity-80">Assignments</span>
              </div>
              <div className="font-semibold">
                {participationData[0].value}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#22D3EE]" />
                <span className="opacity-80">On-time</span>
              </div>
              <div className="font-semibold">
                {participationData[1].value}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="opacity-80">Events</span>
              </div>
              <div className="font-semibold">
                {participationData[2].value}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
