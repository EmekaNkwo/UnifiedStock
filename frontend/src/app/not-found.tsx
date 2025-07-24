/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center p-8 rounded-2xl bg-card border border-border shadow-lg animate-fade-in">
        <div className="text-8xl font-bold text-primary mb-4 animate-pulse">
          404
        </div>

        <h1 className="text-3xl font-bold tracking-tight">Page Not Found</h1>

        <p className="text-muted-foreground">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="pt-6">
          <Button
            onClick={() => router.back()}
            variant="default"
            size="lg"
            className="px-8 hover:scale-105 transition-transform"
          >
            Go Back
          </Button>
        </div>

        <div className="pt-8 text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link href="#" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
