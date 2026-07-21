import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ROUND_TYPE_LABELS: Record<string, string> = {
  phone_screen: "Phone Screen",
  technical: "Technical",
  behavioral: "Behavioral",
  take_home: "Take Home",
  final: "Final",
  other: "Other",
};

interface UpcomingInterview {
  id: number;
  scheduled_at: string | null;
  round_type: string | null;
  title: string | null;
  company_name: string | null;
  role_title: string | null;
}

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = d.toDateString() === tomorrow.toDateString();

  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  if (isToday) return `Today at ${time}`;
  if (isTomorrow) return `Tomorrow at ${time}`;

  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function UpcomingInterviews({ data }: { data: UpcomingInterview[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <CalendarDays className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No upcoming interviews.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {data.map((interview) => (
              <li
                key={interview.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {interview.company_name ?? "Unknown Company"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {interview.role_title ?? "Unknown Role"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="secondary">
                    {ROUND_TYPE_LABELS[interview.round_type ?? ""] ??
                      interview.round_type ??
                      "Round"}
                  </Badge>
                  {interview.scheduled_at && (
                    <span className="text-xs text-muted-foreground">
                      {formatDate(interview.scheduled_at)}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
