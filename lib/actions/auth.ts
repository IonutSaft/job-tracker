"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const passwordRule =
  "Password must be at least 8 characters with at least one lowercase letter, one uppercase letter, and one digit";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, passwordRule)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, passwordRule),
});
const signupSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, passwordRule)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, passwordRule),
    name: z.string().min(1, "Name is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginState = { error?: string; success?: boolean };
export type SignupState = { error?: string; success?: boolean };

export async function login(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });
  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function signup(
  _prevState: SignupState | null,
  formData: FormData,
): Promise<SignupState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.name } },
  });

  if (error) return { error: error.message };

  if (!data.user) {
    return { error: "An account with this email already exists" };
  }

  return { success: true };
}

export async function loginWithGoogle(): Promise<
  { url: string } | { error: string }
> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/callback`,
    },
  });

  if (error) return { error: error.message };
  return { url: data.url };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  redirect("/");
}
