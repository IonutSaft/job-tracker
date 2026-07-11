"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod";
import { contactSchema } from "@/lib/schemas/contacts";

export async function createContact(
  applicationId: string,
  data: z.infer<typeof contactSchema>,
) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { error } = await supabase.from("contacts").insert({
    application_id: applicationId,
    name: parsed.data.name,
    role: parsed.data.role || null,
    email: parsed.data.email || null,
    linkedin_url: parsed.data.linkedin_url || null,
    notes: parsed.data.notes || null,
    user_id: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}

export async function updateContact(
  id: string,
  data: z.infer<typeof contactSchema>,
) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("contacts")
    .update({
      name: parsed.data.name,
      role: parsed.data.role || null,
      email: parsed.data.email || null,
      linkedin_url: parsed.data.linkedin_url || null,
      notes: parsed.data.notes || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}

export async function deleteContact(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/applications");
  return { success: true };
}
