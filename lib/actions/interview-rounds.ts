"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod";
import { interviewRoundSchema } from "@/lib/schemas/interview-rounds";
import type { Database } from "@/lib/database.types";

type RoundOutcome = Database["public"]["Enums"]["round_outcome"];

export async function createInterviewRound(
  applicationId: string,
  data: z.infer<typeof interviewRoundSchema>,
) {
  const parsed = interviewRoundSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { data: maxOrder } = await supabase
    .from("interview_rounds")
    .select("round_order")
    .eq("application_id", applicationId)
    .order("round_order", { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxOrder?.round_order ?? -1) + 1;

  const { error } = await supabase.from("interview_rounds").insert({
    application_id: applicationId,
    round_type: parsed.data.round_type,
    title: parsed.data.title,
    scheduled_at: parsed.data.scheduled_at || null,
    notes: parsed.data.notes || null,
    round_order: nextOrder,
    user_id: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}

export async function updateInterviewRoundOutcome(
  id: number,
  outcome: RoundOutcome,
) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const completedAt =
    outcome === "pending" ? null : new Date().toISOString();

  const { error } = await supabase
    .from("interview_rounds")
    .update({ outcome, completed_at: completedAt })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}

export async function deleteInterviewRound(id: number) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("interview_rounds")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}
