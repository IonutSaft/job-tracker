"use client";

import { useRef, useState } from "react";
import { format } from "date-fns";
import { FileText, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import { useResumes, useUploadResume, useDeleteResume } from "@/hooks/use-resumes";
import { getResumeSignedUrl } from "@/lib/actions/resumes";
import type { Database } from "@/lib/database.types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

type Resume = Database["public"]["Tables"]["resumes"]["Row"];

function ResumeCard({
  resume,
}: {
  resume: Resume;
}) {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteResume();

  const handleDelete = async () => {
    const result = await deleteMutation.mutateAsync(resume.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Resume deleted");
      setOpen(false);
    }
  };

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
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="size-4 shrink-0 text-muted-foreground" />
          <CardTitle className="truncate">{resume.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {format(new Date(resume.created_at), "MMM d, yyyy")}
            {resume.file_size && (
              <> &middot; {(resume.file_size / 1024).toFixed(0)} KB</>
            )}
          </span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="xs"
              disabled={!resume.file_path}
              onClick={handleView}
            >
              View
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                render={
                  <Button variant="ghost" size="icon-xs">
                    <Trash2 />
                  </Button>
                }
              />
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete Resume</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete &ldquo;{resume.name}&rdquo;? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose
                    render={
                      <Button
                        variant="outline"
                        type="button"
                        disabled={deleteMutation.isPending}
                      >
                        Cancel
                      </Button>
                    }
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    disabled={deleteMutation.isPending}
                    onClick={handleDelete}
                  >
                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ResumeLibrary({
  resumes: initialResumes,
}: {
  resumes: Resume[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: resumes, isLoading } = useResumes(initialResumes);
  const uploadMutation = useUploadResume();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadMutation.mutateAsync(formData);
    if (result.error) {
      toast.error(result.error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Resume Library</h2>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadMutation.isPending}
        >
          <Upload />
          {uploadMutation.isPending ? "Uploading..." : "Upload Resume"}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : resumes.length === 0 ? (
        <Card size="sm">
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No resumes uploaded yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
            />
          ))}
        </div>
      )}
    </div>
  );
}
