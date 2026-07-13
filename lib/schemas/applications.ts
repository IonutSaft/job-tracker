import z from "zod";

export const applicationSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  role_title: z.string().min(1, "Role title is required"),
  status: z.enum([
    "bookmarked",
    "applied",
    "interviewing",
    "offer",
    "rejected",
    "withdrawn",
  ]),
  work_type: z.enum(["remote", "hybrid", "onsite"], { error: "Work type is required" }),
  job_url: z.string().url("Invalid URL").or(z.literal("")).nullable().optional(),
  location: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  salary_currency: z.string().nullable().optional(),
  salary_min: z.number().positive().nullable().optional(),
  salary_max: z.number().positive().nullable().optional(),
  applied_at: z.string().nullable().optional(),
  resume_id: z.string().nullable().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
