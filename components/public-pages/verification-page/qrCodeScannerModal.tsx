"use client";

import { useEffect, useRef, useState } from "react";
import { RiCloseLargeLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  onScan: (credentialId: string) => void;
  onError: (error: "no-camera" | "permission-denied") => void;
};

export default function QRCodeScannerModal({
  open,
  onClose,
  onScan,
  onError,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<
    "idle" | "requesting" | "streaming" | "scanning"
  >("idle");

  useEffect(() => {
    let active = true;
    let stream: MediaStream | null = null;

    async function initialiseCamera() {
      if (!open) return;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        onError("no-camera");
        onClose();
        return;
      }

      try {
        setStatus("requesting");
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (!active) return;
        setStatus("streaming");

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setStatus("scanning");

        // Simulate scan success after a short delay.
        const timer = setTimeout(() => {
          if (!active) return;
          onScan("MOHS-DOC-98765");
        }, 2200);

        return () => clearTimeout(timer);
      } catch (error) {
        if (error instanceof DOMException) {
          if (error.name === "NotFoundError" || error.name === "OverconstrainedError") {
            onError("no-camera");
          } else if (error.name === "NotAllowedError" || error.name === "SecurityError") {
            onError("permission-denied");
          } else {
            onError("permission-denied");
          }
        } else {
          onError("permission-denied");
        }
        onClose();
      }
    }

    initialiseCamera();

    return () => {
      active = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStatus("idle");
    };
  }, [open, onClose, onError, onScan]);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
        <header className="flex items-center justify-between border-b border-border/70 px-6 py-4">
          <h2 className="text-lg font-semibold text-secondary">Scan QR Code</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close scanner"
          >
            <RiCloseLargeLine className="h-5 w-5" />
          </Button>
        </header>

        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-40 rounded-3xl border-4 border-secondary/90 shadow-[0_0_40px_rgba(117,139,97,0.35)] md:h-56 md:w-56" />
          </div>
          {status === "requesting" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
              <span className="flex items-center gap-2 text-sm font-medium">
                <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Initialising camera...
              </span>
            </div>
          )}
        </div>

        <footer className="space-y-1 border-t border-border/70 px-6 py-4 text-sm text-muted-foreground">
          <p>Align the credential QR code inside the square to scan automatically.</p>
          <p>If the scan does not start, ensure your browser has camera access.</p>
        </footer>
      </div>
    </div>
  );
}
