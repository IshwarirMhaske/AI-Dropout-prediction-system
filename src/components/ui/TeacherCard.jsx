// src/components/ui/Card.jsx
import React from "react";

export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={
        "rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.45)] " +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
}
