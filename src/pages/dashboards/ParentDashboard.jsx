import React, { useEffect, useMemo, useState } from "react";
import MOCK_CHILD from "../../components/Parent/mockChild";
import {
    aggregate,
    computeFlags,
} from "../../components/Parent/parentRisk";
import ParentHeader from "../../components/layout/ParentHeader";
import ChildSummaryCard from "../../components/common/ChildSummaryCard";
import KeyIndicatorsCard from "../../components/common/KeyIndicatorsCard";
import MessagesSection from "../../components/common/MessagesSection"
import ProgressTimelineSection from "../../components/common/ProgressTimelineSection";
import InterventionPlanSection from "../../components/Parent/InterventionPlanSection";
import ResourcesSection from "../../components/Parent/ResourcesSection";
import Toast from "../../components/common/Toast";
export default function ParentDashboard() {
  const [child] = useState(MOCK_CHILD);
  const flags = useMemo(() => computeFlags(child), [child]);
  const risk = useMemo(() => aggregate(flags), [flags]);
  const riskPercent = risk === "High" ? 82 : risk === "Moderate" ? 48 : 18;

  const [messages, setMessages] = useState([
    {
      id: 1,
      by: "Mentor",
      text: "Discussed study plan on 10 Aug. Parent agreed to weekly check-ins.",
      date: "2025-08-10",
    },
    {
      id: 2,
      by: "Parent",
      text: "Will ensure regular attendance from next week.",
      date: "2025-08-11",
    },
  ]);
  const [msgText, setMsgText] = useState("");
  const [toast, setToast] = useState(null);
  const [notifCount, setNotifCount] = useState(2);
  const [profileOpen, setProfileOpen] = useState(false);

  const testValues = child.recentTests;

  const showToast = (msg) => {
    setToast(msg);
  };

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSendMessage = () => {
    if (!msgText.trim()) {
      showToast("Message cannot be empty");
      return;
    }
    const newMsg = {
      id: Date.now(),
      by: "Parent",
      text: msgText.trim(),
      date: new Date().toISOString(),
    };
    setMessages((m) => [...m, newMsg]);
    setMsgText("");
    showToast("Message sent to mentor");
  };

  const handleNotificationsOpen = () => {
    setNotifCount(0);
    showToast("Notifications opened");
  };
    return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#4e47dd] via-[#5d56e8] to-[#6b5dd3] text-slate-900 relative">
      {/* HEADER */}
      <ParentHeader
        child={child}
        risk={risk}
        notifCount={notifCount}
        onNotificationsOpen={handleNotificationsOpen}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        showToast={showToast}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 px-8 pb-8">
        <div className="mx-auto max-w-8xl">
          {/* Subtitle */}
          <div className="mt-4 mb-4 flex flex-wrap items-center justify-between gap-3 text-white">
            <p className="text-sm text-white/80">
              View your child&apos;s risk, progress, and recommended actions in
              one place.
            </p>
          </div>

          {/* TWO-COLUMN DASHBOARD LAYOUT */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LEFT COLUMN (wider: spans 2/3) */}
            <div className="flex flex-col gap-4 text-white md:col-span-2">
              {/* Child summary at top-left */}
              <ChildSummaryCard
                child={child}
                risk={risk}
                riskPercent={riskPercent}
                showToast={showToast}
              />

              {/* Key indicators below child card */}
              <KeyIndicatorsCard
                child={child}
                risk={risk}
                testValues={testValues}
              />

              {/* Messages at bottom-left */}
              <MessagesSection
                messages={messages}
                msgText={msgText}
                setMsgText={setMsgText}
                onSendMessage={handleSendMessage}
              />
            </div>

            {/* RIGHT COLUMN (narrower: 1/3) */}
            <div className="flex flex-col gap-4 text-white md:col-span-1">
              {/* Top-right: Progress timeline */}
              <ProgressTimelineSection child={child} />

              {/* Middle-right: Intervention plan */}
              <InterventionPlanSection showToast={showToast} />

              {/* Bottom-right: Resources */}
              <ResourcesSection child={child} />
            </div>
          </section>
        </div>

        <Toast message={toast} />

        <footer className="mt-6 text-center text-[11px] text-white/70">
          Avighna • Parent Dashboard
        </footer>
      </main>
    </div>
  );
}

