"use client";

import { useState, useCallback } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/dom";
import { ChevronRight } from "lucide-react";

import type { Database } from "@/lib/database.types";
import { statusConfig } from "@/lib/config";
import { KanbanColumn } from "./kanban-column";
import { KanbanCardContent } from "./kanban-card";
import { updateApplicationsOrder } from "@/lib/actions/applications";

type ApplicationStatus = Database["public"]["Enums"]["application_status"];
type ApplicationRow = Database["public"]["Tables"]["applications"]["Row"];

const ACTIVE_STATUSES: ApplicationStatus[] = [
  "bookmarked",
  "applied",
  "interviewing",
  "offer",
];

const ARCHIVE_STATUSES: ApplicationStatus[] = ["rejected", "withdrawn"];

export function KanbanBoard({
  grouped: initialGrouped,
}: {
  grouped: Partial<Record<ApplicationStatus, ApplicationRow[]>>;
}) {
  const [grouped, setGrouped] = useState(initialGrouped);

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
      const targetStatus = target.id as ApplicationStatus;
      const appId = source.id as string;

      if (sourceStatus === targetStatus) return;

      const current = grouped;
      const app = current[sourceStatus]?.find((a) => a.id === appId);
      if (!app) return;

      const sourceApps = (current[sourceStatus] ?? []).filter(
        (a) => a.id !== appId,
      );
      const updatedApp = { ...app, status: targetStatus };
      const targetApps = [...(current[targetStatus] ?? []), updatedApp];

      const updates: {
        id: string;
        status: ApplicationStatus;
        kanban_order: number;
      }[] = [
        ...sourceApps.map((a, i) => ({
          id: a.id,
          status: sourceStatus,
          kanban_order: i,
        })),
        ...targetApps.map((a, i) => ({
          id: a.id,
          status: a.status as ApplicationStatus,
          kanban_order: i,
        })),
      ];

      setGrouped({
        ...current,
        [sourceStatus]: sourceApps,
        [targetStatus]: targetApps,
      });

      updateApplicationsOrder(updates);
    },
    [grouped],
  );

  const archiveCount = ARCHIVE_STATUSES.reduce(
    (acc, s) => acc + (grouped[s]?.length ?? 0),
    0,
  );

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div>
        <div className="flex gap-4 overflow-x-auto pb-4">
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
          <details className="group mt-6">
            <summary className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
              Archive ({archiveCount})
            </summary>
            <div className="mt-4 flex gap-4 overflow-x-auto">
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
    </DragDropProvider>
  );
}
