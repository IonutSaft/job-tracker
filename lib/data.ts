import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getCurrentUser(
  supabase: ReturnType<typeof createClient>,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export function getApplication(
  supabase: ReturnType<typeof createClient>,
  id: string,
  userId: string,
) {
  return supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();
}

export function getInterviewRounds(
  supabase: ReturnType<typeof createClient>,
  applicationId: string,
) {
  return supabase
    .from("interview_rounds")
    .select("*")
    .eq("application_id", applicationId)
    .order("round_order", { ascending: true });
}

export function getContacts(
  supabase: ReturnType<typeof createClient>,
  applicationId: string,
) {
  return supabase
    .from("contacts")
    .select("*")
    .eq("application_id", applicationId);
}

export function getActivityLogs(
  supabase: ReturnType<typeof createClient>,
  applicationId: string,
) {
  return supabase
    .from("activity_logs")
    .select("*")
    .eq("application_id", applicationId)
    .order("created_at", { ascending: false });
}

export function getResumes(
  supabase: ReturnType<typeof createClient>,
  userId: string,
) {
  return supabase
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export function getApplicationResume(
  supabase: ReturnType<typeof createClient>,
  resumeId: string,
) {
  return supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .single();
}

export function getProfile(
  supabase: ReturnType<typeof createClient>,
  userId: string,
) {
  return supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
}

export async function getDashboardStats(
  supabase: ReturnType<typeof createClient>,
  userId: string | undefined,
) {
  const { data: applications } = await supabase
    .from("applications")
    .select("status")
    .eq("user_id", userId);

  const total = applications?.length ?? 0;
  const activeStatuses = ["bookmarked", "applied", "interviewing"];
  const active = applications?.filter((a) => activeStatuses.includes(a.status ?? "")).length ?? 0;
  const offers = applications?.filter((a) => a.status === "offer").length ?? 0;
  const responded = applications?.filter((a) =>
    ["interviewing", "offer", "rejected"].includes(a.status ?? ""),
  ).length ?? 0;
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  return { totalApplications: total, activeApplications: active, offersReceived: offers, responseRate };
}

export function getApplications(
  supabase: ReturnType<typeof createClient>,
  userId: string | undefined,
  options?: { status?: string; orderBy?: string; ascending?: boolean },
) {
  let query = supabase.from("applications").select("*");

  if (userId) {
    query = query.eq("user_id", userId);
  }

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  query = query.order(options?.orderBy ?? "applied_at", {
    ascending: options?.ascending ?? false,
  });

  return query;
}
