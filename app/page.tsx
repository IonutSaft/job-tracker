import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { logout } from "@/lib/actions/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName = user?.user_metadata.full_name ?? "Unknown User";
  const userAvatar = user?.user_metadata.avatar_url ?? "";

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          {userAvatar && (
            <Image
              src={userAvatar}
              alt="User Avatar"
              className="h-16 w-16 rounded-full"
              width={64}
              height={64}
              priority
            ></Image>
          )}
          <p className="text-lg">
            Hello, <span className="font-semibold">{displayName}</span>!
          </p>
          <form action={logout}>
            <button className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">Welcome to Job Tracker</p>
          <Link
            href="/login"
            className="text-sm text-blue-500 underline underline-offset-4 hover:text-blue-700"
          >
            Get started
          </Link>
        </div>
      )}
    </div>
  );
}
