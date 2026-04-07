// src/pages/Dashboard/ClassRightPanel.jsx
import React from "react";
import {
  AlertTriangle,
  MessageCircle,
  Activity,
  BarChart3,
} from "lucide-react";
import Card from "../ui/TeacherCard.jsx";

export default function ClassRightPanel() {
  return (
    <div className="w-full h-full flex flex-col gap-4 text-white">
      {/* Alerts */}
      <Card className="p-4">
        <header className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#FACC15]" />
            <h2 className="text-sm font-semibold">Alerts</h2>
          </div>
          <span className="text-[11px] text-emerald-200">Live</span>
        </header>
        <ul className="space-y-2 text-[11px]">
          <li className="rounded-2xl bg-white/10 px-3 py-2 border border-white/5">
            <p className="font-medium">
              Low attendance:{" "}
              <span className="font-semibold">Aditi Sharma</span>
            </p>
            <p className="text-white/70">58% — needs counseling</p>
          </li>
          <li className="rounded-2xl bg-white/10 px-3 py-2 border border-white/5">
            <p className="font-medium">
              Multiple attempts: <span className="font-semibold">Rahul</span>
            </p>
            <p className="text-white/70">2 attempts in Maths</p>
          </li>
        </ul>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4">
        <h2 className="text-sm font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 text-[11px]">
          {[
            { label: "Message", icon: MessageCircle },
            { label: "Schedule", icon: Activity },
            { label: "Mentor", icon: Activity },
            { label: "Export", icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              className="rounded-2xl bg-white/10 border border-white/10 px-3 py-3 flex flex-col items-center justify-center gap-1 hover:bg-white/20 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-4 flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold">AI Insights</p>
            <p className="text-[11px] text-white/70">
              Class dropout risk overview (demo)
            </p>
          </div>
          <div className="text-right text-[11px]">
            <p>
              <span className="text-lg font-semibold">23%</span>
              <span className="ml-1 text-xs">risk</span>
            </p>
            <p className="text-white/70">23% avg</p>
          </div>
        </header>

        <div className="space-y-2 text-[11px]">
          {[
            { name: "Saurabh N.", risk: 71, extra: "Att: 42%" },
            { name: "Rahul Patil", risk: 63, extra: "Att: 49%" },
            { name: "Aditi Sharma", risk: 58, extra: "Att: 58%" },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-2xl bg-white/10 px-3 py-2 border border-white/5 flex items-center justify-between gap-3"
            >
              <div>
                <p className="font-medium text-xs">{item.name}</p>
                <p className="text-[11px] text-white/70">{item.extra}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">{item.risk}%</span>
                <div className="h-1.5 w-16 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#FB7185]"
                    style={{ width: `${item.risk}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
