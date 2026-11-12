import { z } from "zod";

export const subjectOptions = ["Research collaboration", "Speaking or conference invitation", "Journal or reviewing request", "PhD or student enquiry", "Media enquiry", "Something else"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  // Stored in the existing "budget" column of the messages table.
  affiliation: z.string().trim().max(40, "Please keep the affiliation under 40 characters.").optional().or(z.literal("")),
  // Stored in the existing "service" column of the messages table.
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(4000),
  consent: z.literal("on", { message: "Please confirm that you agree to the privacy notice." }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactInput, string>>;
};
