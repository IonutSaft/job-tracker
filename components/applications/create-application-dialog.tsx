"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

import {
  applicationSchema,
  type ApplicationFormData,
} from "@/lib/schemas/applications";
import { statusConfig } from "@/lib/config";
import { createApplication } from "@/lib/actions/applications";

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
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateApplicationDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company_name: "",
      role_title: "",
      status: "bookmarked",
      work_type: "remote",
      location: "",
      job_url: "",
      salary_currency: "",
      salary_min: undefined,
      salary_max: undefined,
      notes: "",
      applied_at: "",
    },
  });

  const watchStatus = useWatch({ control, name: "status" });

  const onSubmit = async (data: ApplicationFormData) => {
    const result = await createApplication(data);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Application created");
      setOpen(false);
      reset();
      router.refresh();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <PlusIcon />
            New Application
          </Button>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>New Application</DialogTitle>
            <DialogDescription>
              Add a new job application to track.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-5">
                <Field>
                  <Label htmlFor="company_name">Company</Label>
                  <Controller
                    name="company_name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="company_name"
                        placeholder="Acme Corp"
                        {...field}
                      />
                    )}
                  />
                  {errors.company_name && (
                    <p className="text-sm text-destructive">
                      {errors.company_name.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="role_title">Role</Label>
                  <Controller
                    name="role_title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="role_title"
                        placeholder="Software Engineer"
                        {...field}
                      />
                    )}
                  />
                  {errors.role_title && (
                    <p className="text-sm text-destructive">
                      {errors.role_title.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="work_type">Work Type</Label>
                  <Controller
                    name="work_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        id="work_type"
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select work type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">On-site</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.work_type && (
                    <p className="text-sm text-destructive">
                      {errors.work_type.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        id="status"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {(
                            Object.entries(statusConfig) as [
                              ApplicationFormData["status"],
                              (typeof statusConfig)[ApplicationFormData["status"]],
                            ][]
                          ).map(([value, config]) => (
                            <SelectItem key={value} value={value}>
                              {config.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <p className="text-sm text-destructive">
                      {errors.status.message}
                    </p>
                  )}
                </Field>
                {watchStatus === "applied" && (
                  <Field>
                    <Label htmlFor="applied_at">Applied Date</Label>
                    <Controller
                      name="applied_at"
                      control={control}
                      render={({ field }) => (
                        <Input id="applied_at" type="date" {...field} />
                      )}
                    />
                    {errors.applied_at && (
                      <p className="text-sm text-destructive">
                        {errors.applied_at.message}
                      </p>
                    )}
                  </Field>
                )}
              </div>
              <div className="flex flex-col gap-5">
                <Field>
                  <Label htmlFor="location">Location</Label>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        {...field}
                      />
                    )}
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive">
                      {errors.location.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="job_url">Job URL</Label>
                  <Controller
                    name="job_url"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="job_url"
                        type="url"
                        placeholder="https://company.com/careers/..."
                        {...field}
                      />
                    )}
                  />
                  {errors.job_url && (
                    <p className="text-sm text-destructive">
                      {errors.job_url.message}
                    </p>
                  )}
                </Field>
                <div className="flex flex-col gap-2">
                  <Label>Salary</Label>
                  <div className="flex gap-2">
                    <div className="w-[110px] shrink-0">
                      <Controller
                        name="salary_currency"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="salary_currency"
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Curr" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                              <SelectItem value="CAD">CAD (C$)</SelectItem>
                              <SelectItem value="AUD">AUD (A$)</SelectItem>
                              <SelectItem value="JPY">JPY (¥)</SelectItem>
                              <SelectItem value="CHF">CHF (Fr)</SelectItem>
                              <SelectItem value="INR">INR (₹)</SelectItem>
                              <SelectItem value="BRL">BRL (R$)</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.salary_currency && (
                        <p className="text-sm text-destructive">
                          {errors.salary_currency.message}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <Controller
                        name="salary_min"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="salary_min"
                            type="number"
                            min="0"
                            placeholder="Min"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value),
                              )
                            }
                          />
                        )}
                      />
                      {errors.salary_min && (
                        <p className="text-sm text-destructive">
                          {errors.salary_min.message}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <Controller
                        name="salary_max"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="salary_max"
                            type="number"
                            min="0"
                            placeholder="Max"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? undefined
                                  : Number(e.target.value),
                              )
                            }
                          />
                        )}
                      />
                      {errors.salary_max && (
                        <p className="text-sm text-destructive">
                          {errors.salary_max.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <Field>
                  <Label htmlFor="notes">Notes</Label>
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="notes"
                        placeholder="Any additional notes..."
                        {...field}
                      />
                    )}
                  />
                  {errors.notes && (
                    <p className="text-sm text-destructive">
                      {errors.notes.message}
                    </p>
                  )}
                </Field>
              </div>
            </div>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
