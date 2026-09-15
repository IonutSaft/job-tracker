"use client";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BackToTopButton({ className }: { className?: string }) {
  return (
    <Button
      variant="secondary"
      size="icon"
      type="button"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-6 bottom-6 z-40 size-10 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl",
        className
      )}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </Button>
  );
}
