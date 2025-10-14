"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiCameraFill, RiQrScan2Fill } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QRCodeScannerModal from "@/components/public-pages/verification-page/qrCodeScannerModal";
import { mockVerifyCredential } from "@/lib/mock/verification";

const CAMERA_ERROR_MESSAGES: Record<string, string> = {
  "no-camera":
    "No camera detected. Please use the manual entry method.",
  "permission-denied":
    "Camera access is required for this feature. Please use the manual entry method or allow camera access in your browser settings.",
};

export default function VerificationHub() {
  const router = useRouter();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [credentialId, setCredentialId] = useState("");
  const [manualError, setManualError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleActivateCamera = () => {
    setCameraError(null);
    setIsScannerOpen(true);
  };

  const handleScanSuccess = (scannedId: string) => {
    setIsScannerOpen(false);
    router.push(`/verify/result/${encodeURIComponent(scannedId)}`);
  };

  const handleScannerError = (errorType: "no-camera" | "permission-denied") => {
    setIsScannerOpen(false);
    setCameraError(CAMERA_ERROR_MESSAGES[errorType]);
  };

  const handleManualSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setManualError(null);
    setIsSubmitting(true);

    try {
      await mockVerifyCredential(credentialId.trim());
      router.push(`/verify/result/${encodeURIComponent(credentialId.trim())}`);
    } catch (error) {
      if (error instanceof Error && error.name === "NotFoundError") {
        router.push("/verify/result/invalid");
      } else {
        setManualError(
          "Verification failed. Please check your internet connection and try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="mx-auto grid max-w-5xl gap-10 md:p-12">
        <header className="space-y-3 text-center md:space-y-4">
          <h1 className="h2-bold text-secondary dark:text-stone-100 md:text-4xl">
            Credential Verification Page
          </h1>
          <p className="mx-auto max-w-3xl paragraph-regular ">
            This system allows you to instantly verify the authenticity of a health professional&apos;s
            credentials issued by the Ministry of Health &amp; Sanitation. Please choose one of the
            verification methods below to proceed.
          </p>
          <p className="body-bold text-muted-foreground/90">
            For security and auditing purposes, all verification attempts are logged with a timestamp
            and IP address.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <article className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border/80 bg-muted/30 p-6 shadow-sm">
            <div className="space-y-3">
              <h2 className="h3-semibold text-secondary dark:text-stone-100">
                Scan with Device Camera
              </h2>
              <p className="text-sm text-muted-foreground">
                Activate your device camera to scan the QR code printed on the official credential.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                type="button"
                size="lg"
                className="w-full gap-2 font-semibold"
                onClick={handleActivateCamera}
              >
                <RiCameraFill className="h-5 w-5" />
                Activate Camera &amp; Scan QR Code
              </Button>
              {cameraError && (
                <p className="text-sm text-destructive" role="alert">
                  {cameraError}
                </p>
              )}
            </div>
          </article>

          <article className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border/80 bg-muted/30 p-6 shadow-sm">
            <div className="space-y-3">
              <h2 className="h3-semibold text-secondary dark:text-stone-100">
                Or Enter Manually
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter the unique alphanumeric ID found on the credential document.
              </p>
            </div>
            <form className="space-y-3" onSubmit={handleManualSubmit}>
              <div className="space-y-2">
                <Label htmlFor="credentialId">Credential ID</Label>
                <Input
                  id="credentialId"
                  placeholder="e.g. MOHS-DOC-98765"
                  value={credentialId}
                  onChange={(event) => setCredentialId(event.target.value)}
                  required
                />
              </div>
              {manualError && (
                <p className="text-sm text-destructive" role="alert">
                  {manualError}
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 font-semibold"
                disabled={!credentialId.trim() || isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  <>
                    <RiQrScan2Fill className="h-5 w-5" />
                    Verify Credential
                  </>
                )}
              </Button>
            </form>
          </article>
        </div>
      </section>

      <QRCodeScannerModal
        open={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleScanSuccess}
        onError={handleScannerError}
      />
    </>
  );
}
