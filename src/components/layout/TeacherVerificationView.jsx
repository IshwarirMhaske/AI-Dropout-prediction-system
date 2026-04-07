// TeacherVerificationView.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import Card from "../ui/TeacherCard.jsx";

export default function TeacherVerificationView({ onClose }) {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [pendingParents, setPendingParents] = useState([]);
  const [approvedParents, setApprovedParents] = useState([]);
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [approvedTeachers, setApprovedTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    setLoading(true);

    const fetchUsers = async (table) => ({
      pending: (await supabase.from(table).select("*").eq("is_verified", false)).data || [],
      approved: (await supabase.from(table).select("*").eq("is_verified", true)).data || [],
    });

    const students = await fetchUsers("students");
    const parents = await fetchUsers("parents");
    const teachers = await fetchUsers("teachers");

    setPendingStudents(students.pending);
    setApprovedStudents(students.approved);
    setPendingParents(parents.pending);
    setApprovedParents(parents.approved);
    setPendingTeachers(teachers.pending);
    setApprovedTeachers(teachers.approved);

    setLoading(false);
  };

  const handleAction = async (user, table, action) => {
    if (action === "Approved") {
      await supabase.from(table).update({ is_verified: true }).eq("id", user.id);
    } else {
      await supabase.from(table).delete().eq("id", user.id);
    }
    loadAllUsers();
  };

  if (loading) return <p className="text-white">Loading...</p>;

  const renderUserCard = (user, table, isPending = true) => (
    <div key={user.id} className="rounded-2xl bg-white/10 border border-white/15 px-3 py-3 flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold">{user.full_name}</p>
          <p className="text-[11px] text-white/70">{user.email}</p>
        </div>
        {isPending && (
          <div className="flex gap-2">
            <button
              onClick={() => handleAction(user, table, "Approved")}
              className="rounded-lg bg-emerald-500 hover:bg-emerald-600 px-3 py-1 text-[11px] font-medium"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => handleAction(user, table, "Rejected")}
              className="rounded-lg bg-rose-500 hover:bg-rose-600 px-3 py-1 text-[11px] font-medium"
            >
              ✕ Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderColumn = (title, emoji, badgeColor, users, table, isPending = true) => (
    <div className="rounded-3xl bg-white/10 border border-white/20 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20">{emoji}</span>
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-[11px] text-white/70">{isPending ? "Pending approvals" : "Already approved"}</p>
          </div>
        </div>
        <span className={`text-[11px] rounded-full ${badgeColor} px-3 py-1`}>
          {users.length} {isPending ? "Pending" : "Approved"}
        </span>
      </div>
      <div className="space-y-3 text-[11px]">
        {users.map((u) => renderUserCard(u, table, isPending))}
      </div>
    </div>
  );

  return (
    <Card className="mt-4 p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">🛡 Verification Management</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs hover:bg-white/20"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-[11px]">
        {renderColumn("Student Registrations", "👩‍🎓", "bg-fuchsia-500/80", pendingStudents, "students")}
        {renderColumn("Parent Registrations", "🧑‍💼", "bg-fuchsia-500/80", pendingParents, "parents")}
        {renderColumn("Teacher Registrations", "🧑‍🏫", "bg-fuchsia-500/80", pendingTeachers, "teachers")}
        {renderColumn("Approved Students", "👩‍🎓", "bg-green-500/80", approvedStudents, "students", false)}
        {renderColumn("Approved Parents", "🧑‍💼", "bg-green-500/80", approvedParents, "parents", false)}
        {renderColumn("Approved Teachers", "🧑‍🏫", "bg-green-500/80", approvedTeachers, "teachers", false)}
      </div>
    </Card>
  );
}
