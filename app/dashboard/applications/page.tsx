import { Suspense } from "react";

import {
  getSupabaseClient,
  getCurrentUser,
  getApplications,
} from "@/lib/data";
import { ApplicationsTable } from "@/components/applications/applications-table";
import { CreateApplicationDialog } from "@/components/applications/create-application-dialog";

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

  const { data: applications } = await getApplications(
    supabase,
    user?.id,
    {
      status: statusFilter || undefined,
      orderBy: sortBy,
      ascending: sortDir === "asc",
    },
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>
        <CreateApplicationDialog />
      </div>
      <Suspense fallback={null}>
        <ApplicationsTable initialData={applications ?? []} />
      </Suspense>
    </div>
  );
}
