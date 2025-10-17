"use server";

import { sbCookiesClient } from "@/lib/supabase-clients/cookiesClient";

type UpdatePasswordResult = {
  success: boolean;
  message: string;
};

export async function updateUserPassword(
  formData: FormData
): Promise<UpdatePasswordResult> {
  const newPassword = String(formData.get("newPassword") ?? "");

  if (newPassword.length === 0) {
    return { success: false, message: "Password is required." };
  }

  try {
    const supabase = await sbCookiesClient();

    // REAL SUPABASE LOGIC (Commented out for testing)
    // const { error } = await supabase.auth.updateUser({ password: newPassword });
    // if (error) {
    //   return { success: false, message: error.message };
    // }

    // MOCK LOGIC (For local UI testing without Supabase)
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    // To test a "weak password" error state, uncomment the next line:
    // return { success: false, message: "Mock error: New password is too weak." };
    return { success: true, message: "Your password has been successfully updated." };
  } catch (error) {
    console.error("updateUserPassword error:", error);
    return {
      success: false,
      message: "Unexpected error updating password.",
    };
  }
}
