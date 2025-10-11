import { z } from "zod";


/**
 * Schema for validating the login form payload.
 *
 * Ensures:
 * - `email` is a non-empty, valid email address, max 100 chars.
 * - `password` is at least 8 chars and max 100 chars.
 */
export const LoginFormSchema = z.object({
  email: z
      .email({ message: "Please enter a valid email address." })
      .min(1, { message: "Email is required" })
      .trim()
      .toLowerCase(),
  password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .trim()
});

export const RegisterFormSchema = z.object({
  email: z
      .email({ message: "Please enter a valid email address." })
      .min(1, { message: "Email is required." })
      .trim()
      .toLowerCase(),
  fullName: z.string().min(1, { message: "Full name is required." }).trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }).trim(),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }).trim(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type RegisterFormData = z.infer<typeof RegisterFormSchema>

export type LoginState = {
    errors?: {
        email?: string[]
        password?: string[]
        _form?: string[]
    }
    message?: string
    success?: boolean
    redirectTo?: string
}

export type RegisterState = {
    errors?: {
        email?: string[]
        fullName?: string[]
        password?: string[]
        confirmPassword?: string[]
        _form?: string[]
    }
    message?: string
    success?: boolean
    redirectTo?: string
}

export interface CookieEntry {
    name: string
    value: string
    options?: Record<string, unknown>
}