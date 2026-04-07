import React, { useEffect, useState } from "react";
import { mockSubjects, mockStudentUser } from "../../utils/constants";

import StudentLoginHeader from "../../components/layout/StudentLoginHeader";
import StudentLoginRightSidebar from "../../components/layout/StudentLoginRightSidebar";

import StudentLoginStatsRow from "../../components/common/StudentLoginStatsRow";
import StudentLoginAcademicOverview from "../../components/common/StudentLoginAcademicOverview";
import StudentLoginSubjectPerformance from "../../components/common/StudentLoginSubjectPerformance";
import StudentLoginSgpaProgress from "../../components/common/StudentLoginSgpaProgress";

import StudentLoginFloatingChat from "../../components/ui/StudentLoginFloatingChat";
import StudentLoginSubjectModal from "../../components/ui/StudentLoginSubjectModal";
import StudentLoginProfilePanel from "../../components/ui/StudentLoginProfilePanel";
import Toast from "../../components/ui/StudentToast";

export default function StudentDashboardPage() {
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [subjectModal, setSubjectModal] = useState({
    open: false,
    subject: null,
  });
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([
    { from: "bot", text: "Hi! I can suggest study plans and improvement tips." },
  ]);
  const [activeQuick, setActiveQuick] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [toast, setToast] = useState(null);

  const user = mockStudentUser;
  const poorestSubjects = [...mockSubjects]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  function showTemporaryToast(message) {
    setToast(message);
    window.clearTimeout(showTemporaryToast._t);
    showTemporaryToast._t = window.setTimeout(() => setToast(null), 2200);
  }

  function handleSubjectClick(payload) {
    const subj = payload && payload.payload ? payload.payload : payload;
    setSubjectModal({ open: true, subject: subj });
  }

  function closeSubjectModal() {
    setSubjectModal({ open: false, subject: null });
  }

  function toggleProfilePopover() {
    setShowNotif(false);
    setAiOpen(false);
    setShowProfilePopover((prev) => !prev);
  }

  function toggleNotif() {
    setShowProfilePopover(false);
    setAiOpen(false);
    setShowNotif((prev) => !prev);
  }

  function openProfilePanel() {
    setProfileOpen(true);
    setShowProfilePopover(false);
    setShowNotif(false);
    setAiOpen(false);
  }

  function closeProfilePanel() {
    setProfileOpen(false);
  }

  function handleQuickAction(key) {
    setActiveQuick((prev) => (prev === key ? null : key));
    showTemporaryToast(key + " opened");
  }

  function sendAiMessage() {
    if (!aiInput.trim()) return;
    const msg = { from: "user", text: aiInput.trim() };
    setAiMessages((prev) => [...prev, msg]);
    setAiInput("");
    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Recommended: 4 hrs/week on weak subjects; join mentor session.",
        },
      ]);
    }, 700);
  }

  function closeAllPopups() {
    setShowNotif(false);
    setShowProfilePopover(false);
  }

  function toggleAiOpen() {
    setAiOpen((prev) => !prev);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setShowNotif(false);
        setShowProfilePopover(false);
        setSubjectModal({ open: false, subject: null });
        setProfileOpen(false);
        setAiOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen w-full relative text-white bg-gradient-to-br from-[#4e47dd] via-[#5d56e8] to-[#6b5dd3] overflow-x-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute w-96 h-96 bg-purple-500/30 blur-3xl rounded-full -top-10 -left-10 animate-pulse" />
        <div className="absolute w-[32rem] h-[32rem] bg-cyan-500/20 blur-3xl rounded-full bottom-0 right-0 animate-pulse delay-500" />
      </div>

      {/* HEADER */}
      <StudentLoginHeader
        user={user}
        showNotif={showNotif}
        onToggleNotif={toggleNotif}
        showProfilePopover={showProfilePopover}
        onToggleProfilePopover={toggleProfilePopover}
        onOpenProfilePanel={openProfilePanel}
      />

      {/* MAIN CONTENT FULL WIDTH */}
      <main className="mt-3 relative z-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-6">

        <section className="lg:col-span-2 space-y-6">
          <StudentLoginStatsRow
            user={user}
            hoveredCard={hoveredCard}
            onHoverChange={setHoveredCard}
          />

          <StudentLoginAcademicOverview />

          <StudentLoginSubjectPerformance
            poorestSubjects={poorestSubjects}
            activeQuick={activeQuick}
            onQuickAction={handleQuickAction}
            onSubjectClick={handleSubjectClick}
          />

          <StudentLoginSgpaProgress />
        </section>

        <StudentLoginRightSidebar
          activeQuick={activeQuick}
          onQuickAction={handleQuickAction}
          aiInput={aiInput}
          onAiInputChange={setAiInput}
          onSendAiMessage={sendAiMessage}
        />
      </main>

      <StudentLoginFloatingChat
        aiOpen={aiOpen}
        aiMessages={aiMessages}
        aiInput={aiInput}
        onAiInputChange={setAiInput}
        onToggleAiOpen={toggleAiOpen}
        onSendAiMessage={sendAiMessage}
        onClosePopups={closeAllPopups}
      />

      <StudentLoginSubjectModal
        open={subjectModal.open}
        subject={subjectModal.subject}
        onClose={closeSubjectModal}
      />

      <StudentLoginProfilePanel
        open={profileOpen}
        user={user}
        onClose={closeProfilePanel}
      />

      <Toast message={toast} />

      {/* FULL WIDTH FOOTER */}
      <footer className="mt-10 text-xs opacity-80 text-center relative z-10 w-full py-4">
        Avighna • Smart Education Platform
      </footer>
    </div>
  );
}
