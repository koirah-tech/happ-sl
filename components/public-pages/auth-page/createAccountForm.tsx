"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";

import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  mockCreateAccount,
  type MockEligibleGraduate,
} from "@/lib/mock/registration";

const VERIFIED_APPLICANT_STORAGE_KEY = "happ-sl::verified-applicant";

const emailRegex =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const passwordChecks = [
  {
    id: "length",
    label: "Minimum 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    id: "uppercase",
    label: "At least 1 uppercase letter",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: "number",
    label: "At least 1 number",
    test: (value: string) => /\d/.test(value),
  },
];

export default function CreateAccountForm() {
  const router = useRouter();
  const [applicant, setApplicant] = useState<MockEligibleGraduate | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionStorage.getItem(VERIFIED_APPLICANT_STORAGE_KEY);

    if (!stored) {
      router.replace("/register");
      return;
    }

    try {
      const parsed: MockEligibleGraduate = JSON.parse(stored);
      setApplicant(parsed);
      setEmail(parsed.email);
    } catch {
      sessionStorage.removeItem(VERIFIED_APPLICANT_STORAGE_KEY);
      router.replace("/register");
    }
  }, [router]);

  const passwordStatus = useMemo(
    () =>
      passwordChecks.map((check) => ({
        id: check.id,
        label: check.label,
        passed: check.test(password),
      })),
    [password]
  );

  const isEmailValid = email.length === 0 ? false : emailRegex.test(email);
  const isPasswordValid = passwordStatus.every((item) => item.passed);
  const doesPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const canSubmit =
    !!applicant &&
    isEmailValid &&
    isPasswordValid &&
    doesPasswordMatch &&
    !isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || !applicant) return;

    setIsSubmitting(true);
    setIsSubmitted(false);
    await mockCreateAccount({ email, password });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-card/95 shadow-xl shadow-primary/10 backdrop-blur">
      <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
        <div className="text-center">
          <h1 className="h2-bold text-secondary dark:text-stone-100">
            Create Your Secure Account
          </h1>
          <p className="paragraph-regular mt-2 text-muted-foreground">
            {applicant
              ? `Welcome, ${applicant.firstName}! Your graduate status has been verified. Let's set up your access to the portal.`
              : "Verifying your status..."}
          </p>
        </div>

        <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={email.length > 0 && !isEmailValid}
            />
            {email.length > 0 && !isEmailValid && (
              <p className="text-sm text-destructive">
                Enter a valid email address.
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Create Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="Enter a strong password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={password.length > 0 && !isPasswordValid}
            />
            <ul className="mt-2 grid gap-1 text-sm">
              {passwordStatus.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center gap-2 dark:text-lime-600 ${
                    item.passed ? "text-secondary" : "text-muted-foreground"
                  }`}
                >
                  {item.passed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              aria-invalid={confirmPassword.length > 0 && !doesPasswordMatch}
            />
            {confirmPassword.length > 0 && !doesPasswordMatch && (
              <p className="text-sm text-destructive">
                Passwords do not match.
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 font-semibold"
            disabled={!canSubmit}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Creating account...
              </span>
            ) : (
              "Create Account & Start Application"
            )}
          </Button>
        </form>

        {isSubmitted && (
          <div
            className="rounded-md border border-secondary/50 bg-secondary/10 p-4 text-secondary"
            role="status"
            aria-live="polite"
          >
            <p className="font-semibold">Account created successfully!</p>
            <p className="text-sm">
              You can now proceed to the next step of your application.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
