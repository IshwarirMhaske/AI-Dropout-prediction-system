import React, { useState } from "react";
import { GraduationCap, BookOpen, Users, Shield, Eye, EyeOff, Award, Brain, TrendingUp, Sparkles } from "lucide-react";

import AuthCard from "../../components/auth/AuthCard.jsx";
import HeroSection from "../../components/layout/LoginSignUpHeroSection.jsx";
import AnimatedBackground from "../../components/layout/LoginSignUpAnimatedBackground.jsx";
import { supabase } from "../../supabase/supabaseClient"; 

export default function LoginSignUpPage() {
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ---------------- AUTHENTICATION LOGIC ----------------
  const handleSubmit = async () => {
    if (!email || !password || (mode === "signup" && !fullName)) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      // ---------------- SIGNUP ----------------
      if (mode === "signup") {
        const { data: authData, error: authError } = await supabase.auth.signUp(
          { email, password },
          {
            emailRedirectTo: window.location.origin,
            data: { email_confirm: true },
          }
        );

        if (authError) {
          alert(authError.message);
          setIsLoading(false);
          return;
        }

        const userId = authData.user.id;

        const tableMap = {
          Admin: "admins",
          Faculty: "faculty",
          Student: "students",
          Parent: "parents",
        };

        const tableName = tableMap[selectedRole];

        const { error: insertError } = await supabase.from(tableName).insert({
          id: userId,
          email,
          full_name: fullName,
          ...(tableName === "faculty" && { is_verified: false }),
        });

        if (insertError) {
          alert(insertError.message);
          setIsLoading(false);
          return;
        }

        alert("Account successfully created! Please log in.");
        setIsLoading(false);
        return;
      }

      // ---------------- LOGIN ----------------
      if (mode === "login") {
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({ email, password });

        if (loginError) {
          alert(loginError.message);
          setIsLoading(false);
          return;
        }

        const userId = loginData.user.id;

        const roleTables = ["admins", "faculty", "students", "parents"];
        let userRole = null;

        for (const table of roleTables) {
          const { data } = await supabase
            .from(table)
            .select("*")
            .eq("id", userId)
            .single();

          if (data) {
            userRole = table;
            break;
          }
        }

        if (!userRole) {
          alert("Role not found. Contact support.");
          setIsLoading(false);
          return;
        }

        // ---------------- FACULTY VERIFICATION CHECK ----------------
        if (userRole === "faculty") {
          const { data: facultyData } = await supabase
            .from("faculty")
            .select("is_verified")
            .eq("id", userId)
            .single();

          if (!facultyData.is_verified) {
            alert("Your account is pending admin verification.");
            setIsLoading(false);
            return;
          }

          window.location.href = "/faculty";
          return;
        }

        // ---------------- ADMIN REDIRECT ----------------
        if (userRole === "admins") {
          window.location.href = "/admin";
          return;
        }

        // ---------------- STUDENT REDIRECT ----------------
        if (userRole === "students") {
          const { data: studentData } = await supabase
            .from("students")
            .select("is_verified")
            .eq("id", userId)
            .single();

          if (!studentData.is_verified) {
            alert("Your account is pending teacher verification.");
            setIsLoading(false);
            return;
          }

          window.location.href = "/student";
          return;
        }

        // ---------------- PARENT REDIRECT ----------------
        if (userRole === "parents") {
          const { data: parentData } = await supabase
            .from("parents")
            .select("is_verified")
            .eq("id", userId)
            .single();

          if (!parentData.is_verified) {
            alert("Your account is pending teacher verification.");
            setIsLoading(false);
            return;
          }

          window.location.href = "/parent";
          return;
        }
      }
    } catch (error) {
      alert("Unexpected error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password feature not implemented yet.");
  };

  const roles = [
    { name: "Admin", icon: Shield },
    { name: "Faculty", icon: BookOpen },
    { name: "Student", icon: GraduationCap },
    { name: "Parent", icon: Users },
  ];

  return (
    <div
      className="
        min-h-screen
        w-full
        flex flex-col lg:flex-row
        bg-gradient-to-br from-[#4e47dd] via-[#5d56e8] to-[#6b5dd3]
        relative
        lg:overflow-hidden
      "
    >

      {/* LEFT PANEL */}
      <section
        className="
          relative z-10 text-white
          w-full lg:w-[62%]
          px-6 py-8 lg:px-16 lg:py-10
          flex items-center justify-start lg:items-stretch
          lg:h-screen
        "
      >
        <HeroSection />
        <AnimatedBackground />
      </section>

      {/* RIGHT PANEL */}
      <main
        className="
          w-full lg:flex-1
          flex items-center justify-center
          bg-gradient-to-br from-white/85 to-slate-100/90
          px-4 py-8 lg:py-0
          relative z-10
        "
      >
        <section className="w-full max-w-md my-4 lg:my-0">
          <AuthCard
            mode={mode}
            setMode={setMode}
            roles={roles}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            fullName={fullName}
            setFullName={setFullName}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onForgotPassword={handleForgotPassword}
          />
        </section>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          25% { transform: translateY(-30vh) rotate(5deg); opacity: 0.15; }
          50% { transform: translateY(-60vh) rotate(-5deg); opacity: 0.1; }
          75% { transform: translateY(-90vh) rotate(5deg); opacity: 0.05; }
          100% { transform: translateY(-120vh) rotate(0deg); opacity: 0; }
        }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes rolePulse { 0% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.06) rotate(2deg); } 100% { transform: scale(1) rotate(0deg); } }
      `}</style>
    </div>
  );
}
