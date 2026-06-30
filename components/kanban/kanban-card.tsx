import { format } from "date-fns";
import type { Database } from "@/lib/database.types";
import { formatSalary } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";

type ApplicationRow = Database["public"]["Tables"]["applications"]["Row"];

export function KanbanCard({
  application,
}: {
  application: ApplicationRow;
}) {
  const salary = formatSalary(
    application.salary_min,
    application.salary_max,
    application.salary_currency,
  );

  return (
    <Card size="sm">
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
