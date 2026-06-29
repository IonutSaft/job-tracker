"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import type { ApplicationFormData } from "@/lib/schemas/applications";
import type { Database } from "@/lib/database.types";
import { useUpdateApplication } from "@/hooks/use-applications";

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

type Application = Database["public"]["Tables"]["applications"]["Row"];

export function EditApplicationDialog({
  application,
}: {
  application: Application;
}) {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateApplication();

  const defaultValues: ApplicationFormData = {
    company_name: application.company_name ?? "",
    role_title: application.role_title ?? "",
    status: application.status ?? "bookmarked",
    work_type: application.work_type,
    location: application.location,
    job_url: application.job_url,
    salary_currency: application.salary_currency,
    salary_min: application.salary_min,
    salary_max: application.salary_max,
    notes: application.notes,
    applied_at: application.applied_at,
  };

  const onSubmit = async (data: ApplicationFormData) => {
    const result = await updateMutation.mutateAsync({
      id: application.id,
      data,
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Application updated");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon">
            <Pencil />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update the details for {application.company_name ?? "this application"}.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isSubmitting={updateMutation.isPending}
          submitLabel="Save Changes"
          submittingLabel="Saving..."
        />
      </DialogContent>
    </Dialog>
  );
}
