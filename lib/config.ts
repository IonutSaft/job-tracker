import type { Database } from "@/lib/database.types"

type ApplicationStatus = Database["public"]["Enums"]["application_status"]

export const statusConfig: Record<
  ApplicationStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" }
> = {
  bookmarked: { label: "Bookmarked", variant: "secondary" },
  applied: { label: "Applied", variant: "default" },
  interviewing: { label: "Interviewing", variant: "outline" },
  offer: { label: "Offer", variant: "link" },
  rejected: { label: "Rejected", variant: "destructive" },
  withdrawn: { label: "Withdrawn", variant: "ghost" },
}
