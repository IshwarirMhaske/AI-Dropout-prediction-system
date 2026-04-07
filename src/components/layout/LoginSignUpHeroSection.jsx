// src/components/avighna/layout/HeroSection.jsx
import React from "react";
import {
  GraduationCap,
  Sparkles,
  Shield,
  Users,
  Brain,
  TrendingUp,
} from "lucide-react";
import FeatureChip from "../common/LoginSignupFeatureChip";

// 🔹 Predefined tagline list
const TAGLINES = [
  {
    line1: `"See the future with eyes of AI"`,
    line2: "Predict. Prevent. Prosper.",
  },
  {
    line1: `"Turning data into decisions"`,
    line2: "Smarter insights. Better outcomes.",
  },
  {
    line1: `"From patterns to possibilities"`,
    line2: "Discover what tomorrow holds.",
  },
  {
    line1: `"AI that watches over every student"`,
    line2: "Detect risk. Enable growth.",
  },
  {
    line1: `"Guiding every learner's journey"`,
    line2: "Insight. Support. Success.",
  },
];

export default function HeroSection() {
  const features = [
    { icon: Shield, label: "AI-Powered Risk Detection", delay: "0.4s" },
    {
      icon: TrendingUp,
      label: "Real-Time Performance Analytics",
      delay: "0.5s",
    },
    { icon: Users, label: "Proactive Student Support", delay: "0.6s" },
    { icon: Brain, label: "Personalized Counseling", delay: "0.7s" },
  ];

  // 🔹 Pick a random tagline once per mount (per refresh)
  const [tagline] = React.useState(() => {
    const index = Math.floor(Math.random() * TAGLINES.length);
    return TAGLINES[index];
  });

  return (
    <div className="px-2 flex flex-col justify-between h-full max-w">
      {/* Logo */}
      <header className="flex items-center gap-3 opacity-0 animate-[fadeInDown_0.8s_ease-out_forwards]">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 group hover:scale-110 transition-transform duration-300">
          <GraduationCap
            className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
            strokeWidth={2}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div>
          <p className="text-2xl font-bold leading-tight">Avighna</p>
          <p className="text-sm text-white/70 font-medium">
            Smart Education Platform
          </p>
        </div>
      </header>

      {/* Main text */}
      <main className="space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] mt-6 lg:mt-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
          <span className="block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
            Empowering Student Success
          </span>
          <span className="flex items-center gap-3 mt-2 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-300 bg-clip-text text-transparent">
            with AI
            <Sparkles
              className="w-8 h-8 lg:w-10 lg:h-10 text-amber-300 animate-pulse"
              strokeWidth={2}
            />
          </span>
        </h1>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
          Early dropout prediction, personalized counseling, and comprehensive
          monitoring for better academic outcomes.
        </p>

        <div className="mt-4 sm:mt-6 space-y-3">
          {features.map((f, i) => (
            <FeatureChip key={i} icon={f.icon} label={f.label} delay={f.delay} />
          ))}
        </div>
      </main>

      {/* Tagline card */}
      <div className="mt-6 lg:mt-10 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
        <div className="rounded-3xl bg-gradient-to-r from-[#F99B28] via-[#FDB05E] to-[#FDBA74] px-6 py-5 shadow-2xl shadow-orange-500/30 flex items-center gap-4 relative overflow-hidden group hover:shadow-orange-500/50 transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm relative z-10 group-hover:rotate-12 transition-transform duration-300">
            <Sparkles className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <div className="ms-4 relative z-10">
            <p className="text-base font-bold text-white">{tagline.line1}</p>
            <p className="text-sm text-white/90 font-medium">{tagline.line2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
