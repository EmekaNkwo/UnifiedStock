// src/components/products/barcode-scanner.tsx
"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface BarcodeScannerProps {
  onScanComplete: (code: string) => void;
}

export function BarcodeScanner({ onScanComplete }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scanBarcode = async () => {
      try {
        const scanner = new Html5Qrcode("barcode-scanner");
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScanComplete(decodedText);
            scannerRef.current?.stop();
          },
          (errorMessage) => {
            // Error handling is done in the console
            console.log(errorMessage);
          }
        );
      } catch (error) {
        console.error("Error starting scanner:", error);
      }
    };

    scanBarcode();

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current
          .stop()
          .catch((error) => console.error("Error stopping scanner:", error));
      }
    };
  }, [onScanComplete]);

  return (
    <div id="barcode-scanner" ref={scannerContainerRef} className="w-full" />
  );
}
