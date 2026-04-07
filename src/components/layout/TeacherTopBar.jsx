// src/components/layout/TeacherTopBar.jsx
import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Bell,
  User,
  LogOut,
  ChevronRight,
  AlertTriangle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import ViewTabs from "../ui/TeacherViewTabs.jsx";
import { mockNotifications, mockStudents } from "../../utils/constants.js";

export default function TeacherTopBar({
  activeView,
  onChangeView,
  onStudentSelect,
}) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return mockStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleLogout = () => {
    alert("Faculty logged out (demo only)");
  };

  return (
    <header className="relative z-20 px-4 sm:px-6 py-3 sm:py-4 text-white max-w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT: branding */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md shadow-md hover:scale-110 hover:rotate-3 transition-all duration-300 shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-semibold leading-tight truncate">
              Teacher Dashboard - <span className="font-bold"></span>
            </p>
            <p className="text-[10px] sm:text-xs text-white/70 truncate">
              AI-Powered Student Monitor · Early Risk Detection
            </p>
          </div>
        </div>

        {/* RIGHT: tabs + actions (mobile-first) */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end w-full sm:w-auto">
          {/* Tabs row – full width on mobile, scrollable horizontally */}
          <div className="w-full sm:w-auto">
            <ViewTabs activeView={activeView} onChange={onChangeView} />
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Search (only md+) */}
            <div className="hidden md:flex items-center gap-2 mr-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-[11px] rounded-full bg-white/10 px-3 py-1.5 border border-white/10 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/60 w-44 lg:w-56"
                />
                {searchQuery && filteredStudents.length > 0 && (
                  <div className="absolute mt-1 w-full rounded-2xl bg-white/95 shadow-xl border border-slate-100 text-slate-800 max-h-56 overflow-y-auto z-20">
                    {filteredStudents.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          onStudentSelect(s);
                        }}
                        className="w-full text-left px-3 py-2 text-[11px] hover:bg-slate-100 flex flex-col"
                      >
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-[10px] text-slate-500">
                          PRN: {s.id}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications((prev) => !prev)}
                className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FDE68A] focus:ring-offset-transparent group"
                aria-label="Open notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                {mockNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F97316] text-[10px] font-semibold text-white animate-[pulse_2s_ease-in-out_infinite]">
                    {mockNotifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl bg-white/95 shadow-xl backdrop-blur-xl border border-slate-100 p-4 z-30 animate-[scaleIn_0.2s_ease-out]">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Notifications
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Risk alerts and parent verification requests.
                  </p>

                  <ul className="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1">
                    {mockNotifications.map((n) => {
                      const student = mockStudents.find(
                        (s) => s.id === n.studentId
                      );
                      return (
                        <li
                          key={n.id}
                          className="rounded-2xl bg-slate-50 px-3 py-2 text-xs flex gap-2 hover:bg-slate-100 transition-colors"
                        >
                          <div className="mt-1">
                            {n.type === "risk" ? (
                              <AlertTriangle className="w-4 h-4 text-[#FF6B6B]" />
                            ) : (
                              <MessageCircle className="w-4 h-4 text-[#06B6D4]" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 flex items-center gap-1">
                              {n.title}
                              <span className="inline-flex rounded-full bg-slate-200 px-2 py-0.5 text-[10px] text-slate-700">
                                {n.studentId}
                              </span>
                            </p>
                            <p className="text-[11px] text-slate-600">
                              {n.message}
                            </p>
                            {student && (
                              <button
                                type="button"
                                onClick={() => {
                                  onStudentSelect(student);
                                  setShowNotifications(false);
                                }}
                                className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#0EA5E9] hover:text-[#38BDF8] font-medium"
                              >
                                View student
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfile((prev) => !prev)}
                className="flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1.5 sm:px-3 hover:bg-white/20 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A855F7] focus:ring-offset-transparent"
              >
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#6b5dd3] flex items-center justify-center text-xs sm:text-sm">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs leading-tight font-medium">
                    Prof. Sharma
                  </p>
                  <p className="text-[10px] leading-tight text-white/70">
                    faculty@college.edu
                  </p>
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white/95 shadow-xl backdrop-blur-xl border border-slate-100 p-4 z-30 text-slate-800 animate-[scaleIn_0.2s_ease-out]">
                  <h3 className="text-sm font-semibold">Faculty Profile</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    View your details and sign out.
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#6b5dd3] flex items-center justify-center text-white font-semibold">
                      P
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Prof. Priya Sharma
                      </p>
                      <p className="text-xs text-slate-500">
                        faculty@college.edu
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <button
                      type="button"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-left hover:bg-slate-50 transition-colors duration-200 flex items-center justify-between group"
                    >
                      <span>View full profile</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowProfile(false)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-center hover:bg-slate-50 transition-colors duration-200"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl bg-gradient-to-r from-[#DC2626] to-[#FF6B6B] px-3 py-2 text-white font-medium hover:opacity-95 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
