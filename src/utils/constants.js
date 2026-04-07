// src/utils/constants.js

// -----------------------------------------------------------------------------
// 1) EXISTING MOCK DATA (kept as-is, you can keep or remove if not used)
// -----------------------------------------------------------------------------
export const attendanceTrend = [
  { month: "W1", attendance: 72 },
  { month: "W2", attendance: 74 },
  { month: "W3", attendance: 76 },
  { month: "W4", attendance: 77 },
  { month: "W5", attendance: 79 },
  { month: "W6", attendance: 80 },
];

export const subjectPerformance = [
  { subject: "Maths", avgMarks: 72 },
  { subject: "Physics", avgMarks: 68 },
  { subject: "Chemistry", avgMarks: 75 },
  { subject: "DSA", avgMarks: 70 },
  { subject: "DBMS", avgMarks: 77 },
];

export const riskDistribution = [
  { name: "High", value: 12 },
  { name: "Moderate", value: 26 },
  { name: "Safe", value: 62 },
];

export const RISK_COLORS = ["#FF6B6B", "#F59E0B", "#10B981"];

export const mockStudents = [
  {
    id: "72210101A",
    name: "Aditi Sharma",
    branch: "Computer",
    semester: 5,
    risk: "High",
    attendance: 58,
    avgMarks: 52,
  },
  {
    id: "72210102R",
    name: "Rahul Patil",
    branch: "Computer",
    semester: 5,
    risk: "Moderate",
    attendance: 72,
    avgMarks: 68,
  },
  {
    id: "72210103S",
    name: "Simran K.",
    branch: "IT",
    semester: 5,
    risk: "Safe",
    attendance: 91,
    avgMarks: 89,
  },
  {
    id: "72210104V",
    name: "Vikram Rao",
    branch: "IT",
    semester: 5,
    risk: "Moderate",
    attendance: 66,
    avgMarks: 61,
  },
  {
    id: "72210105N",
    name: "Neha Gupta",
    branch: "IT",
    semester: 5,
    risk: "Safe",
    attendance: 88,
    avgMarks: 79,
  },
  {
    id: "72210106S",
    name: "Saurabh N.",
    branch: "Computer",
    semester: 5,
    risk: "High",
    attendance: 42,
    avgMarks: 48,
  },
];

export const overallPercentDist = [
  { range: "40-50", count: 4 },
  { range: "50-60", count: 9 },
  { range: "60-70", count: 18 },
  { range: "70-80", count: 22 },
  { range: "80+", count: 7 },
];

export const backlogDistribution = [
  { label: "0", count: 32 },
  { label: "1-2", count: 10 },
  { label: "3+", count: 3 },
];

// -----------------------------------------------------------------------------
// 2) FEES STATUS + NOTIFICATIONS (existing)
// -----------------------------------------------------------------------------
export const feesStatusDist = [
  // This will be overridden below with class-level data from your CSV
  { status: "Paid", value: 80 },
  { status: "Partial", value: 10 },
  { status: "Pending", value: 10 },
];

export const mockNotifications = [
  {
    id: 1,
    type: "risk",
    title: "High-risk student detected",
    message: "Aditi Sharma's risk score has moved to HIGH.",
    studentId: "72210101A",
  },
  {
    id: 2,
    type: "join",
    title: "New parent access request",
    message: "Parent access requested for Rahul Patil.",
    studentId: "72210102R",
  },
];

// -----------------------------------------------------------------------------
// 3) SGPA + SUBJECT MARKS HELPERS (you already had these – keeping them)
// -----------------------------------------------------------------------------
export function getMockSgpaTrend(studentId) {
  const lastDigit = parseInt(studentId.slice(-1), 10) || 1;
  const base = 6.8 + (lastDigit % 3) * 0.4;
  return [1, 2, 3, 4, 5, 6].map((sem) => ({
    sem: `Sem ${sem}`,
    sgpa: Math.min(10, Math.max(5.5, base + (sem - 3) * 0.2)),
  }));
}

export function getMockStudentSubjectMarks(studentId) {
  const lastDigit = parseInt(studentId.slice(-1), 10) || 1;
  const factor = (lastDigit % 5) * 2;
  return subjectPerformance.map((s) => ({
    subject: s.subject,
    marks: Math.max(45, Math.min(95, s.avgMarks + factor - 4)),
  }));
}

// -----------------------------------------------------------------------------
// 4) 📊 CLASS-LEVEL DATA FROM YOUR CSV (STU001–STU005)
//    These are derived from:
//    Student_ID,Scored_Percentage,Total_Submissions,Submitted On Time,
//    Submitted With Late,Attendance (%),Total_Fees,Fees_Paid,Payment_Status_*,
//    Health_Issue_*, Predicted_Dropout_Risk
// -----------------------------------------------------------------------------

// Academic performance score of class (bar per student)
export const classAcademicPerformance = [
  { studentId: "STU001", score: 53.0 },
  { studentId: "STU002", score: 65.4 },
  { studentId: "STU003", score: 27.4 },
  { studentId: "STU004", score: 21.6 },
  { studentId: "STU005", score: 41.6 },
];

// Attendance of class (bar per student)
export const classAttendanceData = [
  { studentId: "STU001", attendance: 76.47 },
  { studentId: "STU002", attendance: 88.37 },
  { studentId: "STU003", attendance: 58.33 },
  { studentId: "STU004", attendance: 33.33 },
  { studentId: "STU005", attendance: 62.5 },
];

// Dropout risk distribution of the class (bucketed from Predicted_Dropout_Risk)
// STU001–005 → High:2, Medium:2, Low:1
export const classDropoutRiskDist = [
  { name: "High", value: 2 },
  { name: "Medium", value: 2 },
  { name: "Low", value: 1 },
];

// Submissions graph – on-time vs late per student
export const submissionsData = [
  { studentId: "STU001", onTime: 32, late: 5 },
  { studentId: "STU002", onTime: 43, late: 2 },
  { studentId: "STU003", onTime: 6, late: 13 },
  { studentId: "STU004", onTime: 5, late: 12 },
  { studentId: "STU005", onTime: 22, late: 7 },
];

// Health issue count of class (Health_Issue_No/Yes)
export const healthIssueDistribution = [
  { status: "No issue", value: 3 },
  { status: "Has issue", value: 2 },
];

// Fees paid data of class (Payment_Status_* flags → counts)
export const feesStatusClass = [
  { status: "Paid", value: 3 },
  { status: "Partial", value: 0 },
  { status: "Unpaid", value: 2 },
];

// Optional: color helpers for pies
export const FEES_COLORS = ["#22C55E", "#EAB308", "#EF4444"];
export const HEALTH_COLORS = ["#22C55E", "#F97316"];
export const SUBMISSION_COLORS = ["#22C55E", "#F97316"];


// src/utils/constants.js

// =========================
//  STUDENT RAW DB DATA
// =========================

// Normalised version of your CSV rows
export const studentDbRows = [
  {
    studentId: "STU001",
    scoredPercentage: 53,
    totalSubmissions: 37,
    submittedOnTime: 32,
    submittedLate: 5,
    attendancePercent: 76.47059,
    eventParticipationRate: 62.16838,
    rating: 2.963091,
    sportsDaysPercent: 71.42857,
    totalFees: 104499,
    feesPaid: 82787,
    daysOverdue: 52,
    dropoutRiskPercentage: 36,
    academicScore: 53,
    attendanceScore: 37.61765,
    healthScore: 1,
    // flags & one-hots omitted here because UI doesn’t use them yet
    predictedDropoutRisk: 36.81895008,
  },
  {
    studentId: "STU002",
    scoredPercentage: 65.4,
    totalSubmissions: 45,
    submittedOnTime: 43,
    submittedLate: 2,
    attendancePercent: 88.37209,
    eventParticipationRate: 90,
    rating: 3.538891,
    sportsDaysPercent: 90,
    totalFees: 111167,
    feesPaid: 111167,
    daysOverdue: 0,
    dropoutRiskPercentage: 14,
    academicScore: 65.4,
    attendanceScore: 44.59302,
    healthScore: 0,
    predictedDropoutRisk: 14.14213885,
  },
  {
    studentId: "STU003",
    scoredPercentage: 27.4,
    totalSubmissions: 19,
    submittedOnTime: 6,
    submittedLate: 13,
    attendancePercent: 58.33333,
    eventParticipationRate: 15.53551,
    rating: 1.81071,
    sportsDaysPercent: 25,
    totalFees: 90068,
    feesPaid: 28496,
    daysOverdue: 129,
    dropoutRiskPercentage: 80,
    academicScore: 27.4,
    attendanceScore: 24.08333,
    healthScore: 1,
    predictedDropoutRisk: 79.03373256,
  },
  {
    studentId: "STU004",
    scoredPercentage: 21.6,
    totalSubmissions: 17,
    submittedOnTime: 5,
    submittedLate: 12,
    attendancePercent: 33.33333,
    eventParticipationRate: 3.53754,
    rating: 1.506126,
    sportsDaysPercent: 0,
    totalFees: 80592,
    feesPaid: 19821,
    daysOverdue: 169,
    dropoutRiskPercentage: 88,
    academicScore: 21.6,
    attendanceScore: 16.83333,
    healthScore: 0,
    predictedDropoutRisk: 87.35412851,
  },
  {
    studentId: "STU005",
    scoredPercentage: 41.6,
    totalSubmissions: 29,
    submittedOnTime: 22,
    submittedLate: 7,
    attendancePercent: 62.5,
    eventParticipationRate: 43.82474,
    rating: 2.450399,
    sportsDaysPercent: 50,
    totalFees: 99861,
    feesPaid: 65042,
    daysOverdue: 86,
    dropoutRiskPercentage: 51,
    academicScore: 41.6,
    attendanceScore: 30.125,
    healthScore: 0,
    predictedDropoutRisk: 51.39473253,
  },
];

// helper to get any student row by ID
export function getStudentById(id) {
  return studentDbRows.find((s) => s.studentId === id) || studentDbRows[0];
}

// =========================
//  CURRENT STUDENT PICKER
// =========================

// 👉 change this ID if you want another student’s dashboard
const CURRENT_STUDENT_ID = "STU001";

export const currentStudent = getStudentById(CURRENT_STUDENT_ID);

// =========================
//  RISK LABEL / UTILITIES
// =========================

export function riskLabelFromPercentage(p) {
  if (p >= 70) return "High";
  if (p >= 35) return "Moderate";
  return "Low";
}

// =========================
//  HEADER / STAT CARDS
// =========================

export const mockStudentUser = {
  name: "Aditi Sharma", // you can replace with real name later
  prn: currentStudent.studentId,
  attendance: Math.round(currentStudent.attendancePercent),
  avgMarks: Number(currentStudent.scoredPercentage.toFixed(1)),
  risk: riskLabelFromPercentage(currentStudent.predictedDropoutRisk),
};

// =========================
//  ATTENDANCE TREND (AREA)
// =========================
// Simple fake 6-week trend ending at real attendance %

const baseAtt = currentStudent.attendancePercent;

export const mockAttendance = [
  { week: "W1", attendance: Math.round(baseAtt - 8) },
  { week: "W2", attendance: Math.round(baseAtt - 6) },
  { week: "W3", attendance: Math.round(baseAtt - 4) },
  { week: "W4", attendance: Math.round(baseAtt - 2) },
  { week: "W5", attendance: Math.round(baseAtt - 1) },
  { week: "W6", attendance: Math.round(baseAtt) },
];

// =========================
//  PARTICIPATION DONUT
// =========================
// Map DB metrics to the 3 chart slices

export const participationData = [
  {
    name: "Assignments",
    value: currentStudent.totalSubmissions,
  },
  {
    name: "On-time",
    value: currentStudent.submittedOnTime,
  },
  {
    name: "Events",
    value: Math.round(currentStudent.eventParticipationRate),
  },
];

export const partColors = ["#A855F7", "#22D3EE", "#10B981"];

// =========================
//  SGPA TREND (AREA)
// =========================
// Approximate SGPA from scoredPercentage just for UI

const currentSgpa = +(
  currentStudent.scoredPercentage / 10
).toFixed(1);

export const mockSGPA = [
  { sem: "Sem1", sgpa: +(currentSgpa - 0.6).toFixed(1) },
  { sem: "Sem2", sgpa: +(currentSgpa - 0.4).toFixed(1) },
  { sem: "Sem3", sgpa: +(currentSgpa - 0.2).toFixed(1) },
  { sem: "Sem4", sgpa: +(currentSgpa - 0.1).toFixed(1) },
  { sem: "Sem5", sgpa: +(currentSgpa - 0.05).toFixed(1) },
  { sem: "Sem6", sgpa: currentSgpa },
];

// =========================
//  SUBJECT PERFORMANCE BARS
// =========================
// Use the three dimension scores as “subjects”

export const mockSubjects = [
  {
    name: "Academics",
    score: Number(currentStudent.academicScore.toFixed(1)),
    details: "Overall academic performance",
  },
  {
    name: "Attendance",
    score: Number(currentStudent.attendanceScore.toFixed(1)),
    details: "Class attendance behaviour",
  },
  {
    name: "Health",
    // healthScore is small (0/1); bump slightly for visibility
    score: Number((currentStudent.healthScore * 10).toFixed(1)),
    details: "Reported health & wellbeing",
  },
];
