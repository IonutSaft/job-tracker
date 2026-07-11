import type { Database } from "@/lib/database.types"

type ApplicationStatus = Database["public"]["Enums"]["application_status"]
type RoundType = Database["public"]["Enums"]["round_type"]
type RoundOutcome = Database["public"]["Enums"]["round_outcome"]

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

export const roundTypeConfig: Record<RoundType, { label: string }> = {
  phone_screen: { label: "Phone Screen" },
  technical: { label: "Technical" },
  behavioral: { label: "Behavioral" },
  take_home: { label: "Take Home" },
  final: { label: "Final" },
  other: { label: "Other" },
}

export const roundOutcomeConfig: Record<
  RoundOutcome,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" }
> = {
  pending: { label: "Pending", variant: "secondary" },
  passed: { label: "Passed", variant: "default" },
  failed: { label: "Failed", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "outline" },
}
