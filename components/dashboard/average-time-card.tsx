import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AverageTimeCard({ value }: { value: number | null }) {
  return (
    <Card className="rounded-none border border-border bg-card">
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle className="font-heading text-xs uppercase tracking-wider">
          {"// Avg Time to Interview"}
        </CardTitle>
        <Clock className="size-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="font-sans text-2xl text-primary [text-shadow:0_0_6px_rgba(0,255,65,0.3)]">
          {value !== null ? `${value} days` : "—"}
        </div>
        <p className="mt-1 font-mono text-[10px] text-muted-foreground">
          {value !== null
            ? "Mean days from application to first interview"
            : "No interview data yet"}
        </p>
      </CardContent>
    </Card>
  );
}
