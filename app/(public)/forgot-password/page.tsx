"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "./actions";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email.trim());
      const result = await requestPasswordReset(formData);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card/95 p-10 shadow-md shadow-primary/5">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-semibold text-secondary">Reset Your Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter the email associated with your account, and we&apos;ll send you instructions
            to reset your password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="mt-8 space-y-3 rounded-2xl bg-secondary/10 p-6 text-secondary">
            <h2 className="text-xl font-semibold">Request sent</h2>
            <p className="text-sm text-secondary">
              If an account with that email exists, please check your inbox for reset instructions.
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                aria-invalid={!!error}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || email.trim().length === 0}
              aria-busy={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </span>
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
