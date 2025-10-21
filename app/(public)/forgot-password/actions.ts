"use server";

import { sbCookiesClient } from "@/lib/supabase-clients/cookiesClient";

type RequestPasswordResetResult = {
  success: boolean;
  message: string;
};

export async function requestPasswordReset(
  formData: FormData
): Promise<RequestPasswordResetResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) {
    return { success: false, message: "Email is required." };
  }

  try {
    const supabase = await sbCookiesClient();

    // REAL SUPABASE LOGIC (Commented out for testing)
    // const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //   redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/update-password`,
    // });
    // if (error) {
    //   return { success: false, message: error.message };
    // }

    // MOCK LOGIC (For local UI testing without Supabase)
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    // To test an error state, uncomment the next line:
    // return { success: false, message: "Mock error: Unable to send reset email." };
    return {
      success: true,
      message:
        "If an account with that email exists, we've sent a password reset link.",
    };
  } catch (error) {
    console.error("requestPasswordReset error:", error);
    return {
      success: false,
      message: "Unexpected error requesting password reset.",
    };
  }
}
