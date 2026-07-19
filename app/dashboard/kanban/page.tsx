import {
  getSupabaseClient,
  getCurrentUser,
  getApplications,
} from "@/lib/data";
import { KanbanBoard } from "@/components/kanban/kanban-board";

export default async function Page() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);

  const query = getApplications(supabase, user?.id, {
    orderBy: "kanban_order",
    ascending: true,
  });
  const { data: applications } = await query.order("applied_at", {
    ascending: false,
  });

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Kanban</h1>
      <KanbanBoard applications={applications ?? []} />
    </div>
  );
}
