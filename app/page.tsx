import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Link href="/login" className="text-blue-500 hover:underline">
        Login
      </Link>
    </div>
  );
}
