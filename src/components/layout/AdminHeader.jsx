// src/features/admin/components/AdminHeader.jsx
import React from "react";
import { GraduationCap, Bell, User, LogOut } from "lucide-react";
import NotificationsDropdown from "../../components/layout/NotificationsDropdown";

const AdminHeader = ({
  admin,
  pendingTeachers,
  verifiedTeachers,
  showNotifications,
  setShowNotifications,
  showAdminProfile,
  setShowAdminProfile,
  handleApprove,
  handleReject,
  handleRemoveVerified,
  handleLogout,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3 animate-[fadeDown_0.4s_ease-out]">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-md">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-lg font-semibold">
            {admin ? admin.full_name : "Admin"}
          </p>
          <p className="text-xs text-white/70">
            Faculty Verification Console
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 group"
          >
            <Bell className="w-5 h-5 text-white" />
            {pendingTeachers.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-semibold text-white">
                {pendingTeachers.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationsDropdown
              pendingTeachers={pendingTeachers}
              verifiedTeachers={verifiedTeachers}
              onApprove={handleApprove}
              onReject={handleReject}
              onRemoveVerified={handleRemoveVerified}
            />
          )}
        </div>

        {/* Admin Profile */}
        <button
          onClick={() => setShowAdminProfile((prev) => !prev)}
          className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#6b5dd3] flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs hidden sm:block">{admin?.full_name}</p>
        </button>

        {showAdminProfile && (
          <div className="absolute top-16 right-4 w-64 bg-white shadow-2xl p-4 rounded-xl text-slate-900 z-20">
            <p className="font-semibold">{admin?.full_name}</p>
            <p className="text-xs mb-3">{admin?.email}</p>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 mt-2 rounded-lg flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
