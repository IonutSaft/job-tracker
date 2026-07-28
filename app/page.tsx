import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const features = [
  { label: "TRACK", description: "Monitor applications across every stage" },
  { label: "KANBAN", description: "Drag-and-drop pipeline workflow" },
  { label: "ANALYZE", description: "Stats, charts & funnel insights" },
] as const;

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-heading text-3xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_12px_rgba(0,255,65,0.5)]">
            {"// JOB TRACKER"}
          </h1>
          <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
            v1.0
          </span>
          <span className="mt-1 select-none font-mono text-xs tracking-[0.5em] text-muted-foreground/40">
            {"\u2500".repeat(20)}
          </span>
        </div>

        <div className="flex w-full flex-col gap-3">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 font-mono text-sm"
            >
              <span className="w-20 shrink-0 font-heading text-xs tracking-widest text-primary">
                [{f.label}]
              </span>
              <span className="text-card-foreground">{f.description}</span>
            </div>
          ))}
        </div>

        <div className="w-full border border-border bg-card p-4">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">&gt;</span>{" "}
            <span className="animate-blink">_</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-none border border-primary bg-primary/10 px-6 py-3 font-heading text-sm uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary/20 [text-shadow:0_0_8px_rgba(0,255,65,0.4)]"
          >
            Start Tracking
          </Link>
          <Link
            href="/signup"
            className="font-mono text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
