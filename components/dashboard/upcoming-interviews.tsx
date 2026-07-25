import Link from "next/link";
import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

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

  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

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
    <Card className="flex flex-col rounded-none border border-border bg-card min-h-0">
      <CardHeader className="shrink-0">
        <CardTitle className="font-heading text-xs uppercase tracking-wider">
          {"// UPCOMING INTERVIEWS"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 overflow-auto">
        {data.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarDays />
              </EmptyMedia>
              <EmptyTitle>No upcoming interviews</EmptyTitle>
              <EmptyDescription>
                Interviews you schedule will appear here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" render={<Link href="/dashboard/applications" />} nativeButton={false}>
                View Applications
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <ul className="space-y-2">
            {data.map((interview) => (
              <li
                key={interview.id}
                className="flex items-center justify-between gap-4 rounded-none border border-border bg-muted/30 p-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-xs uppercase tracking-wider text-foreground">
                    {interview.company_name ?? "Unknown Company"}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
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
                    <span className="font-mono text-[10px] text-muted-foreground">
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
