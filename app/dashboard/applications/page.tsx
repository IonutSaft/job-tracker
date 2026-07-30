import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { getSupabaseClient, getCurrentUser, getApplications } from "@/lib/data";
import { ErrorBoundary } from "@/components/error-boundary";
import { ApplicationsTable } from "@/components/applications/applications-table";

const validSortColumns = [
  "company_name",
  "role_title",
  "status",
  "location",
  "applied_at",
  "salary_min",
] as const;

type SortableColumn = (typeof validSortColumns)[number];

async function ApplicationsFetcher(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);
  if (!user) return <ApplicationsTable initialData={[]} />;

  const sortByParam = searchParams?.sortBy;
  const sortBy =
    typeof sortByParam === "string" &&
    validSortColumns.includes(sortByParam as SortableColumn)
      ? (sortByParam as SortableColumn)
      : "applied_at";

  const sortDirParam = searchParams?.sortDir;
  const sortDir = sortDirParam === "asc" ? "asc" : "desc";

  const statusParam = searchParams?.status;
  const statusFilter = typeof statusParam === "string" ? statusParam : "";

  const { data: applications } = await getApplications(supabase, user.id, {
    status: statusFilter || undefined,
    orderBy: sortBy,
    ascending: sortDir === "asc",
  });

  return (
    <ErrorBoundary>
      <ApplicationsTable initialData={applications ?? []} />
    </ErrorBoundary>
  );
}

function ApplicationsSkeleton() {
  return (
    <Card className="flex flex-col rounded-none border border-border bg-card min-h-0">
      <div className="shrink-0 flex items-center justify-between border-b border-border px-3 pt-1 pb-3">
        <Skeleton className="h-8 w-44 rounded-none" />
        <Skeleton className="h-8 w-32 rounded-none" />
      </div>
      <div className="p-0">
        <div className="flex items-center gap-2 border-b border-border px-2 h-8">
          <Skeleton className="h-3 w-20 rounded-none" />
          <Skeleton className="h-3 w-12 rounded-none hidden md:block" />
          <Skeleton className="h-3 w-14 rounded-none hidden md:block" />
          <Skeleton className="h-3 w-16 rounded-none hidden md:block" />
          <Skeleton className="h-3 w-20 rounded-none hidden md:block" />
          <Skeleton className="h-3 w-16 rounded-none hidden md:block" />
          <Skeleton className="h-3 w-16 rounded-none" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 border-b border-border px-2 h-12">
            <Skeleton className="h-4 w-24 rounded-none" />
            <Skeleton className="h-4 w-20 rounded-none hidden md:block" />
            <Skeleton className="h-5 w-16 rounded-none hidden md:block" />
            <Skeleton className="h-4 w-28 rounded-none hidden md:block" />
            <Skeleton className="h-4 w-16 rounded-none hidden md:block" />
            <Skeleton className="h-4 w-12 rounded-none hidden md:block" />
            <Skeleton className="h-4 w-16 rounded-none" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default async function Page(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
        {"// APPLICATIONS"}
      </h1>
      <Suspense fallback={<ApplicationsSkeleton />}>
        <ApplicationsFetcher searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
