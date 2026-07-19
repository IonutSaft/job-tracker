import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg">Welcome to Job Tracker</p>
        <Link
          href="/login"
          className="text-sm text-blue-500 underline underline-offset-4 hover:text-blue-700"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}
