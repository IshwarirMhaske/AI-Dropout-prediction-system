// src/components/layout/AppShell.jsx
import React from "react";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#4e47dd] via-[#5d56e8] to-[#6b5dd3] text-slate-900 transition-colors duration-500">
      {children}
    </div>
  );
}
