"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BackButton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        render={<Link href="/" aria-label="Back to home page" />}
        nativeButton={false}
        className="rounded-none border-border font-mono text-xs tracking-wider uppercase"
      >
        <ArrowLeft aria-hidden="true" />
        Back
      </Button>
    </div>
  );
}
