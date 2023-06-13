import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z
    .string({
      required_error: "email required..",
    })
    .min(1, "email is required")
    .email("email is invalid"),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(1, "password is required")
    .min(8, "password mjust be at least 8 char"),
});

export const RegisterUserSchema = z.object({
  name: z
    .string({
      required_error: "name required..",
    })
    .min(1, "name is required"),
  email: z
    .string({
      required_error: "email required..",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(1, "password is required")
    .min(8, "password must be at least 8 char"),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
