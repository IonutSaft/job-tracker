"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

import type { ApplicationFormData } from "@/lib/schemas/applications";
import { useCreateApplication } from "@/hooks/use-applications";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApplicationForm } from "@/components/applications/application-form";

export function CreateApplicationDialog() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateApplication();

  const defaultValues: ApplicationFormData = {
    company_name: "",
    role_title: "",
    status: "bookmarked",
    work_type: "remote",
    location: null,
    job_url: null,
    salary_currency: null,
    salary_min: null,
    salary_max: null,
    notes: null,
    applied_at: null,
    resume_id: null,
  };

  const onSubmit = async (data: ApplicationFormData) => {
    const result = await createMutation.mutateAsync(data);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Application created");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="rounded-none max-sm:text-[10px] max-sm:h-7 max-sm:px-2">
            <PlusIcon className="size-4 max-sm:size-3" />
            <span className="sm:hidden">New</span>
            <span className="hidden sm:inline">New Application</span>
          </Button>
        }
      />
      <DialogContent className="rounded-none sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xs uppercase tracking-wider">
            {"// NEW APPLICATION"}
          </DialogTitle>
          <DialogDescription>
            Add a new job application to track.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isSubmitting={createMutation.isPending}
          submitLabel="Create Application"
          submittingLabel="Creating..."
        />
      </DialogContent>
    </Dialog>
  );
}
