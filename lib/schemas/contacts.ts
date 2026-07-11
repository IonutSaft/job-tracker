import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().nullable().optional(),
  email: z.string().email("Invalid email").or(z.literal("")).nullable().optional(),
  linkedin_url: z
    .string()
    .url("Invalid URL")
    .or(z.literal(""))
    .nullable()
    .optional(),
  notes: z.string().nullable().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
