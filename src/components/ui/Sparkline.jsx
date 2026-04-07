// src/features/parent/components/ui/Sparkline.jsx

import React from "react";

export default function Sparkline({ values = [], width = 120, height = 36 }) {
  if (!values || values.length === 0) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const step = width / (values.length - 1);

  const points = values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const last = values[values.length - 1];
  const trendUp = last >= values[0];

  return (
    <svg width={width} height={height} aria-hidden>
      <polyline
        points={points}
        fill="none"
        stroke={trendUp ? "#6ee7b7" : "#fca5a5"}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={step * (values.length - 1)}
        cy={height - ((last - min) / range) * height}
        r={3}
        fill={trendUp ? "#34d399" : "#f87171"}
      />
    </svg>
  );
}
