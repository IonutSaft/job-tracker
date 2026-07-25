import { Suspense } from "react";
import { getSupabaseClient, getCurrentUser, getResumes } from "@/lib/data";
import { ResumeLibrary } from "@/components/resumes/resume-library";

export default async function ResumesPage() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);

  const { data: resumes } = await getResumes(supabase, user?.id ?? "");

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)] mb-4">
        {"// RESUMES"}
      </h1>
      <Suspense fallback={null}>
        <ResumeLibrary resumes={resumes ?? []} />
      </Suspense>
    </div>
  );
}
