"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod";
import { applicationSchema } from "@/lib/schemas/applications";

export async function createApplication(data: z.infer<typeof applicationSchema>) {
  const parsed = applicationSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { error } = await supabase.from("applications").insert({
    company_name: parsed.data.company_name,
    role_title: parsed.data.role_title,
    status: parsed.data.status,
    work_type: parsed.data.work_type,
    job_url: parsed.data.job_url || null,
    location: parsed.data.location || null,
    notes: parsed.data.notes || null,
    salary_currency: parsed.data.salary_currency || null,
    salary_min: parsed.data.salary_min ?? null,
    salary_max: parsed.data.salary_max ?? null,
    applied_at: parsed.data.applied_at
      ? new Date(parsed.data.applied_at).toISOString()
      : null,
    user_id: user.id,
    kanban_order: 0,
    resume_id: null,
  });

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}

export async function updateApplication(
  id: string,
  data: z.infer<typeof applicationSchema>,
) {
  const parsed = applicationSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("applications")
    .update({
      company_name: parsed.data.company_name,
      role_title: parsed.data.role_title,
      status: parsed.data.status,
      work_type: parsed.data.work_type,
      job_url: parsed.data.job_url || null,
      location: parsed.data.location || null,
      notes: parsed.data.notes || null,
      salary_currency: parsed.data.salary_currency || null,
      salary_min: parsed.data.salary_min ?? null,
      salary_max: parsed.data.salary_max ?? null,
      applied_at: parsed.data.applied_at
        ? new Date(parsed.data.applied_at).toISOString()
        : null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}

export async function deleteApplication(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}
