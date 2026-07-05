"use client";

import { useDroppable } from "@dnd-kit/react";
import type { Database } from "@/lib/database.types";
import { KanbanCard } from "./kanban-card";

type ApplicationRow = Database["public"]["Tables"]["applications"]["Row"];
type ApplicationStatus = Database["public"]["Enums"]["application_status"];

export function KanbanColumn({
  title,
  applications,
  status,
}: {
  title: string;
  applications: ApplicationRow[];
  status: ApplicationStatus;
}) {
  const { ref, isDropTarget } = useDroppable({ id: status });

  return (
    <div className="flex min-w-72 flex-col gap-3">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="inline-flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
          {applications.length}
        </span>
      </div>
      <div
        ref={ref}
        className={`flex flex-col gap-2 rounded-lg p-2 transition-colors ${
          isDropTarget ? "bg-muted/50 ring-2 ring-primary/20" : ""
        }`}
      >
        {applications.length === 0 ? (
          <p className="text-xs text-muted-foreground">No applications</p>
        ) : (
          applications.map((app) => (
            <KanbanCard key={app.id} application={app} />
          ))
        )}
      </div>
    </div>
  );
}
