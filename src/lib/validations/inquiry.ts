import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(80),
  email: z.string().email("Enter a valid email address").max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  designation: z.string().max(120).optional().or(z.literal("")),
  service: z.string().min(1, "Select a service"),
  industry: z.string().min(1, "Select an industry"),
  message: z.string().min(20, "Please describe your project (min 20 characters)").max(4000),
  timeline: z.enum(["urgent", "one_month", "three_months", "six_months", "exploring"]),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
