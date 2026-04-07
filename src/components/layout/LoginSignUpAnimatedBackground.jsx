// src/components/avighna/layout/AnimatedBackground.jsx
import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Brain,
  TrendingUp,
} from "lucide-react";

export default function AnimatedBackground() {
  const [icons, setIcons] = useState([]);
  const IconList = [GraduationCap, BookOpen, Users, Award, Brain, TrendingUp];

  useEffect(() => {
    const iconCount = 20;

    const items = Array.from({ length: iconCount }, (_, i) => {
      const Icon = IconList[i % IconList.length];
      const random = () => Math.random() * 100;

      const left = random();
      const top = random();

      // Opacity based on horizontal position:
      // Left side (0–50%)  -> 0.25–0.50
      // Right side (50–100%) -> 0.50–0.75
      let opacity;
      if (left < 50) {
        opacity = 0.25 + Math.random() * 0.25; // 0.25–0.50
      } else {
        opacity = 0.5 + Math.random() * 0.25; // 0.50–0.75
      }

      return {
        id: i,
        Icon,
        left,
        top,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 12, // 12–24s
        size: 14 + Math.random() * 20, // 14–34px
        opacity,
      };
    });

    setIcons(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ id, Icon, left, top, delay, duration, size, opacity }) => (
        <div
          key={id}
          className="absolute will-change-transform"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            opacity,
            animation: `floatRandom ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon size={size} strokeWidth={1.2} />
        </div>
      ))}
    </div>
  );
}
