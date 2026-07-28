"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-4 p-6">
      <div className="flex flex-col items-center gap-2">
        <AlertTriangle className="size-10 text-red-500" />
        <h2 className="font-heading text-lg uppercase tracking-[0.15em] text-destructive">
          Something went wrong
        </h2>
        <p className="max-w-md text-center text-sm text-muted-foreground">
          An unexpected error occurred while loading this page. Please try again.
        </p>
        {error.digest && (
          <p className="font-mono text-[11px] text-muted-foreground/40">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <Button variant="outline" className="rounded-none" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
