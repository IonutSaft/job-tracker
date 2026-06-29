"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
} from "lucide-react";

import type { Database } from "@/lib/database.types";
import { statusConfig } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { EditApplicationDialog } from "@/components/applications/edit-application-dialog";
import { ViewApplicationDialog } from "@/components/applications/view-application-dialog";
import { Button } from "@/components/ui/button";
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

const workTypeLabels: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

type SortableColumn =
  | "company_name"
  | "role_title"
  | "status"
  | "location"
  | "applied_at"
  | "salary_min";

const sortableColumns: { key: SortableColumn; label: string }[] = [
  { key: "company_name", label: "Company" },
  { key: "role_title", label: "Role" },
  { key: "status", label: "Status" },
  { key: "location", label: "Location" },
  { key: "applied_at", label: "Applied Date" },
  { key: "salary_min", label: "Salary Range" },
];

const statusFilterOptions = [
  { value: "", label: "All Statuses" },
  ...Object.entries(statusConfig).map(([value, config]) => ({
    value,
    label: config.label,
  })),
];

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
  return "-";
}

export function ApplicationsTable({
  applications,
}: {
  applications: Application[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
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
    <div>
      <div className="mb-4">
        <Select
          value={statusFilter}
          onValueChange={(value) => setSearchParams({ status: value || null })}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            {statusFilterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {sortableColumns.map((col) => (
              <TableHead
                key={col.key}
                className="cursor-pointer select-none"
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No applications match your filter.
              </TableCell>
            </TableRow>
          ) : (
            applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">
                  {app.company_name}
                </TableCell>
                <TableCell>{app.role_title}</TableCell>
                <TableCell>
                  {app.status && (
                    <Badge variant={statusConfig[app.status].variant}>
                      {statusConfig[app.status].label}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {app.location}
                  {app.work_type && ` (${workTypeLabels[app.work_type]})`}
                </TableCell>
                <TableCell>
                  {app.applied_at
                    ? format(new Date(app.applied_at), "MMM d, yyyy")
                    : "-"}
                </TableCell>
                <TableCell>
                  {formatSalary(
                    app.salary_min,
                    app.salary_max,
                    app.salary_currency,
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ViewApplicationDialog application={app} />
                    <EditApplicationDialog application={app} />
                    <Button variant="ghost" size="icon" disabled>
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
