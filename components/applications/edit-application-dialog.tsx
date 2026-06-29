"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import { updateApplication } from "@/lib/actions/applications";
import type { ApplicationFormData } from "@/lib/schemas/applications";
import type { Database } from "@/lib/database.types";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
    setIsSubmitting(true);
    const result = await updateApplication(application.id, data);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Application updated");
      setOpen(false);
      router.refresh();
    }
    setIsSubmitting(false);
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
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
          submittingLabel="Saving..."
        />
      </DialogContent>
    </Dialog>
  );
}
