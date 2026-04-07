import { supabase } from "../supabase/supabaseClient";

export async function handleAuth({
  mode,
  selectedRole,
  email,
  password,
  fullName,
}) {
  if (!email || !password || (mode === "signup" && !fullName)) {
    throw new Error("Please fill all fields.");
  }

  // ---------------- SIGNUP ----------------
  if (mode === "signup") {
    const { data: authData, error: authError } = await supabase.auth.signUp(
      { email, password },
      {
        emailRedirectTo: window.location.origin,
        data: { email_confirm: true },
      }
    );

    if (authError) throw new Error(authError.message);

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

    if (insertError) throw new Error(insertError.message);

    return { status: "signup-success" };
  }

  // ---------------- LOGIN ----------------
  if (mode === "login") {
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (loginError) throw new Error(loginError.message);

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

    if (!userRole) throw new Error("Role not found. Contact support.");

    // Faculty
    if (userRole === "faculty") {
      const { data } = await supabase
        .from("faculty")
        .select("is_verified")
        .eq("id", userId)
        .single();

      if (!data.is_verified)
        throw new Error("Your account is pending admin verification.");

      return { redirect: "/faculty-dashboard" };
    }

    // Admin
    if (userRole === "admins") return { redirect: "/admin-dashboard" };

    // Student
    if (userRole === "students") {
      const { data } = await supabase
        .from("students")
        .select("is_verified")
        .eq("id", userId)
        .single();

      if (!data.is_verified)
        throw new Error("Your account is pending teacher verification.");

      return { redirect: "/student-dashboard" };
    }

    // Parent
    if (userRole === "parents") {
      const { data } = await supabase
        .from("parents")
        .select("is_verified")
        .eq("id", userId)
        .single();

      if (!data.is_verified)
        throw new Error("Your account is pending teacher verification.");

      return { redirect: "/parent-dashboard" };
    }
  }
}
