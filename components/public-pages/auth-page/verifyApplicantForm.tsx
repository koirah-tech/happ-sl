"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const UNIVERSITIES = [
  "College of Medicine and Allied Health Sciences (COMAHS)",
  "Njala University - School of Community Health Sciences",
  "University of Sierra Leone - Faculty of Nursing",
  "University of Makeni - School of Health Sciences",
] as const;

function buildGraduationYears(): number[] {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear + 1;
  return Array.from({ length: 8 }, (_, idx) => startYear - idx);
}

const selectClasses = cn(
  "h-9 lg:h-10 w-full rounded-md border border-input bg-background px-3",
  "text-sm lg:text-base shadow-lg focus-visible:outline-none focus-visible:ring focus-visible:ring-ring/50",
  "aria-invalid:border-destructive aria-invalid:ring-destructive/40 transition-colors"
);

type FormValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  studentId: string;
  graduationYear: string;
  institution: string;
};

const INITIAL_VALUES: FormValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  studentId: "",
  graduationYear: "",
  institution: "",
};

export default function VerifyApplicantForm() {
  const graduationYears = useMemo(buildGraduationYears, []);
  const [formValues, setFormValues] = useState<FormValues>(INITIAL_VALUES);
  const [hasVerificationError, setHasVerificationError] = useState(false);
  const [isManualReviewOpen, setIsManualReviewOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (hasVerificationError) {
      setHasVerificationError(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsManualReviewOpen(false);
    setIsVerifying(true);
    setHasVerificationError(false);

    // TODO: Replace with Supabase verification logic when backend is ready.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setHasVerificationError(true);
    setIsVerifying(false);
  };

  const handleManualReviewOpen = () => setIsManualReviewOpen(true);
  const handleManualReviewClose = () => setIsManualReviewOpen(false);

  return (
    <>
      <section className="relative mx-auto w-full max-w-xl rounded-2xl border border-border bg-card/95 shadow-xl shadow-primary/10 backdrop-blur">
        <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" orientation="vertical" />
            </div>
            <h1 className="h2-bold text-secondary dark:text-stone-100">
              Verify Your Graduate Status
            </h1>
            <p className="paragraph-regular mt-2 text-muted-foreground">
              Please confirm your details as they appear on your official university records to begin your application.
            </p>
          </div>

          <form className="grid gap-5" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                required
                autoComplete="given-name"
                placeholder="Aminata"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="middleName">
                <span>Middle Name</span>
                <span className="ml-2 text-xs font-medium text-muted-foreground">Optional</span>
              </Label>
              <Input
                id="middleName"
                name="middleName"
                autoComplete="additional-name"
                placeholder="Leave blank if not applicable"
                value={formValues.middleName}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                required
                autoComplete="family-name"
                placeholder="Kamara"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="studentId">Student ID Number</Label>
              <Input
                id="studentId"
                name="studentId"
                required
                autoComplete="off"
                placeholder="e.g. COMAHS-2024-1032"
                value={formValues.studentId}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="graduationYear">Class of:</Label>
              <select
                id="graduationYear"
                name="graduationYear"
                required
                value={formValues.graduationYear}
                onChange={handleInputChange}
                className={selectClasses}
                aria-busy={isVerifying}
              >
                <option value="" disabled>
                  Select your graduation year
                </option>
                {graduationYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="institution">University/Institution</Label>
              <select
                id="institution"
                name="institution"
                required
                value={formValues.institution}
                onChange={handleInputChange}
                className={selectClasses}
              >
                <option value="" disabled>
                  Select your institution
                </option>
                {UNIVERSITIES.map((institution) => (
                  <option key={institution} value={institution}>
                    {institution}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-3">
              <Button
                type="submit"
                size="lg"
                className="mt-2 font-semibold"
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  "Verify & Proceed"
                )}
              </Button>

              {hasVerificationError && (
                <div
                  className="rounded-md border border-amber-400 bg-amber-50 p-4 text-amber-900"
                  role="alert"
                  aria-live="polite"
                >
                  <p className="font-semibold">We couldn&apos;t find your record.</p>
                  <p className="mt-1 text-sm">
                    This may be due to a typo in the information you provided or a delay in receiving the official graduation list from your university. Please double-check your details and try again.
                  </p>
                </div>
              )}
            </div>
          </form>

          {hasVerificationError && (
            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                className="w-full font-medium"
                onClick={handleManualReviewOpen}
              >
                Submit a Manual Review Request
              </Button>
            </div>
          )}
        </div>
      </section>

      {isManualReviewOpen && (
        <ManualReviewModal values={formValues} onClose={handleManualReviewClose} />
      )}
    </>
  );
}

type ManualReviewModalProps = {
  values: FormValues;
  onClose: () => void;
};

function ManualReviewModal({ values, onClose }: ManualReviewModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (status === "submitted") {
      const timer = setTimeout(() => {
        onClose();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  const handleConfirm = async () => {
    setStatus("submitting");
    // TODO: Persist manual review request to Supabase.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("submitted");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div
          aria-hidden={status !== "idle"}
          className={status !== "idle" ? "pointer-events-none opacity-20" : ""}
        >
          <div className="mb-4">
            <h2 className="h3-bold text-secondary dark:text-stone-100">
              Manual Eligibility Review
            </h2>
            <p className="paragraph-regular mt-2 text-muted-foreground">
              Please confirm the details below are correct. This request will be sent directly to your university&apos;s administration for verification. You will be notified via email once the review is complete (this may take several business days).
            </p>
          </div>

          <dl className="grid gap-3 rounded-lg border border-border/60 bg-muted/30 p-4 text-sm">
            <Field name="First Name" value={values.firstName} />
            <Field name="Middle Name" value={values.middleName || "N/A"} />
            <Field name="Last Name" value={values.lastName} />
            <Field name="Student ID Number" value={values.studentId} />
            <Field name="Graduation Year" value={values.graduationYear || "N/A"} />
            <Field name="University / Institution" value={values.institution || "N/A"} />
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={onClose} disabled={status !== "idle"}>
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirm} disabled={status !== "idle"}>
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </span>
              ) : (
                "Confirm and Submit Request"
              )}
            </Button>
          </div>
        </div>

        {status !== "idle" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/95 text-center">
            {status === "submitting" ? (
              <>
                <span className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-secondary border-t-transparent" />
                <p className="font-semibold text-secondary">Submitting review request...</p>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-12 w-12 text-secondary" />
                <p className="font-semibold text-secondary">Manual review request submitted</p>
                <p className="text-sm text-muted-foreground">
                  Your university will notify you once the verification is complete.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ name, value }: { name: string; value: string }) {
  return (
    <div className="grid gap-1">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {name}
      </dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
