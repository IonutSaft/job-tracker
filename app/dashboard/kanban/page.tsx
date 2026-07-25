import Link from "next/link";
import { Kanban } from "lucide-react";

import { getSupabaseClient, getCurrentUser, getApplications } from "@/lib/data";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

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

  if ((applications ?? []).length === 0) {
    return (
      <div className="flex flex-1 min-h-0 flex-col items-center justify-center p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Kanban />
            </EmptyMedia>
            <EmptyTitle>No applications yet</EmptyTitle>
            <EmptyDescription>
              Create your first application to start tracking your job search on the kanban board.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button render={<Link href="/dashboard/applications" />} nativeButton={false}>
              Go to Applications
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
        {"// KANBAN BOARD"}
      </h1>
      <KanbanBoard applications={applications ?? []} />
    </div>
  );
}
