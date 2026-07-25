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
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
        {"// KANBAN"}
      </h1>
      <KanbanBoard applications={applications ?? []} />
    </div>
  );
}
