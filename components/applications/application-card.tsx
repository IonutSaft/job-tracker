import { format } from "date-fns";

import { cn } from "@/lib/utils";
import type { Database } from "@/lib/database.types";
import { statusConfig } from "@/lib/config";
import { workTypeLabels, formatSalary } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { ResumeCardView } from "@/components/resumes/resume-card-view";

type Application = Database["public"]["Tables"]["applications"]["Row"];
type Resume = Database["public"]["Tables"]["resumes"]["Row"];

function Value({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: string;
}) {
  if (children == null || children === "") {
    return (
      <p className="font-mono text-sm italic text-muted-foreground">{fallback}</p>
    );
  }
  if (typeof children === "boolean" || typeof children === "number") {
    return <p className="font-sans text-sm">{String(children)}</p>;
  }
  return <p className="font-sans text-sm">{children}</p>;
}

export function ApplicationCard({
  application,
  resume,
}: {
  application: Application;
  resume?: Resume | null;
}) {
  const salary = formatSalary(
    application.salary_min,
    application.salary_max,
    application.salary_currency,
  );

  return (
    <Card className="rounded-none border border-border bg-card">
      <CardContent>
        <FieldGroup>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Company</Label>
            <p className="font-sans text-sm">
              {application.company_name}
            </p>
          </Field>
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Role</Label>
            <p className="font-sans text-sm">
              {application.role_title}
            </p>
          </Field>
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Work Type</Label>
            <Value fallback="No work type specified">
              {application.work_type
                ? workTypeLabels[application.work_type]
                : null}
            </Value>
          </Field>
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Status</Label>
            <div>
              {application.status ? (
                <Badge variant={statusConfig[application.status].variant} className="rounded-none">
                  {statusConfig[application.status].label}
                </Badge>
              ) : (
                <p className="font-mono text-sm italic text-muted-foreground">
                  No status set
                </p>
              )}
            </div>
          </Field>
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Applied Date</Label>
            <Value fallback="No date added yet">
              {application.applied_at
                ? format(new Date(application.applied_at), "MMM d, yyyy")
                : null}
            </Value>
          </Field>
        </div>
        <div className="flex flex-col gap-5">
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Location</Label>
            <Value fallback="No location added yet">
              {application.location}
            </Value>
          </Field>
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Job URL</Label>
            {application.job_url ? (
              <a
                href={application.job_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-primary underline-offset-4 hover:underline"
              >
                {application.job_url}
              </a>
            ) : (
              <p className="font-mono text-sm italic text-muted-foreground">
                No URL added yet
              </p>
            )}
          </Field>
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Salary</Label>
            <Value fallback="No salary added yet">{salary}</Value>
          </Field>
          <Field>
            <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Notes</Label>
            <Value fallback="No notes added yet">{application.notes}</Value>
          </Field>
        </div>
      </div>
      <div className="mt-5">
        <Field>
          <Label className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">Resume</Label>
          {resume ? (
            <ResumeCardView resume={resume} />
          ) : (
            <p className="font-mono text-sm italic text-muted-foreground">
              No resume attached
            </p>
          )}
        </Field>
      </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
