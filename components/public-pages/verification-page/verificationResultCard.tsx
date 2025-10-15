"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type SuccessProps = {
  variant: "success";
  title: string;
  details: { label: string; value: string }[];
  verifiedOn: string;
  photoUrl?: string;
};

type FailureProps = {
  variant: "failure";
  title: string;
  description: string;
  supportContact: string;
};

type VerificationResultCardProps = SuccessProps | FailureProps;

export default function VerificationResultCard(props: VerificationResultCardProps) {
  if (props.variant === "success") {
    return (
      <section className="mx-auto w-full max-w-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
          <span className="text-3xl leading-none">✅</span>
        </div>
        <h1 className="h2-bold text-secondary text-center">{props.title}</h1>
        <div
          className={cn(
            "mt-8 grid gap-6",
            props.photoUrl ? "md:grid-cols-2 md:items-start" : ""
          )}
        >
          {props.photoUrl && (
            <div className="flex justify-center md:justify-end">
              <Image
                src={props.photoUrl}
                alt={`${props.details[0]?.value ?? "Verified professional"} portrait`}
                width={160}
                height={160}
                className="h-40 w-40 rounded-2xl object-cover shadow-lg"
              />
            </div>
          )}
          <dl className="space-y-4 text-center md:text-left">
            {props.details.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="h3-semibold text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-8 small-regular text-muted-foreground text-center">
          Verified on: {props.verifiedOn}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-2xl text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <span className="text-3xl leading-none">❌</span>
      </div>
      <h1 className={cn("h2-bold", "text-destructive")}>{props.title}</h1>
      <p className="mt-6 paragraph-regular text-foreground">{props.description}</p>
      <p className="mt-4 text-sm font-medium text-foreground">
        If you believe this is an error, please contact MoHS technical support for assistance at{" "}
        <span className="underline decoration-dotted">{props.supportContact}</span>.
      </p>
    </section>
  );
}
