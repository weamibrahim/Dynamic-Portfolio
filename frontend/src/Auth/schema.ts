import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be 6+ characters"),
  name: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be 2+ characters"),
    email: z.string().email("Valid email required"),
    password: z.string().min(6, "Password must be 6+ characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
