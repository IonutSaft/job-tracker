import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { KanbanBoard } from "@/components/kanban/kanban-board";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];
type ApplicationRow = Database["public"]["Tables"]["applications"]["Row"];

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user?.id)
    .order("kanban_order", { ascending: true })
    .order("applied_at", { ascending: false });

  const grouped: Partial<Record<ApplicationStatus, ApplicationRow[]>> = {};
  for (const app of applications ?? []) {
    const status = app.status as ApplicationStatus | null;
    if (status) {
      if (!grouped[status]) grouped[status] = [];
      grouped[status]!.push(app);
    }
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Kanban</h1>
      <KanbanBoard grouped={grouped} />
    </div>
  );
}
