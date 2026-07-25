"use client";

import { useDroppable } from "@dnd-kit/react";
import { FileSearch } from "lucide-react";

import type { Database } from "@/lib/database.types";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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
    <div className="flex min-w-72 flex-col gap-3 rounded-none border border-border bg-card p-3">
      <div className="flex items-center gap-2">
        <h3 className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">
          {title}
        </h3>
        <span className="inline-flex items-center justify-center rounded-none bg-muted px-2 font-heading text-[10px] text-muted-foreground">
          {applications.length}
        </span>
      </div>
      <div
        ref={ref}
        className={`flex flex-col gap-2 rounded-none p-2 transition-colors ${
          isDropTarget ? "bg-muted/50 ring-2 ring-primary/20" : ""
        }`}
      >
        {applications.length === 0 ? (
          <Empty className="p-0 gap-1">
            <EmptyHeader className="gap-1">
              <EmptyMedia variant="icon">
                <FileSearch />
              </EmptyMedia>
              <EmptyTitle className="text-xs">No {title.toLowerCase()} applications</EmptyTitle>
            </EmptyHeader>
          </Empty>
        ) : (
          applications.map((app) => (
            <KanbanCard key={app.id} application={app} />
          ))
        )}
      </div>
    </div>
  );
}
