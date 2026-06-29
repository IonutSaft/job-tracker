import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  let query = supabase
    .from("applications")
    .select("*")
    .eq("user_id", user?.id);

  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  query = query.order(sortBy, { ascending: sortDir === "asc" });

  const { data: applications } = await query;

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
