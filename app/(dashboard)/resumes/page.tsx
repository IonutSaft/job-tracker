import { Suspense } from "react";
import { getSupabaseClient, getCurrentUser, getResumes } from "@/lib/data";
import { ResumeLibrary } from "@/components/resumes/resume-library";

export default async function ResumesPage() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);

  const { data: resumes } = await getResumes(supabase, user?.id ?? "");

  return (
    <div className="p-6">
      <Suspense fallback={null}>
        <ResumeLibrary resumes={resumes ?? []} />
      </Suspense>
    </div>
  );
}
