import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient"; // added Supabase client
import AdminHeader from "../../components/layout/AdminHeader";
import AdminStatsSection from "../../components/admin/AdminStatsSection";
import TeacherListSection from "../../components/admin/TeacherListSection";
import TeacherProfilePanel from "../../components/layout/TeacherProfilePanel";

export default function AdminDashboardPage() {
  const [admin, setAdmin] = useState(null);

  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [verifiedTeachers, setVerifiedTeachers] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showAdminProfile, setShowAdminProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // ---------------- LOAD ADMIN ----------------
  const loadAdmin = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("admin")
        .select("*")
        .eq("id", user.id)
        .single();

      setAdmin(data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    }
  };

  // ---------------- LOAD TEACHERS ----------------
  const loadTeachers = async () => {
    try {
      const { data: pending } = await supabase
        .from("faculty")
        .select("*")
        .eq("is_verified", false);

      const { data: verified } = await supabase
        .from("faculty")
        .select("*")
        .eq("is_verified", true);

      setPendingTeachers(pending || []);
      setVerifiedTeachers(verified || []);
    } catch (err) {
      console.error("Teacher fetch error:", err);
    }
  };

  // ---------------- APPROVE ----------------
  const handleApprove = async (teacher) => {
    try {
      await supabase
        .from("faculty")
        .update({ is_verified: true })
        .eq("id", teacher.id);

      loadTeachers();
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  // ---------------- REJECT ----------------
  const handleReject = async (teacher) => {
    try {
      await supabase.from("faculty").delete().eq("id", teacher.id);
      loadTeachers();
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  // ---------------- REMOVE VERIFIED ----------------
  const handleRemoveVerified = async (teacher) => {
    try {
      await supabase.from("faculty").delete().eq("id", teacher.id);
      loadTeachers();
    } catch (err) {
      console.error("Remove verified error:", err);
    }
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setShowProfilePanel(true);
  };

  const getVisibleTeachers = () =>
    activeTab === "pending"
      ? pendingTeachers
      : activeTab === "verified"
      ? verifiedTeachers
      : [...pendingTeachers, ...verifiedTeachers];

  const totalTeachers = pendingTeachers.length + verifiedTeachers.length;

  useEffect(() => {
    loadAdmin();
    loadTeachers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#4e47dd] via-[#5d56e8] to-[#6b5dd3] text-white relative">
      <AdminHeader
        admin={admin}
        pendingTeachers={pendingTeachers}
        verifiedTeachers={verifiedTeachers}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        showAdminProfile={showAdminProfile}
        setShowAdminProfile={setShowAdminProfile}
        handleApprove={handleApprove}
        handleReject={handleReject}
        handleRemoveVerified={handleRemoveVerified}
        handleLogout={handleLogout}
      />

      <main className="flex-1 px-8 pb-8">
        <div className="mx-auto max-w-8xl">
          <h1 className="text-2xl font-semibold">Faculty Management</h1>
          <p className="text-sm text-white/80">
            View and verify faculty accounts
          </p>

          <AdminStatsSection
            totalTeachers={totalTeachers}
            pendingCount={pendingTeachers.length}
            verifiedCount={verifiedTeachers.length}
          />

          <TeacherListSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            teachers={getVisibleTeachers()}
            onViewTeacher={handleViewTeacher}
            onRemoveTeacher={handleRemoveVerified}
          />
        </div>

        <TeacherProfilePanel
          open={showProfilePanel}
          teacher={selectedTeacher}
          onClose={() => setShowProfilePanel(false)}
          onRemove={handleRemoveVerified}
        />
      </main>
    </div>
  );
}
