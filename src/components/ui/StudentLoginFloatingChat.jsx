import React from "react";
import { MessageCircle, X } from "lucide-react";

export default function StudentLoginFloatingChat({
  aiOpen,
  aiMessages,
  aiInput,
  onAiInputChange,
  onToggleAiOpen,
  onSendAiMessage,
  onClosePopups, // to close notif/profile
}) {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {aiOpen && (
        <div className="w-[360px] p-3 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">AI Assistant</div>
            <button
              onClick={onToggleAiOpen}
              className="p-1 rounded-md hover:bg-white/6"
            >
              <X size={16} />
            </button>
          </div>
          <div
            style={{ maxHeight: 220, overflowY: "auto" }}
            className="space-y-2 py-1"
          >
            {aiMessages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-md ${
                  m.from === "bot"
                    ? "bg-white/6 text-white/90"
                    : "bg-indigo-600 text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              value={aiInput}
              onChange={(e) => onAiInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSendAiMessage()}
              className="flex-1 p-2 rounded-md bg-white/6 border border-white/10"
            />
            <button
              onClick={onSendAiMessage}
              className="px-3 py-2 rounded-md bg-indigo-600"
            >
              Send
            </button>
          </div>
          <div className="text-xs opacity-70 mt-2">
            // TODO: replace with real AI backend
          </div>
        </div>
      )}

      <button
        onClick={() => {
          onClosePopups();
          onToggleAiOpen();
        }}
        className="w-16 h-16 rounded-full bg-[#22D3EE] flex items-center justify-center shadow-xl hover:scale-105 transition"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
