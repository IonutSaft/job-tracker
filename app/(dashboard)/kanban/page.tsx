import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { KanbanBoard } from "@/components/kanban/kanban-board";

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

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Kanban</h1>
      <KanbanBoard applications={applications ?? []} />
    </div>
  );
}
