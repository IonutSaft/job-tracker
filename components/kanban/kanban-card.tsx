"use client";

import { useDraggable, useDroppable } from "@dnd-kit/react";
import { format } from "date-fns";
import type { Database } from "@/lib/database.types";
import { formatSalary } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ApplicationRow = Database["public"]["Tables"]["applications"]["Row"];

export function KanbanCard({ application }: { application: ApplicationRow }) {
  const { ref: dragRef, isDragging } = useDraggable({
    id: application.id,
    data: { application },
  });

  const { ref: dropRef, isDropTarget } = useDroppable({
    id: `sortable-${application.id}`,
    data: { application },
  });

  return (
    <div
      ref={(el) => {
        dragRef(el);
        dropRef(el);
      }}
      className={cn(isDragging && "opacity-50")}
    >
      <KanbanCardContent
        application={application}
        isDropTarget={isDropTarget}
      />
    </div>
  );
}

export function KanbanCardContent({
  application,
  isDropTarget,
}: {
  application: ApplicationRow;
  isDropTarget?: boolean;
}) {
  const salary = formatSalary(
    application.salary_min,
    application.salary_max,
    application.salary_currency,
  );

  return (
    <Card
      size="sm"
      className={cn(
        "cursor-grab active:cursor-grabbing rounded-none border-border transition-shadow hover:bg-muted/30",
        isDropTarget && "ring-2 ring-primary",
      )}
    >
      <CardContent className="flex flex-col gap-1.5">
        <p className="font-medium leading-snug">
          {application.company_name || "Untitled Company"}
        </p>
        {application.role_title && (
          <p className="text-xs text-muted-foreground">
            {application.role_title}
          </p>
        )}
        {(salary || application.applied_at) && (
          <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
            {salary ? <span>{salary}</span> : <span />}
            {application.applied_at && (
              <span>{format(new Date(application.applied_at), "MMM d")}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
