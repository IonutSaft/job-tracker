import z from "zod";

export const interviewRoundSchema = z.object({
  round_type: z.enum([
    "phone_screen",
    "technical",
    "behavioral",
    "take_home",
    "final",
    "other",
  ]),
  title: z.string().min(1, "Title is required"),
  scheduled_at: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type InterviewRoundFormData = z.infer<typeof interviewRoundSchema>;
