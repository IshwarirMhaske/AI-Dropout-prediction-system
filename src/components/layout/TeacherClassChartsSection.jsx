// src/components/layout/ClassChartsSection.jsx
import React, { useEffect, useState } from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart as ReBarChart,
  Legend,
  Bar,
} from "recharts";

import Card from "../ui/TeacherCard.jsx";

import {
  RISK_COLORS,
  classDropoutRiskDist,
  classAcademicPerformance,
  classAttendanceData,
  submissionsData,
  healthIssueDistribution,
  feesStatusClass,
  FEES_COLORS,
  HEALTH_COLORS,
  SUBMISSION_COLORS,
  getMockSgpaTrend,
  getMockStudentSubjectMarks,
} from "../../utils/constants.js";

/* Small skeleton used while charts load */
function ChartSkeleton() {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col animate-pulse">
      <div className="h-3 w-24 bg-white/20 rounded mb-1" />
      <div className="h-2 w-32 bg-white/10 rounded mb-4" />
      <div className="h-32 w-full bg-white/10 rounded-2xl mt-auto" />
    </div>
  );
}

export default function ClassChartsSection({ exampleStudent }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <Card className="p-5 text-white">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ChartSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* 1) Class Dropout Risk – Pie */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-xs text-white/70">Class Dropout Risk</p>
            <p className="text-[11px] text-white/60 mb-1">
              Distribution of predicted dropout risk levels
            </p>
            <ul className="mt-2 space-y-1 text-[11px]">
              {classDropoutRiskDist.map((r, idx) => (
                <li key={r.name} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: RISK_COLORS[idx] }}
                  />
                  <span className="w-16">{r.name}</span>
                  <span className="font-semibold">{r.value} students</span>
                </li>
              ))}
            </ul>
            <div className="h-40 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={classDropoutRiskDist}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={3}
                    isAnimationActive
                    animationDuration={800}
                  >
                    {classDropoutRiskDist.map((entry, idx) => (
                      <Cell key={entry.name} fill={RISK_COLORS[idx]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.95)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(148,163,184,0.5)",
                      fontSize: "0.7rem",
                    }}
                    labelStyle={{ color: "#E5E7EB" }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2) Class Academic Performance – Bar */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-xs text-white/70">Academic Performance (Class)</p>
            <p className="text-[11px] text-white/60">
              Scored percentage per student
            </p>
            <div className="h-40 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={classAcademicPerformance}>
                  <XAxis
                    dataKey="studentId"
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(27, 39, 67, 0.95)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(148,163,184,0.5)",
                      fontSize: "0.7rem",
                    }}
                    labelStyle={{ color: "#E5E7EB" }}
                  />
                  <Bar
                    dataKey="score"
                    radius={[6, 6, 0, 0]}
                    isAnimationActive
                    animationDuration={800}
                  >
                    {classAcademicPerformance.map((entry) => (
                      <Cell key={entry.studentId} fill="#38BDF8" />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3) Class Attendance – Bar */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-xs text-white/70">Class Attendance</p>
            <p className="text-[11px] text-white/60">
              Attendance percentage per student
            </p>
            <div className="h-40 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={classAttendanceData}>
                  <XAxis
                    dataKey="studentId"
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.95)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(148,163,184,0.5)",
                      fontSize: "0.7rem",
                    }}
                    labelStyle={{ color: "#E5E7EB" }}
                  />
                  <Bar
                    dataKey="attendance"
                    radius={[6, 6, 0, 0]}
                    isAnimationActive
                    animationDuration={800}
                  >
                    {classAttendanceData.map((entry) => (
                      <Cell key={entry.studentId} fill="#22C55E" />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4) SGPA of Multiple Semesters – Line */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-xs text-white/70">Student SGPA Trend</p>
            <p className="text-[11px] text-white/60">
              SGPA across semesters (demo student)
            </p>
            <div className="h-40 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart
                  data={
                    exampleStudent ? getMockSgpaTrend(exampleStudent.id) : []
                  }
                >
                  <XAxis
                    dataKey="sem"
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={[5, 10]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.95)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(148,163,184,0.5)",
                      fontSize: "0.7rem",
                    }}
                    labelStyle={{ color: "#E5E7EB" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sgpa"
                    stroke="#7DD3FC"
                    strokeWidth={2}
                    dot={{ r: 3, stroke: "#0F172A", strokeWidth: 1 }}
                    isAnimationActive
                    animationDuration={800}
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
            {exampleStudent && (
              <p className="mt-1 text-[10px] text-white/50">
                Showing SGPA for:{" "}
                <span className="font-semibold">{exampleStudent.name}</span>
              </p>
            )}
          </div>

          {/* 5) Submissions – On-time vs Late (Stacked Bar) */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-xs text-white/70">Submissions Overview</p>
            <p className="text-[11px] text-white/60">
              On-time vs late submissions per student
            </p>
            <div className="h-40 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={submissionsData}>
                  <XAxis
                    dataKey="studentId"
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#E5E7EB"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.95)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(148,163,184,0.5)",
                      fontSize: "0.7rem",
                    }}
                    labelStyle={{ color: "#E5E7EB" }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "0.65rem" }}
                    verticalAlign="bottom"
                    height={24}
                  />
                  <Bar
                    dataKey="onTime"
                    stackId="a"
                    name="On time"
                    isAnimationActive
                    animationDuration={800}
                  >
                    {submissionsData.map((entry) => (
                      <Cell
                        key={`on-${entry.studentId}`}
                        fill={SUBMISSION_COLORS[0]}
                      />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="late"
                    stackId="a"
                    name="Late"
                    isAnimationActive
                    animationDuration={800}
                  >
                    {submissionsData.map((entry) => (
                      <Cell
                        key={`late-${entry.studentId}`}
                        fill={SUBMISSION_COLORS[1]}
                      />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 6) Subject-wise Performance – Radar Chart */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-xs text-white/70">Subject-wise Performance</p>
            <p className="text-[11px] text-white/60">
              Radar view of subject scores (demo student)
            </p>
            <div className="h-44 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={
                    exampleStudent
                      ? getMockStudentSubjectMarks(exampleStudent.id)
                      : []
                  }
                >
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 9, fill: "#E5E7EB" }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 8 }}
                  />
                  <Radar
                    name="Marks"
                    dataKey="marks"
                    stroke="#38BDF8"
                    fill="#38BDF8"
                    fillOpacity={0.4}
                    isAnimationActive
                    animationDuration={800}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.95)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(148,163,184,0.5)",
                      fontSize: "0.7rem",
                    }}
                    labelStyle={{ color: "#E5E7EB" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            {exampleStudent && (
              <p className="mt-1 text-[10px] text-white/50">
                Showing subject scores for:{" "}
                <span className="font-semibold">{exampleStudent.name}</span>
              </p>
            )}
          </div>

          {/* 7) Health Issue Count – Pie */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-xs text-white/70">Health Issues in Class</p>
            <p className="text-[11px] text-white/60">
              Students with reported health issues
            </p>
            <ul className="mt-2 space-y-1 text-[11px]">
              {healthIssueDistribution.map((r, idx) => (
                <li key={r.status} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: HEALTH_COLORS[idx] }}
                  />
                  <span className="w-24">{r.status}</span>
                  <span className="font-semibold">{r.value} students</span>
                </li>
              ))}
            </ul>
            <div className="h-40 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={healthIssueDistribution}
                    dataKey="value"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={3}
                    isAnimationActive
                    animationDuration={800}
                  >
                    {healthIssueDistribution.map((entry, idx) => (
                      <Cell key={entry.status} fill={HEALTH_COLORS[idx]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.95)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(148,163,184,0.5)",
                      fontSize: "0.7rem",
                    }}
                    labelStyle={{ color: "#E5E7EB" }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 8) Fees Status – Pie */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 h-full flex flex-col transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-xs text-white/70">Fees Status</p>
            <p className="text-[11px] text-white/60">
              Paid vs partial vs unpaid
            </p>
            <ul className="mt-2 space-y-1 text-[11px]">
              {feesStatusClass.map((r, idx) => (
                <li key={r.status} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: FEES_COLORS[idx] }}
                  />
                  <span className="w-16">{r.status}</span>
                  <span className="font-semibold">{r.value} students</span>
                </li>
              ))}
            </ul>
            <div className="h-40 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={feesStatusClass}
                    dataKey="value"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={3}
                    isAnimationActive
                    animationDuration={800}
                  >
                    {feesStatusClass.map((entry, idx) => (
                      <Cell key={entry.status} fill={FEES_COLORS[idx]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15,23,42,0.95)",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(148,163,184,0.5)",
                      fontSize: "0.7rem",
                    }}
                    labelStyle={{ color: "#E5E7EB" }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

