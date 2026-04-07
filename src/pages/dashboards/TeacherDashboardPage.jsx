// src/pages/Dashboard/DashboardPage.jsx
import React, { useMemo, useState } from "react";
import {
  Activity,
  MessageCircle,
  AlertTriangle,
  BarChart3,
  LineChart,
  X,
} from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import AppShell from "../../components/layout/TeacherAppShell.jsx";
import TeacherTopBar from "../../components/layout/TeacherTopBar.jsx";
import FloatingChat from "../../components/layout/TeacherFloatingChat.jsx";
import Card from "../../components/ui/TeacherCard.jsx";
import StatCard from "../../components/common/TeacherStatCard.jsx";
import RiskBadge from "../../components/common/RiskBadge.jsx";

import StudentsTableSection from "../../components/layout/TeacherStudentsTableSection.jsx";
import ClassRightPanel from "../../components/layout/TeacherClassRightPanel.jsx";
import ClassChartsSection from "../../components/layout/TeacherClassChartsSection.jsx";

// me 
import TeacherVerificationView from "../../components/layout/TeacherVerificationView.jsx";

import {
  mockStudents,
  getMockSgpaTrend,
  getMockStudentSubjectMarks,
} from "../../utils/constants.js";

export default function TeacherDashboardPage() {
  const [activeView, setActiveView] = useState("dashboard"); // dashboard | student | alerts | verifications | counseling
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0]);

  const totalStudents = mockStudents.length;
  const highRiskCount = mockStudents.filter((s) => s.risk === "High").length;
  const moderateRiskCount = mockStudents.filter(
    (s) => s.risk === "Moderate"
  ).length;

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setActiveView("student");
  };


  const pageTitle = useMemo(() => {
    if (activeView === "dashboard") return "Class Dashboard";
    if (activeView === "student")
      return selectedStudent
        ? `Student Profile: ${selectedStudent.name}`
        : "Student Profile";
    if (activeView === "alerts") return "Alerts & Messages";
    if (activeView === "verifications") return "Verification Management";
    if (activeView === "counseling") return "Counseling History";
    return "";
  }, [activeView, selectedStudent]);

  const pageSubTitle = useMemo(() => {
    if (activeView === "dashboard")
      return "Monitor performance, attendance, and dropout risk for your students.";
    if (activeView === "student")
      return "Detailed analytics and counseling context for one student.";
    if (activeView === "alerts")
      return "Review AI alerts and communication history with students and parents.";
    if (activeView === "verifications")
      return "Approve or reject student and parent registrations.";
    if (activeView === "counseling")
      return "View past counseling sessions and follow-up status.";
    return "";
  }, [activeView]);

  return (
    <AppShell>
      <TeacherTopBar
        activeView={activeView}
        onChangeView={setActiveView}
        onStudentSelect={handleStudentClick}
      />

      <main className="flex-1 px-6 pb-8">
        <div className="mx-auto text-white">
          {/* Optional: Title + subtitle */}
          {/* <h1 className="text-lg font-semibold mt-4">{pageTitle}</h1>
          <p className="text-xs text-white/70">{pageSubTitle}</p> */}

          {activeView === "dashboard" && (
            <DashboardOverview
              totalStudents={totalStudents}
              highRiskCount={highRiskCount}
              moderateRiskCount={moderateRiskCount}
              students={mockStudents}
              onStudentClick={handleStudentClick}
            />
          )}

          {activeView === "student" && selectedStudent && (
            <StudentProfileView
              student={selectedStudent}
              onBack={() => setActiveView("dashboard")}
            />
          )}

          {activeView === "alerts" && <AlertsView />}


            {/* me  */}
          {activeView === "verifications" && (
            <TeacherVerificationView onClose={() => setActiveView("dashboard")} />
          )}


          {activeView === "counseling" && <CounselingHistoryView />}
        </div>
      </main>

      <FloatingChat />
    </AppShell>
  );
}

/* ========== DASHBOARD OVERVIEW SECTION ========== */

function DashboardOverview({
  totalStudents,
  highRiskCount,
  moderateRiskCount,
  students,
  onStudentClick,
}) {
  const exampleStudent = students[0];

  return (
    <section className="flex flex-col gap-4 mt-4">
      {/* TOP: STAT CARDS + CHARTS FULL WIDTH */}
      <div className="flex flex-col gap-4">
        {/* 1) FLOATING STAT CARDS */}
        <div className="flex gap-4 flex-nowrap overflow-x-auto pb-1 -mx-1 px-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <StatCard
            className="flex-1 basis-0 min-w-[160px]"
            icon={Activity}
            iconBg="bg-gradient-to-tr from-[#F97316] to-[#FB7185]"
            label="At High Risk"
            value={highRiskCount}
            subLabel="High"
            pillText="Students"
            pillToneClass="text-rose-100/80"
          />
          <StatCard
            className="flex-1 basis-0 min-w-[160px]"
            icon={Activity}
            iconBg="bg-gradient-to-tr from-[#F97316] to-[#FB7185]"
            label="At Moderate Risk"
            value={moderateRiskCount}
            subLabel="Moderate"
            pillText="Students"
            pillToneClass="text-rose-100/80"
          />
          <StatCard
            className="flex-1 basis-0 min-w-[160px]"
            icon={MessageCircle}
            iconBg="bg-gradient-to-tr from-[#6366F1] to-[#A855F7]"
            label="Academics above 75%"
            value="34%"
            subLabel="+12%"
            pillText="This month"
            pillToneClass="text-indigo-100/80"
          />
          <StatCard
            className="flex-1 basis-0 min-w-[160px]"
            icon={Activity}
            iconBg="bg-gradient-to-tr from-[#22C55E] to-[#4ADE80]"
            label="Attendance above 75%"
            value="78%"
            subLabel="+3%"
            pillText="Class Avg"
            pillToneClass="text-emerald-100/80"
          />
        </div>

        {/* 2) CHARTS SECTION – extracted to its own component */}
        <ClassChartsSection exampleStudent={exampleStudent} />
      </div>

      {/* BOTTOM: STUDENTS TABLE + RIGHT COLUMN IN ONE ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4 items-start">
        {/* LEFT: Students table (~62%) */}
        <StudentsTableSection
          students={students}
          totalStudents={totalStudents}
          onStudentClick={onStudentClick}
        />

        {/* RIGHT: Alerts + Quick Actions + AI Insights (~38%) */}
        <ClassRightPanel />
      </div>
    </section>
  );
}

/* ========== STUDENT PROFILE SECTION ========== */

function StudentProfileView({ student, onBack }) {
  const sgpaTrend = getMockSgpaTrend(student.id);
  const subjectRadar = getMockStudentSubjectMarks(student.id);

  return (
    <section className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 text-white">
      <Card className="lg:col-span-1 p-5">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={onBack}
            className="text-[11px] text-white/70 hover:text-white flex items-center gap-1"
          >
            ← Back to dashboard
          </button>
          <button
            type="button"
            onClick={onBack}
            className="h-7 w-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="Close student profile"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#FCD34D] to-[#F97316] flex items-center justify-center text-slate-900 font-semibold">
            {student.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-sm font-semibold">{student.name}</h2>
            <p className="text-[11px] text-white/80">
              {student.branch} • Sem {student.semester} • PRN {student.id}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2 border border-white/10">
            <span>Risk Level</span>
            <RiskBadge level={student.risk} />
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2 border border-white/10">
            <span>Attendance</span>
            <span className="font-semibold">{student.attendance}%</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2 border border-white/10">
            <span>Average Marks</span>
            <span className="font-semibold">{student.avgMarks}%</span>
          </div>
        </div>
      </Card>

      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 h-full flex flex-col">
          <header className="mb-2">
            <p className="text-xs text-white/70">Multi-semester performance</p>
            <h2 className="text-sm font-semibold flex items-center gap-1">
              <LineChart className="w-4 h-4" />
              SGPA Trend (demo)
            </h2>
          </header>
          <div className="h-40 mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={sgpaTrend}>
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
                  stroke="#22D3EE"
                  strokeWidth={2}
                  dot={{ r: 3, stroke: "#0F172A", strokeWidth: 1 }}
                  isAnimationActive
                  animationDuration={800}
                />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 h-full flex flex-col">
          <header className="mb-2">
            <p className="text-xs text-white/70">Subject-wise comparison</p>
            <h2 className="text-sm font-semibold flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              Subject Profile (demo)
            </h2>
          </header>
          <div className="h-40 mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={subjectRadar} outerRadius={70}>
                <PolarGrid stroke="rgba(226,232,240,0.4)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#E5E7EB", fontSize: 10 }}
                />
                <PolarRadiusAxis stroke="rgba(226,232,240,0.5)" tick={false} />
                <Radar
                  name="Marks"
                  dataKey="marks"
                  stroke="#A855F7"
                  fill="#A855F7"
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
        </Card>

        <Card className="md:col-span-2 p-4">
          <header className="mb-2">
            <p className="text-xs text-white/70">Messages &amp; actions</p>
            <h2 className="text-sm font-semibold flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              Counseling &amp; Communication (UI only)
            </h2>
          </header>
          <p className="text-[11px] text-white/75 mb-3">
            From here, faculty can send quick messages to the student or parent,
            or schedule a counseling session. Later this can connect to WhatsApp,
            email or in-app chat APIs.
          </p>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button className="rounded-full bg-white/90 px-3 py-1 font-medium text-[#4e47dd] hover:bg-white shadow-sm">
              Message Student
            </button>
            <button className="rounded-full bg-white/20 border border-white/30 px-3 py-1 font-medium text-white hover:bg-white/30">
              Notify Parent
            </button>
            <button className="rounded-full bg-white/20 border border-white/30 px-3 py-1 font-medium text-white hover:bg-white/30">
              Schedule Counseling
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}

/* ========== ALERTS PAGE SECTION ========== */

function AlertsView() {
  return (
    <Card className="mt-4 p-5 text-white">
      <header className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            AI Alerts &amp; Messages
          </h2>
          <p className="text-xs text-white/70">
            This section can later list AI-generated alerts from your backend.
          </p>
        </div>
      </header>
      <p className="text-xs text-white/80">
        For now, use the notifications menu (top-right bell icon) to jump to a
        student's profile. In the final system, this page can be powered by your
        rules engine and AI model, showing a full timeline of alerts,
        interventions and outcomes.
      </p>
    </Card>
  );
}

/* ========== COUNSELING HISTORY SECTION (placeholder) ========== */

function CounselingHistoryView() {
  return (
    <Card className="mt-4 p-5 text-white">
      <header className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Counseling History
          </h2>
          <p className="text-xs text-white/70">
            Later this can show a timeline of counseling sessions, notes and
            follow-ups for your class.
          </p>
        </div>
      </header>
      <p className="text-xs text-white/80">
        For now, this is a UI placeholder to keep navigation consistent with the
        top tabs. You can plug in your real counseling session data here from
        your backend or a Supabase/Firestore collection.
      </p>
    </Card>
  );
}


