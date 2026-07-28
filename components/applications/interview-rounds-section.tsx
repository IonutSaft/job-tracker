"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Plus, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

import type { Database } from "@/lib/database.types";
import { roundTypeConfig, roundOutcomeConfig } from "@/lib/config";
import {
  interviewRoundSchema,
  type InterviewRoundFormData,
} from "@/lib/schemas/interview-rounds";
import {
  useInterviewRounds,
  useCreateInterviewRound,
  useUpdateInterviewRoundOutcome,
  useDeleteInterviewRound,
} from "@/hooks/use-interview-rounds";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type InterviewRound = Database["public"]["Tables"]["interview_rounds"]["Row"];
type RoundOutcome = Database["public"]["Enums"]["round_outcome"];

function RoundCard({ round }: { round: InterviewRound }) {
  const outcomeMutation = useUpdateInterviewRoundOutcome();
  const deleteMutation = useDeleteInterviewRound();
  const [expanded, setExpanded] = useState(false);

  const handleOutcomeChange = (value: string | null) => {
    if (!value) return;
    outcomeMutation.mutate({
      id: round.id,
      outcome: value as RoundOutcome,
    });
  };

  return (
    <Card size="sm" className="rounded-none border border-border bg-card">
      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {round.round_type
                  ? (roundTypeConfig[round.round_type]?.label ??
                    round.round_type)
                  : "Unknown"}
              </Badge>
              <span className="text-sm font-medium">{round.title}</span>
            </div>
            {round.scheduled_at && (
              <p className="text-xs text-muted-foreground">
                {format(new Date(round.scheduled_at), "MMM d, yyyy")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Select
              value={round.outcome ?? "pending"}
              onValueChange={handleOutcomeChange}
            >
              <SelectTrigger className="h-7 w-32 rounded-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(roundOutcomeConfig) as [
                    RoundOutcome,
                    (typeof roundOutcomeConfig)[RoundOutcome],
                  ][]
                ).map(([value, config]) => (
                  <SelectItem key={value} value={value}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon-xs"
              className="cursor-pointer"
              onClick={() => deleteMutation.mutate(round.id)}
            >
              <Trash2 className="size-3" />
            </Button>
          </div>
        </div>
        {round.notes && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {expanded ? "Hide notes" : "Show notes"}
            </button>
            {expanded && (
              <p className="mt-1 text-sm text-muted-foreground">
                {round.notes}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AddRoundDialog({
  open,
  onOpenChange,
  applicationId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId: string;
}) {
  const createMutation = useCreateInterviewRound(applicationId);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InterviewRoundFormData>({
    resolver: zodResolver(interviewRoundSchema),
    defaultValues: {
      round_type: "phone_screen",
      title: "",
      scheduled_at: null,
      notes: null,
    },
  });

  const onSubmit = async (data: InterviewRoundFormData) => {
    const result = await createMutation.mutateAsync(data);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Round added");
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-none sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xs uppercase tracking-wider">
            {"// ADD ROUND"}
          </DialogTitle>
          <DialogDescription>
            Record a new interview round for this application.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="py-4">
            <div className="flex flex-col gap-5">
              <Field>
                <Label htmlFor="round_type">Round Type</Label>
                <Controller
                  name="round_type"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full rounded-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          Object.entries(roundTypeConfig) as [
                            InterviewRoundFormData["round_type"],
                            (typeof roundTypeConfig)[InterviewRoundFormData["round_type"]],
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
                {errors.round_type && (
                  <p className="text-sm text-destructive">
                    {errors.round_type.message}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="title">Title</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="title"
                      placeholder="e.g. Initial Phone Screen"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </Field>
              <Field>
                <Label htmlFor="scheduled_at">Scheduled Date</Label>
                <Controller
                  name="scheduled_at"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="scheduled_at"
                      type="date"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>
              <Field>
                <Label htmlFor="notes">Notes</Label>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="notes"
                      placeholder="Any notes about this round..."
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button
                  variant="outline"
                  type="button"
                  className="rounded-none"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              className="rounded-none"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Adding..." : "Add Round"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function InterviewRoundsSection({
  applicationId,
  initialRounds,
}: {
  applicationId: string;
  initialRounds: InterviewRound[];
}) {
  const { data: rounds, isFetching } = useInterviewRounds(applicationId, initialRounds);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-xs uppercase tracking-wider text-muted-foreground">
          {rounds.length} round{rounds.length !== 1 ? "s" : ""}
        </h3>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger
            render={
              <Button size="sm" className="rounded-none">
                <Plus className="mr-1 size-4" />
                Add Round
              </Button>
            }
          />
          <AddRoundDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            applicationId={applicationId}
          />
        </Dialog>
      </div>

      {isFetching ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} size="sm" className="rounded-none border border-border bg-card">
              <CardContent>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-24 rounded-none" />
                      <Skeleton className="h-5 w-32 rounded-none" />
                    </div>
                    <Skeleton className="h-4 w-28 rounded-none" />
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Skeleton className="h-7 w-32 rounded-none" />
                    <Skeleton className="size-7 rounded-none" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : rounds.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Calendar />
            </EmptyMedia>
            <EmptyTitle>No interview rounds yet</EmptyTitle>
            <EmptyDescription>
              Add an interview round to track your progress.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="space-y-2">
          {rounds.map((round) => (
            <RoundCard key={round.id} round={round} />
          ))}
        </div>
      )}
    </div>
  );
}
