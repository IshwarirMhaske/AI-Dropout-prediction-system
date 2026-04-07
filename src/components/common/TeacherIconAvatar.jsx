// src/components/common/IconAvatar.jsx
import React from "react";

export default function IconAvatar({ name }) {
  return (
    <div className="h-7 w-7 rounded-2xl bg-gradient-to-tr from-[#FCD34D] to-[#F97316] flex items-center justify-center text-slate-900 font-semibold text-[11px]">
      {name?.charAt(0) ?? "S"}
    </div>
  );
}
