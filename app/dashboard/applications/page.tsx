import { Suspense } from "react";

import { getSupabaseClient, getCurrentUser, getApplications } from "@/lib/data";
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

export default async function Page(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);

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

  const { data: applications } = await getApplications(supabase, user?.id, {
    status: statusFilter || undefined,
    orderBy: sortBy,
    ascending: sortDir === "asc",
  });

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
        {"// APPLICATIONS"}
      </h1>
      <Suspense fallback={null}>
        <ApplicationsTable initialData={applications ?? []} />
      </Suspense>
    </div>
  );
}
