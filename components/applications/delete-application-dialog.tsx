"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import type { Database } from "@/lib/database.types";
import { useDeleteApplication } from "@/hooks/use-applications";

import { Button } from "@/components/ui/button";
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

type Application = Database["public"]["Tables"]["applications"]["Row"];

export function DeleteApplicationDialog({
  application,
}: {
  application: Application;
}) {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteApplication();

  const handleDelete = async () => {
    const result = await deleteMutation.mutateAsync(application.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Application deleted");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the application at{" "}
            {application.company_name ?? "this company"}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" type="button" disabled={deleteMutation.isPending}>
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
  );
}
