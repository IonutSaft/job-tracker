"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

import type { Database } from "@/lib/database.types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { ApplicationCard } from "@/components/applications/application-card";

type Application = Database["public"]["Tables"]["applications"]["Row"];

export function ViewApplicationDialog({
  application,
}: {
  application: Application;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon">
            <Eye />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>
            {application.company_name ?? "Application"}
            {application.role_title ? ` - ${application.role_title}` : ""}
          </DialogDescription>
        </DialogHeader>
        <ApplicationCard application={application} />
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" type="button">
                Close
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
