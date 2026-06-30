import type { Database } from "@/lib/database.types";
import { KanbanCard } from "./kanban-card";

type ApplicationRow = Database["public"]["Tables"]["applications"]["Row"];

export function KanbanColumn({
  title,
  applications,
}: {
  title: string;
  applications: ApplicationRow[];
}) {
  return (
    <div className="flex min-w-72 flex-col gap-3">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="inline-flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
          {applications.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
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
