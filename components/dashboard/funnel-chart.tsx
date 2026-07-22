"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_LABELS: Record<string, string> = {
  bookmarked: "Bookmarked",
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

const STATUS_COLORS: Record<string, string> = {
  bookmarked: "#00ff41",
  applied: "#4fc3f7",
  interviewing: "#ffb000",
  offer: "#00ff41",
  rejected: "#ff3333",
  withdrawn: "#5a8a5a",
};

interface FunnelDatum {
  status: string;
  count: number;
}

export function FunnelChart({ data }: { data: FunnelDatum[] }) {
  const chartData = data.map((d) => ({
    ...d,
    label: STATUS_LABELS[d.status] ?? d.status,
  }));

  return (
    <Card className="flex flex-col rounded-none border border-border bg-card min-h-0">
      <CardHeader className="shrink-0">
        <CardTitle className="font-heading text-xs uppercase tracking-wider">
          {"// APPLICATION FUNNEL"}
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
            <BarChart
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
              />
              <Bar dataKey="count" radius={[0, 0, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status] ?? "#5a8a5a"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
