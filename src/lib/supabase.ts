import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bmmskjxaccrrjnesqxvt.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbXNranhhY2NycmpuZXNxeHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxOTM3NjIsImV4cCI6MjA4NDc2OTc2Mn0.aHYZhz8LYPldDqs4mVA3wM5F4S6prdKpr1GNJJzL0ww";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
