"use client";

import { useCallback, useMemo } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/dom";
import { ChevronRight } from "lucide-react";

import { statusConfig } from "@/lib/config";
import {
  reorderInSameColumn,
  moveToColumn,
  buildUpdates,
  groupByStatus,
} from "@/lib/kanban-sort";
import type { ApplicationStatus, ApplicationRow } from "@/lib/kanban-sort";
import {
  useKanbanApplications,
  useReorderApplications,
} from "@/hooks/use-applications";
import { KanbanColumn } from "./kanban-column";
import { KanbanCardContent } from "./kanban-card";
import { Card } from "@/components/ui/card";

const ACTIVE_STATUSES: ApplicationStatus[] = [
  "bookmarked",
  "applied",
  "interviewing",
  "offer",
];

const ARCHIVE_STATUSES: ApplicationStatus[] = ["rejected", "withdrawn"];

export function KanbanBoard({
  applications: initialApplications,
}: {
  applications: ApplicationRow[];
}) {
  const { data: applications, isFetching } = useKanbanApplications(initialApplications);
  const reorderMutation = useReorderApplications();

  const grouped = useMemo(() => groupByStatus(applications), [applications]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { operation, canceled } = event;
      if (canceled) return;

      const source = operation.source;
      const target = operation.target;
      if (!source || !target) return;

      const sourceApp = source.data.application as
        | ApplicationRow
        | undefined;
      if (!sourceApp) return;
      const sourceStatus = sourceApp.status as ApplicationStatus;
      const appId = source.id as string;

      const targetApp = target.data?.application as
        | ApplicationRow
        | undefined;
      const targetStatus = (targetApp?.status ??
        target.id) as ApplicationStatus;

      const current = grouped;
      const app = current[sourceStatus]?.find((a) => a.id === appId);
      if (!app) return;

      if (sourceStatus === targetStatus) {
        const columnApps = current[sourceStatus] ?? [];
        if (!targetApp) return;

        const reordered = reorderInSameColumn(columnApps, appId, targetApp.id);
        if (reordered === columnApps) return;

        const updates = buildUpdates(reordered, sourceStatus);
        reorderMutation.mutate(updates);
        return;
      }

      const sourceApps = (current[sourceStatus] ?? []).filter(
        (a) => a.id !== appId,
      );
      const updatedApp = { ...app, status: targetStatus };
      const targetColumn = current[targetStatus] ?? [];
      const targetApps = moveToColumn(
        targetColumn,
        updatedApp,
        targetApp?.id,
      );

      const updates = [
        ...buildUpdates(sourceApps, sourceStatus),
        ...buildUpdates(targetApps, targetStatus),
      ];

      reorderMutation.mutate(updates);
    },
    [grouped, reorderMutation],
  );

  const archiveCount = ARCHIVE_STATUSES.reduce(
    (acc, s) => acc + (grouped[s]?.length ?? 0),
    0,
  );

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <Card className="rounded-none border border-border bg-card">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto">
            {ACTIVE_STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                title={statusConfig[status].label}
                applications={grouped[status] ?? []}
                status={status}
              />
            ))}
          </div>
          {archiveCount > 0 && (
            <details className="group">
              <summary className="flex cursor-pointer items-center gap-2 font-heading text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground">
                <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
                Archive ({archiveCount})
              </summary>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:overflow-x-auto">
                {ARCHIVE_STATUSES.map((status) => (
                  <KanbanColumn
                    key={status}
                    title={statusConfig[status].label}
                    applications={grouped[status] ?? []}
                    status={status}
                  />
                ))}
              </div>
            </details>
          )}
        </div>
      </Card>
      <DragOverlay dropAnimation={undefined}>
        {(source) => {
          if (!source) return null;
          return (
            <KanbanCardContent
              application={source.data.application as ApplicationRow}
            />
          );
        }}
      </DragOverlay>
      {isFetching && (
        <div className="flex items-center justify-center gap-1.5 py-1">
          <div className="size-1.5 animate-pulse rounded-full bg-primary" />
          <div className="size-1.5 animate-pulse rounded-full bg-primary [animation-delay:0.2s]" />
          <div className="size-1.5 animate-pulse rounded-full bg-primary [animation-delay:0.4s]" />
          <span className="font-mono text-[10px] text-muted-foreground">Refreshing...</span>
        </div>
      )}
    </DragDropProvider>
  );
}
