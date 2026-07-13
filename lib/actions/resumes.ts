"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const MAX_SIZE = 50 * 1024 * 1024;

const resumeUploadSchema = z.object({
  name: z.string().min(1),
  fileSize: z.number().min(1).max(MAX_SIZE),
  fileType: z.enum(ALLOWED_TYPES),
});

export async function uploadResume(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) return { error: "No file provided" };

  const parsed = resumeUploadSchema.safeParse({
    name: file.name,
    fileSize: file.size,
    fileType: file.type,
  });

  if (!parsed.success) {
    return { error: "File must be PDF, DOC, or DOCX under 50MB" };
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = `${user.id}/${Date.now()}-${sanitizedFileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(filePath, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) return { error: uploadError.message };

  const { error: dbError } = await supabase.from("resumes").insert({
    name: file.name,
    file_path: filePath,
    file_size: file.size,
    user_id: user.id,
  });

  if (dbError) {
    await supabase.storage.from("resumes").remove([filePath]);
    return { error: dbError.message };
  }

  revalidatePath("/resumes");
  return { success: true };
}

export async function deleteResume(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { data: resume, error: fetchError } = await supabase
    .from("resumes")
    .select("file_path")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !resume) return { error: "Resume not found" };

  if (resume.file_path) {
    const { error: storageError } = await supabase.storage
      .from("resumes")
      .remove([resume.file_path]);

    if (storageError) return { error: storageError.message };
  }

  const { error: dbError } = await supabase
    .from("resumes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (dbError) return { error: dbError.message };

  revalidatePath("/resumes");
  return { success: true };
}

export async function getResumeSignedUrl(filePath: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const { data, error } = await supabase.storage
    .from("resumes")
    .createSignedUrl(filePath, 3600);

  if (error) return { error: error.message };

  return { url: data.signedUrl };
}
