"use server";

import { LoginFormSchema} from "@/components/public-pages/auth-page/authSchema";
import {type LoginState} from "@/components/public-pages/auth-page/authSchema";
import {sbCookiesClient} from "@/lib/supabase-clients/cookiesClient";
import {redirect} from "next/navigation";



// @ts-ignore
export const loginAction = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {

    let redirectTo: string | null = null;

    // Extract form data
    const email =  String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")



    try {
        const supabase = await sbCookiesClient()

            // Validate password login data
        const validatedFields = LoginFormSchema
                .safeParse({email, password})

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Invalid form data",
                success: false,
              }
        }

            // Attempt password login
        const {data, error} = await supabase.auth.signInWithPassword({
            email: validatedFields.data.email,
            password: validatedFields.data.password,
        })

        if (error) {
                // Handle specific auth errors
            if (error.message.includes("Invalid login credentials")) {
                return {errors: {_form: ["Invalid email or password"]}}
            }

            if (error.message.includes("Email not confirmed")) {
                return {
                    errors: {_form: ["Please verify your email address before signing in."],},
                    message: "Email verification required.",
                    success: false,
                }
            }

            return {
                errors: {_form: [error.message]},
                message: "Login failed.",
                success: false,
            }
        }

        if (!data.user) {
            return {
                errors: {_form: ["Login failed. Please try again."]},
                message: "Login failed.",
                success: false,
            }
        }

        redirectTo = `/applicant-portal`;

      
    } catch (error) {
        console.error("Login action error:", error)
        return {
            errors: {_form: ["An unexpected error occurred. Please try again."]},
            message: "Login failed.",
            success: false,
        }
    }

    // Success - redirect will happen after this return
    if (redirectTo) redirect(redirectTo)
}
