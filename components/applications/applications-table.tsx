"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";

import type { Database } from "@/lib/database.types";
import { statusConfig } from "@/lib/config";
import { workTypeLabels, formatSalary } from "@/lib/format";
import { useApplications } from "@/hooks/use-applications";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreateApplicationDialog } from "@/components/applications/create-application-dialog";
import { EditApplicationDialog } from "@/components/applications/edit-application-dialog";
import { DeleteApplicationDialog } from "@/components/applications/delete-application-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Application = Database["public"]["Tables"]["applications"]["Row"];

type SortableColumn =
  | "company_name"
  | "role_title"
  | "status"
  | "location"
  | "applied_at"
  | "salary_min";

type Column = {
  key: SortableColumn;
  label: string;
  hideMobile?: boolean;
};

const sortableColumns: Column[] = [
  { key: "company_name", label: "Company" },
  { key: "role_title", label: "Role", hideMobile: true },
  { key: "status", label: "Status", hideMobile: true },
  { key: "location", label: "Location", hideMobile: true },
  { key: "applied_at", label: "Applied Date", hideMobile: true },
  { key: "salary_min", label: "Salary Range", hideMobile: true },
];

const colClasses = (key: SortableColumn) =>
  sortableColumns.find((c) => c.key === key)?.hideMobile
    ? "hidden md:table-cell"
    : "";

const statusFilterOptions = [
  { value: "", label: "All Statuses" },
  ...Object.entries(statusConfig).map(([value, config]) => ({
    value,
    label: config.label,
  })),
];

export function ApplicationsTable({
  initialData,
}: {
  initialData: Application[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: applicationsData } = useApplications(initialData);
  const applications = applicationsData ?? [];
  const pathname = usePathname();

  const sortBy =
    (searchParams.get("sortBy") as SortableColumn | null) ?? "applied_at";
  const sortDir =
    (searchParams.get("sortDir") as "asc" | "desc" | null) ?? "desc";
  const statusFilter = searchParams.get("status") ?? "";

  const setSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const handleSort = useCallback(
    (column: SortableColumn) => {
      if (sortBy === column) {
        setSearchParams({ sortDir: sortDir === "asc" ? "desc" : "asc" });
      } else {
        setSearchParams({ sortBy: column, sortDir: "asc" });
      }
    },
    [sortBy, sortDir, setSearchParams],
  );

  return (
    <Card className="flex flex-col rounded-none border border-border bg-card min-h-0">
      <div className="shrink-0 flex items-center justify-between border-b border-border px-3 pt-1 pb-3">
        <Select
          value={statusFilter}
          onValueChange={(value) => setSearchParams({ status: value || null })}
        >
          <SelectTrigger className="w-44 rounded-none border-border bg-card font-heading text-[10px] uppercase tracking-wider text-muted-foreground">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-border bg-popover">
            {statusFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CreateApplicationDialog />
      </div>
      <CardContent className="flex-1 min-h-0 overflow-auto p-0">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-card [&_tr]:border-b-0">
            <TableRow>
              {sortableColumns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "cursor-pointer select-none font-heading text-[10px] uppercase tracking-wider text-muted-foreground h-8 px-2",
                    col.hideMobile && "hidden md:table-cell"
                  )}
                  onClick={() => handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortBy === col.key ? (
                      sortDir === "asc" ? (
                        <ArrowUp className="size-3" />
                      ) : (
                        <ArrowDown className="size-3" />
                      )
                    ) : (
                      <ArrowUpDown className="size-3" />
                    )}
                  </span>
                </TableHead>
              ))}
              <TableHead className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground h-8 px-2">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center font-mono text-sm text-muted-foreground"
                >
                  No applications match your filter.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow
                  key={app.id}
                  className="border-border hover:bg-muted/30"
                >
                  <TableCell className={cn("font-medium", colClasses("company_name"))}>
                    {app.company_name}
                  </TableCell>
                  <TableCell className={colClasses("role_title")}>{app.role_title}</TableCell>
                  <TableCell className={colClasses("status")}>
                    {app.status && (
                      <Badge variant={statusConfig[app.status].variant}>
                        {statusConfig[app.status].label}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className={colClasses("location")}>
                    {app.location}
                    {app.work_type && ` (${workTypeLabels[app.work_type]})`}
                  </TableCell>
                  <TableCell className={colClasses("applied_at")}>
                    {app.applied_at
                      ? format(new Date(app.applied_at), "MMM d, yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell className={colClasses("salary_min")}>
                    {formatSalary(
                      app.salary_min,
                      app.salary_max,
                      app.salary_currency,
                    ) ?? "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link href={`/dashboard/applications/${app.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                        >
                          <ExternalLink />
                        </Button>
                      </Link>
                      <EditApplicationDialog application={app} />
                      <DeleteApplicationDialog application={app} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
