import React from "react";

export default function StudentLoginRightSidebar({
  activeQuick,
  onQuickAction,
  aiInput,
  onAiInputChange,
  onSendAiMessage,
}) {
  // one shared “glass” style for each right-hand card
  const cardBase =
    "p-4 rounded-2xl border backdrop-blur-xl shadow-lg bg-white/6 border-white/10";

  return (
    <aside className="space-y-6">
      {/* Quick Actions */}
      <div className={cardBase}>
        <h4 className="font-semibold mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            ["message", "Message Mentor"],
            ["view", "View Assignments"],
            ["fees", "Fees Status"],
            ["certs", "Certificates"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => onQuickAction(key)}
              className={`p-3 rounded-lg transition ${
                activeQuick === key
                  ? "bg-white text-indigo-700"
                  : "bg-white/10 text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Assistant side-card */}
      <div className={cardBase}>
        <h4 className="font-semibold mb-2">AI Assistant</h4>
        <p className="text-sm opacity-80 mb-3">
          Ask about study plan, exam tips or attendance improvement.
        </p>
        <div className="flex gap-2">
          <input
            value={aiInput}
            onChange={(e) => onAiInputChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSendAiMessage()}
            className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60"
            placeholder="Type your question..."
          />
          <button
            onClick={onSendAiMessage}
            className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm"
          >
            Ask
          </button>
        </div>
        <div className="text-xs opacity-70 mt-2">
          // TODO: connect to AI backend
        </div>
      </div>

      {/* Risk Summary */}
      <div className={cardBase}>
        <h4 className="font-semibold mb-2">Risk Summary</h4>
        <div className="text-sm opacity-80">
          <div>
            Overall dropout risk: <strong>Moderate</strong>
          </div>
          <div className="mt-2 text-xs space-y-1">
            <div>• Attendance dips (W2-W3)</div>
            <div>• Lower DSA score</div>
            <div>• No recent counseling</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
