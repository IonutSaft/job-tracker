"use client";

import { Component, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function") {
          return (this.props.fallback as (error: Error) => ReactNode)(this.state.error!);
        }
        return this.props.fallback;
      }

      return (
        <ErrorBoundaryFallback error={this.state.error!} onRetry={this.handleRetry} />
      );
    }

    return this.props.children;
  }
}

function ErrorBoundaryFallback({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <Card className="rounded-none border-red-900/50 bg-card">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-8">
        <AlertTriangle className="size-8 text-red-500" />
        <p className="font-heading text-xs uppercase tracking-wider text-muted-foreground">
          {"// failed to load section"}
        </p>
        {error && (
          <p className="max-w-md text-center font-mono text-[11px] text-muted-foreground/60">
            {error.message}
          </p>
        )}
        <Button
          variant="outline"
          size="sm"
          className="rounded-none"
          onClick={onRetry}
        >
          Retry
        </Button>
      </CardContent>
    </Card>
  );
}
