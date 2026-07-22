"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineDatum {
  week: string;
  count: number;
}

function formatWeekLabel(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ApplicationsTimelineChart({ data }: { data: TimelineDatum[] }) {
  const chartData = data.map((d) => ({ ...d, label: formatWeekLabel(d.week) }));

  return (
    <Card className="flex flex-col rounded-none border border-border bg-card min-h-0">
      <CardHeader className="shrink-0">
        <CardTitle className="font-heading text-xs uppercase tracking-wider">
          {"// APPLICATIONS OVER TIME"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        {chartData.length === 0 ? (
          <p className="py-8 text-center font-mono text-sm text-muted-foreground">
            No applications yet.
          </p>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 574, height: 203 }}
          >
            <AreaChart
              data={chartData}
              margin={{ top: 0, right: 0, left: -16, bottom: 0 }}
            >
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fontFamily: "var(--font-sans)" }}
                stroke="var(--border)"
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fontFamily: "var(--font-sans)" }}
                stroke="var(--border)"
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  fontFamily: "var(--font-sans)",
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 0,
                }}
                formatter={(value) => [value, "Applications"]}
                labelFormatter={(label) => `Week of ${label}`}
              />
              <Area
                dataKey="count"
                fill="#00ff41"
                fillOpacity={0.15}
                stroke="#00ff41"
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
