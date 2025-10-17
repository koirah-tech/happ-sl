"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateUserPassword } from "./actions";

type PasswordCheck = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

const PASSWORD_CHECKS: PasswordCheck[] = [
  { id: "length", label: "At least 8 characters", test: (value) => value.length >= 8 },
  { id: "uppercase", label: "At least 1 uppercase letter", test: (value) => /[A-Z]/.test(value) },
  { id: "number", label: "At least 1 number", test: (value) => /\d/.test(value) },
];

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const passwordChecks = useMemo(
    () =>
      PASSWORD_CHECKS.map((check) => ({
        id: check.id,
        label: check.label,
        passed: check.test(newPassword),
      })),
    [newPassword]
  );

  const passwordsMatch =
    confirmPassword.length === 0 ? null : newPassword === confirmPassword;

  const isFormValid =
    passwordChecks.every((item) => item.passed) &&
    passwordsMatch === true &&
    !isPending;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError("Please meet the password requirements before submitting.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("newPassword", newPassword);
      const result = await updateUserPassword(formData);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card/95 p-10 shadow-md shadow-primary/5">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-semibold text-secondary">Create a New Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter a new password that meets the requirements below to secure your account.
          </p>
        </div>

        {isSuccess ? (
          <div className="mt-8 space-y-4 rounded-2xl bg-secondary/10 p-6 text-secondary">
            <h2 className="text-xl font-semibold">Success! Your password has been reset.</h2>
            <p className="text-sm">
              You can now sign in with your new password. Keep it confidential and avoid reusing
              passwords from other systems.
            </p>
            <Button asChild className="w-full">
              <Link href="/signin">Return to Sign In</Link>
            </Button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Enter a strong password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                aria-invalid={passwordsMatch === false}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                aria-invalid={passwordsMatch === false}
              />
              {passwordsMatch === false && (
                <p className="text-sm text-destructive">Passwords do not match.</p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm">
              <p className="font-semibold text-foreground">Password requirements</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                {passwordChecks.map((item) => (
                  <li
                    key={item.id}
                    className={item.passed ? "text-secondary" : "text-muted-foreground"}
                  >
                    {item.passed ? "✔" : "○"} {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid}
              aria-busy={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
