import React from "react";
import {
  Activity,
  CheckCircle2,
  MessageCircle,
  AlertTriangle,
} from "lucide-react";

/**
 * activeView should be one of:
 *  - "dashboard"
 *  - "verifications"
 *  - "counseling"
 *  - "alerts"
 *
 * onChange(viewId: string) is called when a tab is clicked.
 */
export default function ViewTabs({ activeView, onChange }) {
  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Activity,
    },
    {
      id: "verifications",
      label: "Verifications",
      icon: CheckCircle2,
    },
    {
      id: "counseling",
      label: "Counseling History",
      icon: MessageCircle,
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: AlertTriangle,
    },
  ];

  return (
    <nav
      aria-label="Teacher view navigation"
      className="flex items-center gap-1 rounded-full bg-white/10 px-1 py-1 backdrop-blur-md border border-white/15 min-w-0 overflow-x-auto scroll-smooth -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeView === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={[
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all duration-200 whitespace-nowrap",
              "hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/70",
              isActive
                ? "bg-white text-slate-900 shadow-sm"
                : "text-white/75",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Icon
              className={`w-3.5 h-3.5 ${
                isActive ? "opacity-90" : "opacity-80"
              }`}
            />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
