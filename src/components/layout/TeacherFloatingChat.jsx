// src/components/layout/FloatingChat.jsx
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-4 left-4 z-30 h-12 w-12 rounded-full bg-white/20 border border-white/30 backdrop-blur-md shadow-lg flex items-center justify-center hover:scale-110 transition-all"
        aria-label="Open AI chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {open && (
        <div className="fixed bottom-20 left-4 z-30 w-80 rounded-3xl bg-white/95 border border-slate-200 shadow-2xl backdrop-blur-xl p-4 text-slate-800 animate-[scaleIn_0.2s_ease-out]">
          <header className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-semibold">Avighna AI Assistant</p>
              <p className="text-[11px] text-slate-500">
                UI only – connect this with your AI backend.
              </p>
            </div>
            <button
              className="text-xs text-slate-500 hover:text-slate-700"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>
          <div className="h-32 rounded-2xl bg-slate-50 border border-slate-100 mb-2 p-2 text-[11px] text-slate-500">
            <p>
              Example: &quot;Which 5 students should I prioritize for counseling
              this week?&quot;
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask something about your class..."
              className="flex-1 rounded-2xl border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#4e47dd]"
            />
            <button className="rounded-2xl bg-[#4e47dd] px-3 py-1.5 text-[11px] text-white font-medium hover:bg-[#4338ca]">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
