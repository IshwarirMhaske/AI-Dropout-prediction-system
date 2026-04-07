import React from "react";

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-28 z-50">
      <div className="px-4 py-2 rounded-lg bg-black/70 text-white text-sm">
        {message}
      </div>
    </div>
  );
}
