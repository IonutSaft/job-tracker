"use client";

import { format } from "date-fns";
import { FileText } from "lucide-react";
import { toast } from "sonner";

import { getResumeSignedUrl } from "@/lib/actions/resumes";
import type { Database } from "@/lib/database.types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Resume = Database["public"]["Tables"]["resumes"]["Row"];

export function ResumeCardView({ resume }: { resume: Resume }) {
  const handleView = async () => {
    if (!resume.file_path) return;
    const result = await getResumeSignedUrl(resume.file_path);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    window.open(result.url, "_blank");
  };

  return (
    <Card size="sm" className="rounded-none border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="size-4 shrink-0 text-muted-foreground" />
          <CardTitle className="truncate">{resume.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="font-heading text-[10px] uppercase tracking-wider text-muted-foreground">
            {format(new Date(resume.created_at), "MMM d, yyyy")}
            {resume.file_size && (
              <> &middot; {(resume.file_size / 1024).toFixed(0)} KB</>
            )}
          </span>
          <Button
            variant="ghost"
            size="xs"
            disabled={!resume.file_path}
            onClick={handleView}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
