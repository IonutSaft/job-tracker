import { ChevronRight } from "lucide-react";

import type { Database } from "@/lib/database.types";
import { statusConfig } from "@/lib/config";
import { KanbanColumn } from "./kanban-column";

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
  grouped,
}: {
  grouped: Partial<Record<ApplicationStatus, ApplicationRow[]>>;
}) {
  const archiveCount = ARCHIVE_STATUSES.reduce(
    (acc, s) => acc + (grouped[s]?.length ?? 0),
    0,
  );

  return (
    <div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {ACTIVE_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            title={statusConfig[status].label}
            applications={grouped[status] ?? []}
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
              />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
