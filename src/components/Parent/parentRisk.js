// src/features/parent/utils/parentRiskUtils.js

export function computeFlags(child) {
  return {
    attendanceRisk: child.attendancePercent < 70,
    performanceRisk:
      child.avgMarksPercent < 40 ||
      (child.scoreTrendPercentChange ?? 0) <= -10,
    attemptsRisk: (child.subjectAttempts ?? 0) >= 3,
    feesRisk: (child.feesDueMonths ?? 0) > 2,
  };
}

export function aggregate(flags) {
  const count =
    Number(flags.attendanceRisk) +
    Number(flags.performanceRisk) +
    Number(flags.attemptsRisk) +
    Number(flags.feesRisk);
  if (count >= 2 || (flags.attendanceRisk && flags.performanceRisk))
    return "High";
  if (count === 1) return "Moderate";
  return "Low";
}

export const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString() : "Not recorded";

export function downloadSummary(child, riskLabel) {
  const payload = {
    id: child.studentId,
    name: child.name,
    className: child.className,
    attendance: `${child.attendancePercent}%`,
    avgMarks: `${child.avgMarksPercent}%`,
    feesDueMonths: `${child.feesDueMonths} mo`,
    risk: riskLabel,
    generatedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${child.studentId}_summary.json`;
  a.click();
  URL.revokeObjectURL(url);
}
