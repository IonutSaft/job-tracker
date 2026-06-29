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
  job_url: z.string().url("Invalid URL").or(z.literal("")).optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  salary_currency: z.string().optional(),
  salary_min: z.number().positive().optional(),
  salary_max: z.number().positive().optional(),
  applied_at: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
