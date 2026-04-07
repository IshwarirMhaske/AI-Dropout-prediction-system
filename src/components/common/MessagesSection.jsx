// src/features/parent/components/MessagesSection.jsx

import React from "react";
import { Send } from "../ui/icons";

export default function MessagesSection({
  messages,
  msgText,
  setMsgText,
  onSendMessage,
}) {
  return (
    <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl p-4 shadow-[0_18px_45px_rgba(15,23,42,0.45)] flex flex-col gap-3 text-white">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-white/15">
            <Send />
          </span>
          <p className="text-sm font-semibold">Messages</p>
        </div>
        <p className="text-[11px] text-white/70">{messages.length} total</p>
      </header>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-[11px]">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-2xl px-3 py-2 border border-white/10 ${
              m.by === "Parent"
                ? "bg-gradient-to-r from-[#6b5dd3aa] to-[#06B6D4aa]"
                : "bg-white/5"
            }`}
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold">{m.by}</span>
              <span className="text-white/70">
                {m.date ? new Date(m.date).toLocaleDateString() : ""}
              </span>
            </div>
            <p className="mt-1 text-[11px]">{m.text}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-1">
        <input
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
          placeholder="Write a message to mentor..."
          className="flex-1 rounded-2xl border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
        />
        <button
          type="button"
          onClick={onSendMessage}
          className="inline-flex items-center justify-center h-9 w-9 rounded-2xl bg-gradient-to-r from-[#6b5dd3] to-[#06B6D4] text-white hover:opacity-95 transition-all hover:scale-105"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}
