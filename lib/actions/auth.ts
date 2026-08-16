"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { checkRateLimit } from "@/lib/rate-limiter";

export type AuthResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

const SAFE_REDIRECTS = ["/dashboard"] as const;

function safeRedirect(destination: string): string {
  if (SAFE_REDIRECTS.includes(destination as typeof SAFE_REDIRECTS[number])) return destination;
  return "/dashboard";
}

function mapAuthError(message: string): string {
  const known: Record<string, string> = {
    "Invalid login credentials": "Invalid email or password",
    "Email not confirmed": "Please confirm your email before logging in",
  };
  return known[message] ?? message;
}

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? "unknown";
}

function normalizeUrl(url: string): string {
  const normalized = url.startsWith("http") ? url : `https://${url}`;
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

async function getRedirectOrigin(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto");

  if (host) {
    const scheme = proto ?? (host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
    return normalizeUrl(`${scheme}://${host}`);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return normalizeUrl(siteUrl);

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelUrl) return normalizeUrl(vercelUrl);

  return "http://localhost:3000/";
}

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

export async function login(
  _prevState: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const ip = await getClientIp();
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return { success: false, error: `Too many attempts. Try again in ${rateLimit.retryAfter} seconds.` };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (signInError) return { success: false, error: mapAuthError(signInError.message) };

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return { success: false, error: "Authentication failed. Please try again." };

  redirect(safeRedirect("/dashboard"));
}

export async function signup(
  _prevState: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const ip = await getClientIp();
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return { success: false, error: `Too many attempts. Try again in ${rateLimit.retryAfter} seconds.` };
  }

  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: { data: { full_name: parsed.data.name } },
  });

  if (error) {
    const message = mapAuthError(error.message);
    return { success: false, error: message };
  }

  const isNewUser = (data.user?.identities?.length ?? 0) > 0;
  if (!isNewUser) {
    return {
      success: false,
      error: "An account with this email already exists.",
    };
  }

  return { success: true };
}

export async function loginWithGoogle(): Promise<AuthResult<{ url: string }>> {
  const origin = await getRedirectOrigin();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}callback`,
    },
  });

  if (error) return { success: false, error: error.message };
  return { success: true, data: { url: data.url } };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  redirect("/");
}
