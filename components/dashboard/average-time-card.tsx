import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AverageTimeCard({ value }: { value: number | null }) {
  return (
    <Card size="sm">
      <CardHeader className="flex-row items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">Avg Time to Interview</span>
        <Clock className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value !== null ? `${value} days` : "—"}</div>
        <p className="mt-1 text-xs text-muted-foreground">
          {value !== null
            ? "Mean days from application to first interview"
            : "No interview data yet"}
        </p>
      </CardContent>
    </Card>
  );
}
