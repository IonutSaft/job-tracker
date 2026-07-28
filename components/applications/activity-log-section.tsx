"use client";

import { formatDistanceToNow } from "date-fns";
import { History } from "lucide-react";

import type { Database } from "@/lib/database.types";
import { activityTypeConfig } from "@/lib/config";
import { useActivityLogs } from "@/hooks/use-activity-logs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";

type ActivityLog = Database["public"]["Tables"]["activity_logs"]["Row"];

export function ActivityLogSection({
  applicationId,
  initialActivityLogs,
}: {
  applicationId: string;
  initialActivityLogs: ActivityLog[];
}) {
  const { data: activityLogs, isFetching } = useActivityLogs(
    applicationId,
    initialActivityLogs,
  );

  return (
    <div>
      {isFetching ? (
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="relative flex gap-4 pb-5 last:pb-0"
              >
                <div className="relative z-10 mt-[5px] flex shrink-0">
                  <Skeleton className="size-[22px] rounded-full" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <Skeleton className="h-5 w-20 rounded-none" />
                    <Skeleton className="h-4 w-24 rounded-none" />
                  </div>
                  <Skeleton className="mt-1 h-4 w-3/4 rounded-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activityLogs.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <History />
            </EmptyMedia>
            <EmptyTitle>No activity recorded yet</EmptyTitle>
            <EmptyDescription>
              Activity will appear here as you update your application.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
          <div className="space-y-0">
            {activityLogs.map((log) => {
              const config = log.type ? activityTypeConfig[log.type] : null;

              return (
                <div
                  key={log.id}
                  className="relative flex gap-4 pb-5 last:pb-0"
                >
                  <div className="relative z-10 mt-[5px] flex shrink-0">
                    <div
                      className={`size-[22px] rounded-full ring-2 ring-background ${
                        config?.variant === "default"
                          ? "bg-primary"
                          : config?.variant === "secondary"
                            ? "bg-muted-foreground/60"
                            : config?.variant === "outline"
                              ? "bg-border"
                              : "bg-muted"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant={config?.variant ?? "ghost"}
                        className="shrink-0 rounded-none"
                      >
                        {config?.label ?? log.type ?? "Unknown"}
                      </Badge>
                      <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                        {formatDistanceToNow(new Date(log.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    {log.description && (
                      <p className="mt-1 font-mono text-sm text-muted-foreground leading-snug">
                        {log.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
