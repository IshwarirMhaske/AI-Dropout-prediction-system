import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://myhhyerrbpoxnkquraox.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15aGh5ZXJyYnBveG5rcXVyYW94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDc5MzUsImV4cCI6MjA3OTcyMzkzNX0.hRXvjBOOYhT7N7DE0xj0AgwR01G62TQE1YxsLVrzht8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
