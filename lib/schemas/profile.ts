import z from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(1, "Name is required").max(100),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
