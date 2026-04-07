import React from "react";
import { Bell as BellIcon } from "../ui/icons";

export default function ParentHeader({
  child,
  risk,
  notifCount,
  onNotificationsOpen,
  profileOpen,
  setProfileOpen,
  showToast,
}) {
  const initials = child.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="flex items-center justify-between px-6 py-4 text-white">
      {/* Left: logo + text */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md shadow-md hover:scale-110 hover:rotate-3 transition-all duration-300">
          <span className="text-lg font-semibold">A</span>
        </div>
        <div>
          <p className="text-lg font-semibold leading-tight">
            Avighna — <span className="font-bold">Parent</span>
          </p>
          <p className="text-xs text-white/70">
            Personalized child monitoring · Risk &amp; intervention view
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onNotificationsOpen}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDE68A] focus:ring-offset-transparent"
          aria-label="Notifications"
        >
          <BellIcon />
          {notifCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-semibold text-white animate-[pulse_2s_ease-in-out_infinite]">
              {notifCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((p) => !p)}
            className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A855F7] focus:ring-offset-transparent"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#6b5dd3] flex items-center justify-center text-sm font-semibold">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs leading-tight font-medium">
                {child.name}&apos;s Parent
              </p>
              <p className="text-[10px] leading-tight text-white/70">
                parent@example.com
              </p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-52 rounded-2xl bg-white/95 shadow-xl backdrop-blur-xl border border-slate-100 p-3 z-20 text-slate-800 animate-[scaleIn_0.2s_ease-out]">
              <p className="text-xs font-semibold mb-2">Account</p>
              <button className="w-full text-xs text-left rounded-xl px-3 py-2 hover:bg-slate-50">
                Profile
              </button>
              <button className="w-full text-xs text-left rounded-xl px-3 py-2 hover:bg-slate-50">
                Settings
              </button>
              <button className="w-full text-xs text-left rounded-xl px-3 py-2 hover:bg-rose-50 text-rose-500">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
