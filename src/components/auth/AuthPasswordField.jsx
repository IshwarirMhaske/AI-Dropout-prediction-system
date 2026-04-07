// src/components/avighna/auth/PasswordField.jsx
import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({
  label = "Password",
  value,
  onChange,
  showPassword,
  setShowPassword,
  placeholder = "••••••••",
  onForgotPassword,
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
          {label}
        </label>
        {onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[11px] font-medium text-[#4e47dd] hover:text-[#3b36b5] underline-offset-2 hover:underline"
          >
            Forgot password?
          </button>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#6b5dd3] focus:border-transparent focus:bg-white transition-all duration-300 hover:border-slate-300"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" strokeWidth={2} />
          ) : (
            <Eye className="w-5 h-5" strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}
