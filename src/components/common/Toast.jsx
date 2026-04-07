// src/features/parent/components/Toast.jsx

import React from "react";

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed right-4 bottom-4 z-30 rounded-2xl bg-black/40 text-white text-xs px-4 py-2 border border-white/20 backdrop-blur-xl shadow-lg">
      {message}
    </div>
  );
}
