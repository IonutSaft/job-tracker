import { Suspense } from "react";
import Link from "next/link";
import { Kanban } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
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

async function KanbanFetcher() {
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

  return <KanbanBoard applications={applications ?? []} />;
}

function KanbanSkeleton() {
  const statuses = ["Bookmarked", "Applied", "Interviewing", "Offer"];
  return (
    <Card className="rounded-none border border-border bg-card">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto">
          {statuses.map((status) => (
            <div key={status} className="flex w-full min-w-64 flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <Skeleton className="h-4 w-24 rounded-none" />
                <Skeleton className="size-5 rounded-none" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-none border border-border bg-card p-3">
                  <Skeleton className="h-4 w-3/4 rounded-none" />
                  <Skeleton className="mt-2 h-3 w-1/2 rounded-none" />
                  <div className="mt-2 flex gap-1">
                    <Skeleton className="h-5 w-16 rounded-none" />
                    <Skeleton className="h-5 w-12 rounded-none" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default async function Page() {
  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
        {"// KANBAN BOARD"}
      </h1>
      <Suspense fallback={<KanbanSkeleton />}>
        <KanbanFetcher />
      </Suspense>
    </div>
  );
}
