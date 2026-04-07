// src/components/avighna/auth/AuthModeToggle.jsx
import React from "react";

export default function AuthModeToggle({ mode, setMode }) {
  return (
    <div className="mx-2 flex items-center justify-center gap-3 text-sm mb-6 bg-slate-100/80 rounded-full p-1">
      <button
        type="button"
        onClick={() => setMode("login")}
        className={`px-5 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6b5dd3] focus:ring-offset-2
          ${
            mode === "login"
              ? "bg-gradient-to-r from-[#4e47dd] to-[#6b5dd3] text-white font-semibold shadow-lg shadow-indigo-300/50"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => setMode("signup")}
        className={`px-5 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6b5dd3] focus:ring-offset-2
          ${
            mode === "signup"
              ? "bg-gradient-to-r from-[#4e47dd] to-[#6b5dd3] text-white font-semibold shadow-lg shadow-indigo-300/50"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
          }`}
      >
        Sign up
      </button>
    </div>
  );
}
