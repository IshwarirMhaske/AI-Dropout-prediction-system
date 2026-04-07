// src/components/layout/StudentLoginHeader.jsx
import React from "react";
import { Bell, GraduationCap, User } from "lucide-react";

export default function StudentLoginHeader({
  user,
  showNotif,
  onToggleNotif,
  showProfilePopover,
  onToggleProfilePopover,
  onOpenProfilePanel,
}) {
  const firstName = user?.name?.split(" ")[0] || "Student";

  return (
    <header className="relative z-20 px-4 sm:px-6 py-3 sm:py-4 text-white max-w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT: branding – same structure as TeacherTopBar */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md shadow-md hover:scale-110 hover:rotate-3 transition-all duration-300 shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-semibold leading-tight truncate">
              Student Dashboard - <span className="font-bold">{firstName}</span>
            </p>
            <p className="text-[10px] sm:text-xs text-white/70 truncate">
              Student Dashboard · AI-Assisted Insights
            </p>
          </div>
        </div>

        {/* RIGHT: actions – same sizing & spacing as TeacherTopBar */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={onToggleNotif}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDE68A] focus:ring-offset-transparent group"
              aria-label="Open notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-semibold text-white">
                2
              </span>
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl p-4 z-30">
                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2 text-cyan-200">
                  <Bell className="w-4 h-4" /> Notifications
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border-l-4 border-purple-400 cursor-pointer">
                    Mathematics assignment feedback uploaded
                  </div>
                  <div className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border-l-4 border-amber-400 cursor-pointer">
                    Attendance alert for Week 3
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={onToggleProfilePopover}
              className="flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1.5 sm:px-3 hover:bg-white/20 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A855F7] focus:ring-offset-transparent"
              aria-label="Open profile menu"
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#6b5dd3] flex items-center justify-center text-xs sm:text-sm">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs leading-tight font-medium truncate max-w-[140px]">
                  {user?.name || "Student"}
                </p>
                <p className="text-[10px] leading-tight text-white/70 truncate max-w-[160px]">
                  {user?.prn || user?.email || "student@college.edu"}
                </p>
              </div>
            </button>

            {showProfilePopover && (
              <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl p-4 z-30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#6b5dd3] flex items-center justify-center text-white font-semibold">
                    {firstName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {user?.name || "Student Name"}
                    </p>
                    <p className="text-[11px] text-white/70">
                      {user?.email || user?.prn || "student@college.edu"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <button
                    type="button"
                    onClick={onOpenProfilePanel}
                    className="w-full rounded-xl border border-white/20 px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200 flex items-center justify-between"
                  >
                    <span>View full profile</span>
                  </button>

                  <button
                    type="button"
                    className="w-full rounded-xl border border-white/10 px-3 py-2 text-center hover:bg-white/10 transition-colors duration-200"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="w-full rounded-xl bg-gradient-to-r from-[#DC2626] to-[#FF6B6B] px-3 py-2 text-white font-medium hover:opacity-95 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
