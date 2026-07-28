import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSupabaseClient, getCurrentUser, getResumes } from "@/lib/data";
import { ResumeLibrary } from "@/components/resumes/resume-library";

async function ResumesFetcher() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);
  const { data: resumes } = await getResumes(supabase, user?.id ?? "");
  return <ResumeLibrary resumes={resumes ?? []} />;
}

function ResumesSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-none border border-border bg-card">
      <div className="border-b border-border flex items-center justify-between px-3 pt-1 pb-3">
        <Skeleton className="h-9 w-36 rounded-none" />
      </div>
      <div className="p-4 space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} size="sm" className="rounded-none border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-none" />
                <Skeleton className="h-4 w-40 rounded-none" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-28 rounded-none" />
                <div className="flex gap-1">
                  <Skeleton className="h-7 w-12 rounded-none" />
                  <Skeleton className="size-7 rounded-none" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default async function ResumesPage() {
  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)] mb-4">
        {"// RESUMES"}
      </h1>
      <Suspense fallback={<ResumesSkeleton />}>
        <ResumesFetcher />
      </Suspense>
    </div>
  );
}
