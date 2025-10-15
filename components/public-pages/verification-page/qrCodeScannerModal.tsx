"use client";

import { useEffect, useRef, useState } from "react";
import { RiCloseLargeLine } from "@remixicon/react";
import {Html5QrcodeScanner, Html5QrcodeScannerState} from "html5-qrcode";
import { Html5QrcodeError } from "html5-qrcode/esm/core";

import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  onScan: (credentialId: string) => void;
  onError: (error: "no-camera" | "permission-denied") => void;
};

// A unique ID for the scanner element
const QR_CODE_SCANNER_ELEMENT_ID = "qr-code-reader";

export default function QRCodeScannerModal({
  open,
  onClose,
  onScan,
  onError,
}: Props) {
  
  const [status, setStatus] = useState<"idle" | "scanning">("idle");

  useEffect(() => {
    if (!open) return;

    setStatus("scanning")

    const html5QrcodeScanner = new Html5QrcodeScanner(
      QR_CODE_SCANNER_ELEMENT_ID,
      {
        fps: 10,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
          // Make the scanning box responsive and square
          const qrboxSize = Math.floor(minEdge * 0.9);
          return {
            width: qrboxSize,
            height: qrboxSize,
          };
        },
        // Important for mobile devices to prefer the rear camera
        // facingMode: "environment",
      },
      /* verbose= */ false
    );

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      // Stop the scanner and call the parent onScan callback
      html5QrcodeScanner.clear();
      onScan(decodedText);
    };

    const onScanFailure = (errorMessage: string) => {
      // This is called frequently, so we can ignore most errors.
      // You can add more specific error handling here if needed.
      // For example, you could check for permission errors.
    };

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    // Cleanup function to stop the scanner when the component unmounts or modal closes
    return () => {
      // The library can sometimes throw an error if it's already been cleared.
      if (html5QrcodeScanner.getState()) {
        html5QrcodeScanner.clear().catch((error) => {
          console.error("Failed to clear html5QrcodeScanner.", error);
        });
      }
      setStatus("idle");
    };
  }, [open, onScan, onError]);

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
      <div className="relative w-full h-[70%] max-w-lg overflow-hidden rounded-3xl border border-border bg-background shadow-2xl">
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

        {/* The library will mount the scanner inside this div */}
        <div className="relative aspect-video bg-gray-200 text-gray-600 font-bold">
          <div id={QR_CODE_SCANNER_ELEMENT_ID} className="h-full w-full" />
        </div>

        <footer className="space-y-1 border-t border-border/70 px-6 py-4 text-sm text-muted-foreground">
          <p>Align the credential QR code inside the box to scan it.</p>
          <p>If scanning doesn't start, ensure you have granted camera permissions.</p>
        </footer>
      </div>
    </div>
  );
}
