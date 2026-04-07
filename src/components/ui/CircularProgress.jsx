// src/features/parent/components/ui/CircularProgress.jsx

import React from "react";

export default function CircularProgress({ percent, size = 64, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = c - (clamped / 100) * c;
  const color =
    percent >= 66 ? "#ff7a7a" : percent >= 33 ? "#fbbf24" : "#34d399";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <g transform={`translate(${stroke / 2}, ${stroke / 2})`}>
        <circle
          cx={r}
          cy={r}
          r={r}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={r}
          cy={r}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${c} ${c}`}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 800ms ease, stroke 300ms",
          }}
        />
      </g>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={12}
        fill="white"
        style={{ fontWeight: 700 }}
      >
        {Math.round(clamped)}%
      </text>
    </svg>
  );
}
