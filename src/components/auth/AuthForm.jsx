// src/components/avighna/auth/AuthForm.jsx
import React from "react";
import { Award, Loader2 } from "lucide-react";
import PasswordField from "./AuthPasswordField";

export default function AuthForm({
  mode,
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
  return (
    <form
      className="mx-2 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isLoading) onSubmit && onSubmit();
      }}
    >
      {/* Email */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
          Institutional Email / ID
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b5dd3] focus:border-transparent focus:bg-white transition-all duration-300 hover:border-slate-300"
          placeholder="name@college.edu"
        />
      </div>

      {/* Full Name (Signup only) */}
      {mode === "signup" && (
        <div className="space-y-2 animate-[slideDown_0.3s_ease-out]">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b5dd3] focus:border-transparent focus:bg-white transition-all duration-300 hover:border-slate-300"
            placeholder="Enter your full name"
          />
        </div>
      )}

      {/* Password field + forgot password */}
      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onForgotPassword={onForgotPassword}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`mt-4 w-full rounded-2xl bg-gradient-to-r from-[#4e47dd] via-[#5d56e8] to-[#6b5dd3] py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b5dd3] relative overflow-hidden group
          ${isLoading ? "opacity-90 cursor-wait" : "hover:shadow-indigo-500/60 hover:scale-[1.02]"}`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
              <span>Please wait...</span>
            </>
          ) : (
            <>
              {mode === "login" ? "Continue" : "Create Account"}
              <Award
                className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                strokeWidth={2}
              />
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </form>
  );
}
