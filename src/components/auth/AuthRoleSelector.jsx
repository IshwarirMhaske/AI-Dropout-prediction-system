// src/components/avighna/auth/RoleSelector.jsx
import React from "react";

export default function RoleSelector({
  roles,
  selectedRole,
  setSelectedRole,
}) {
  return (
    <div className="mx-2 grid grid-cols-2 gap-3 mb-6">
      {roles.map(({ name, icon: Icon }) => {
        const isActive = selectedRole === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => setSelectedRole(name)}
            className={`rounded-2xl border text-sm py-3.5 px-3 flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6b5dd3] focus:ring-offset-2 relative overflow-hidden group
              ${
                isActive
                  ? "border-[#6b5dd3] bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] text-[#4e47dd] shadow-md shadow-purple-200 scale-[1.02]"
                  : "border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
              }`}
          >
            <Icon
              className={`w-4 h-4 transition-transform duration-300 ${
                isActive ? "scale-110 animate-[rolePulse_1.8s_ease-in-out_infinite]" : "group-hover:scale-110"
              }`}
              strokeWidth={2.5}
            />
            <span className="font-medium">{name}</span>
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
