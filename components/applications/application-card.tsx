import { format } from "date-fns";

import type { Database } from "@/lib/database.types";
import { statusConfig } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

type Application = Database["public"]["Tables"]["applications"]["Row"];

const workTypeLabels: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "Fr",
  CNY: "¥",
  INR: "₹",
};

function formatSalary(
  min: number | null,
  max: number | null,
  currency: string | null,
) {
  const symbol = currency ? (currencySymbols[currency] ?? currency) : "$";

  if (min !== null && max !== null) {
    return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()}`;
  }
  if (min !== null) {
    return `${symbol}${min.toLocaleString()}+`;
  }
  if (max !== null) {
    return `Up to ${symbol}${max.toLocaleString()}`;
  }
  return null;
}

function Value({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: string;
}) {
  if (children == null || children === "") {
    return (
      <p className="text-sm italic text-muted-foreground">{fallback}</p>
    );
  }
  if (typeof children === "boolean" || typeof children === "number") {
    return <p className="text-sm">{String(children)}</p>;
  }
  return <p className="text-sm">{children}</p>;
}

export function ApplicationCard({ application }: { application: Application }) {
  const salary = formatSalary(
    application.salary_min,
    application.salary_max,
    application.salary_currency,
  );

  return (
    <FieldGroup className="py-4">
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <Field>
            <Label>Company</Label>
            <p className="text-sm font-medium">
              {application.company_name}
            </p>
          </Field>
          <Field>
            <Label>Role</Label>
            <p className="text-sm font-medium">
              {application.role_title}
            </p>
          </Field>
          <Field>
            <Label>Work Type</Label>
            <Value fallback="No work type specified">
              {application.work_type
                ? workTypeLabels[application.work_type]
                : null}
            </Value>
          </Field>
          <Field>
            <Label>Status</Label>
            <div>
              {application.status ? (
                <Badge variant={statusConfig[application.status].variant}>
                  {statusConfig[application.status].label}
                </Badge>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  No status set
                </p>
              )}
            </div>
          </Field>
          <Field>
            <Label>Applied Date</Label>
            <Value fallback="No date added yet">
              {application.applied_at
                ? format(new Date(application.applied_at), "MMM d, yyyy")
                : null}
            </Value>
          </Field>
        </div>
        <div className="flex flex-col gap-5">
          <Field>
            <Label>Location</Label>
            <Value fallback="No location added yet">
              {application.location}
            </Value>
          </Field>
          <Field>
            <Label>Job URL</Label>
            {application.job_url ? (
              <a
                href={application.job_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline-offset-4 hover:underline"
              >
                {application.job_url}
              </a>
            ) : (
              <p className="text-sm italic text-muted-foreground">
                No URL added yet
              </p>
            )}
          </Field>
          <Field>
            <Label>Salary</Label>
            <Value fallback="No salary added yet">{salary}</Value>
          </Field>
          <Field>
            <Label>Notes</Label>
            <Value fallback="No notes added yet">{application.notes}</Value>
          </Field>
        </div>
      </div>
    </FieldGroup>
  );
}
