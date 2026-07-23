import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  valueClassName?: string;
}

export function StatCard({
  label,
  value,
  icon,
  description,
  valueClassName,
}: StatCardProps) {
  return (
    <Card size="sm" className="rounded-none border border-border bg-card">
      <CardHeader className="flex-row items-center justify-between gap-2">
        <span className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-primary">{icon}</span>
      </CardHeader>
      <CardContent>
        <div
          className={`font-sans text-2xl  ${valueClassName || "text-primary [text-shadow:0_0_6px_rgba(0,255,65,0.3)]"}`}
        >
          {value}
        </div>
        {description && (
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
