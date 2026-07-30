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
  userId: string,
) {
  return supabase
    .from("interview_rounds")
    .select("*")
    .eq("application_id", applicationId)
    .eq("user_id", userId)
    .order("round_order", { ascending: true });
}

export function getContacts(
  supabase: ReturnType<typeof createClient>,
  applicationId: string,
  userId: string,
) {
  return supabase
    .from("contacts")
    .select("*")
    .eq("application_id", applicationId)
    .eq("user_id", userId);
}

export function getActivityLogs(
  supabase: ReturnType<typeof createClient>,
  applicationId: string,
  userId: string,
) {
  return supabase
    .from("activity_logs")
    .select("*")
    .eq("application_id", applicationId)
    .eq("user_id", userId)
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
  userId: string,
) {
  return supabase
    .from("resumes")
    .select("*")
    .eq("id", resumeId)
    .eq("user_id", userId)
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

export async function getApplicationFunnel(
  supabase: ReturnType<typeof createClient>,
  userId: string | undefined,
) {
  const { data: applications } = await supabase
    .from("applications")
    .select("status")
    .eq("user_id", userId);

  const counts: Record<string, number> = {};
  for (const app of applications ?? []) {
    const status = app.status ?? "unknown";
    counts[status] = (counts[status] ?? 0) + 1;
  }

  const statusOrder = ["bookmarked", "applied", "interviewing", "offer", "rejected", "withdrawn"];
  return statusOrder
    .filter((s) => counts[s] !== undefined)
    .map((status) => ({ status, count: counts[status] }));
}

export async function getApplicationTimeline(
  supabase: ReturnType<typeof createClient>,
  userId: string | undefined,
) {
  const { data } = await supabase
    .from("applications")
    .select("applied_at")
    .eq("user_id", userId)
    .not("applied_at", "is", null);

  const weeks: Record<string, number> = {};
  for (const app of data ?? []) {
    if (!app.applied_at) continue;
    const date = new Date(app.applied_at);
    const monday = new Date(date);
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    const key = monday.toISOString().split("T")[0];
    weeks[key] = (weeks[key] ?? 0) + 1;
  }

  return Object.entries(weeks)
    .map(([week, count]) => ({ week, count }))
    .sort((a, b) => a.week.localeCompare(b.week));
}

export async function getUpcomingInterviews(
  supabase: ReturnType<typeof createClient>,
  userId: string | undefined,
) {
  const now = new Date().toISOString();
  const { data } = await supabase
    .from("interview_rounds")
    .select("id, scheduled_at, round_type, title, applications(company_name, role_title)")
    .eq("user_id", userId)
    .gt("scheduled_at", now)
    .order("scheduled_at", { ascending: true });

  return (data ?? []).map((round: Record<string, unknown>) => {
    const app = round.applications as Record<string, unknown> | null;
    return {
      id: round.id as number,
      scheduled_at: round.scheduled_at as string | null,
      round_type: round.round_type as string | null,
      title: round.title as string | null,
      company_name: (app?.company_name as string | null) ?? null,
      role_title: (app?.role_title as string | null) ?? null,
    };
  });
}

export async function getAverageTimeToInterview(
  supabase: ReturnType<typeof createClient>,
  userId: string | undefined,
) {
  const { data } = await supabase
    .from("applications")
    .select("applied_at, interview_rounds(scheduled_at)")
    .eq("user_id", userId)
    .not("applied_at", "is", null);

  let totalDays = 0;
  let count = 0;

  for (const app of data ?? []) {
    if (!app.applied_at) continue;
    const rounds = (app as unknown as Record<string, unknown>).interview_rounds as
      | { scheduled_at: string | null }[]
      | null;
    if (!rounds || rounds.length === 0) continue;

    const firstRound = rounds
      .filter((r) => r.scheduled_at)
      .sort(
        (a, b) =>
          new Date(a.scheduled_at!).getTime() - new Date(b.scheduled_at!).getTime(),
      )[0];

    if (!firstRound?.scheduled_at) continue;

    const diff =
      (new Date(firstRound.scheduled_at).getTime() -
        new Date(app.applied_at).getTime()) /
      (1000 * 60 * 60 * 24);
    totalDays += diff;
    count++;
  }

  return count > 0 ? Math.round(totalDays / count) : null;
}

export function getApplications(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  options?: { status?: string; orderBy?: string; ascending?: boolean },
) {
  let query = supabase.from("applications").select("*").eq("user_id", userId);

  if (options?.status) {
    query = query.eq("status", options.status);
  }

  query = query.order(options?.orderBy ?? "applied_at", {
    ascending: options?.ascending ?? false,
  });

  return query;
}
