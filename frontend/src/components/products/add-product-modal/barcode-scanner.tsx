// src/components/barcode/BarcodeScanner.tsx
"use client";

import { QrReader } from "react-qr-reader";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-black rounded-lg overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/30 text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (result) {
              onScan(result.getText());
            }
          }}
          videoContainerStyle={{ width: "100%" }}
          videoStyle={{ width: "100%" }}
          scanDelay={300}
        />
      </div>
      <p className="mt-4 text-white text-center">
        Point your camera at a barcode to scan
      </p>
    </div>
  );
}
