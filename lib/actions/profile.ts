"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import z from "zod";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const avatarSchema = z.object({
  name: z.string().min(1),
  fileSize: z.number().min(1).max(MAX_IMAGE_SIZE),
  fileType: z.enum(ALLOWED_IMAGE_TYPES),
});

const profileUpdateSchema = z.object({
  full_name: z.string().min(1, "Name is required").max(100),
});

export async function updateProfile(formData: FormData) {
  const fullName = formData.get("full_name") as string | null;
  if (!fullName) return { error: "Full name is required" };

  const parsed = profileUpdateSchema.safeParse({ full_name: fullName });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid name" };
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return { error: "Not authenticated" };

  const avatarFile = formData.get("avatar") as File | null;
  let avatarUrl: string | null = null;

  if (avatarFile && avatarFile.size > 0) {
    const parsedAvatar = avatarSchema.safeParse({
      name: avatarFile.name,
      fileSize: avatarFile.size,
      fileType: avatarFile.type,
    });

    if (!parsedAvatar.success) {
      return { error: "Avatar must be a JPEG, PNG, or WebP image under 5MB" };
    }

    const sanitizedFileName = avatarFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `${user.id}/avatar-${Date.now()}-${sanitizedFileName}`;

    const arrayBuffer = await avatarFile.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, arrayBuffer, {
        contentType: avatarFile.type,
        upsert: true,
      });

    if (uploadError) return { error: uploadError.message };

    const { data: urlData } = await supabase.storage
      .from("avatars")
      .createSignedUrl(filePath, 31536000);

    avatarUrl = urlData?.signedUrl ?? null;
  }

  const updateData: Record<string, string | null> = {
    full_name: parsed.data.full_name,
    updated_at: new Date().toISOString(),
  };

  if (avatarUrl) {
    updateData.avatar_url = avatarUrl;
  }

  const { error: dbError } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id);

  if (dbError) return { error: dbError.message };

  revalidatePath("/dashboard/settings");
  return { success: true };
}
