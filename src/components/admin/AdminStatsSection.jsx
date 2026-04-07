// src/features/admin/components/AdminStatsSection.jsx
import React from "react";
import { User, Clock, Check } from "lucide-react";
import StatCard from "../../components/common/StatCard";

const AdminStatsSection = ({ totalTeachers, pendingCount, verifiedCount }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      <StatCard
        label="Total Faculty"
        value={totalTeachers}
        icon={<User className="w-5 h-5" />}
      />
      <StatCard
        label="Pending"
        value={pendingCount}
        tone="warning"
        icon={<Clock className="w-5 h-5" />}
      />
      <StatCard
        label="Verified"
        value={verifiedCount}
        tone="success"
        icon={<Check className="w-5 h-5" />}
      />
    </section>
  );
};

export default AdminStatsSection;
