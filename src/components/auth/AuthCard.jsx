// src/components/avighna/auth/AuthCard.jsx
import React from "react";
import { GraduationCap, BookOpen, Users, Shield, Award } from "lucide-react";
import RoleSelector from "./AuthRoleSelector";
import AuthModeToggle from "./AuthModeToggle";
import AuthForm from "./AuthForm";

export default function AuthCard({
  mode,
  setMode,
  roles,
  selectedRole,
  setSelectedRole,
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  showPassword,
  setShowPassword,
  isLoading,
  onSubmit,
  onForgotPassword,
}) {
  const roleStyleMap = {
    Admin: {
      Icon: Shield,
      gradient: "from-[#f97316] via-[#facc15] to-[#f97316]",
    },
    Faculty: {
      Icon: BookOpen,
      gradient: "from-[#22c55e] via-[#4ade80] to-[#16a34a]",
    },
    Student: {
      Icon: GraduationCap,
      gradient: "from-[#3b82f6] via-[#6366f1] to-[#0ea5e9]",
    },
    Parent: {
      Icon: Users,
      gradient: "from-[#ec4899] via-[#f472b6] to-[#a855f7]",
    },
  };

  const { Icon: AvatarIcon, gradient } =
    roleStyleMap[selectedRole] || roleStyleMap.Student;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 🔹 Auth Card */}
      <div
        className="
          w-full
          max-w-[480px]
          max-h-[84vh]
          rounded-3xl
          bg-white/95
          shadow-2xl shadow-indigo-500/20
          backdrop-blur-xl
          p-6                       /* ⬅️ smaller padding */
          border border-white/80
          opacity-0
          animate-[scaleIn_0.6s_ease-out_0.2s_forwards]
          hover:shadow-indigo-500/30
          transition-shadow duration-300
          flex flex-col
          overflow-hidden
        "
      >
        {/* 🔁 Scrollable content area (will only show when really needed) */}
        <div className="flex-1 overflow-y-auto pr-1">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div
              className={`relative h-14 w-14 rounded-2xl bg-gradient-to-tr ${gradient} flex items-center justify-center text-white shadow-lg shadow-purple-500/50 transition-all duration-300 group animate-[rolePulse_1.8s_ease-in-out_infinite]`}
            >
              <AvatarIcon className="w-7 h-7" strokeWidth={2} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-1 mb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {mode === "login" ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-xs text-slate-500">
              {mode === "login"
                ? "Choose your role and sign in to continue."
                : "Choose your role and create your account to get started."}
            </p>
          </div>

          {/* Role selector */}
          <div className="mb-3">
            <RoleSelector
              roles={roles}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </div>

          {/* Login / Signup toggle */}
          <div className="mb-3">
            <AuthModeToggle mode={mode} setMode={setMode} />
          </div>

          {/* Form */}
          <AuthForm
            mode={mode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            fullName={fullName}
            setFullName={setFullName}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onForgotPassword={onForgotPassword}
          />

          <p className="mt-3 text-center text-[10px] text-slate-400 font-medium">
            Please select your role above to continue
          </p>
        </div>
      </div>

      {/* 🔻 Footer */}
      <footer className="flex flex-col items-center gap-2 text-[10px] text-slate-500 opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
        <span className="font-medium">Trusted by leading institutions</span>
        <div className="flex gap-3">
          {[GraduationCap, BookOpen, Award].map((Icon, i) => (
            <div
              key={i}
              className="h-6 w-6 rounded-md bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#6b5dd3] transition-all duration-300"
            >
              <Icon className="w-3 h-3" strokeWidth={2} />
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
