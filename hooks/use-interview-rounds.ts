import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/lib/database.types";
import {
  createInterviewRound,
  updateInterviewRoundOutcome,
  deleteInterviewRound,
} from "@/lib/actions/interview-rounds";
import type { InterviewRoundFormData } from "@/lib/schemas/interview-rounds";
import { toast } from "sonner";

type InterviewRound =
  Database["public"]["Tables"]["interview_rounds"]["Row"];
type RoundOutcome = Database["public"]["Enums"]["round_outcome"];

export function useInterviewRounds(
  applicationId: string,
  initialData: InterviewRound[],
) {
  return useQuery<InterviewRound[]>({
    queryKey: ["interview-rounds", applicationId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("interview_rounds")
        .select("*")
        .eq("application_id", applicationId)
        .order("round_order", { ascending: true });
      return data ?? [];
    },
    initialData,
  });
}

export function useCreateInterviewRound(applicationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InterviewRoundFormData) =>
      createInterviewRound(applicationId, data),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ["interview-rounds", applicationId],
        });
      }
    },
  });
}

export function useUpdateInterviewRoundOutcome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      outcome,
    }: {
      id: number;
      outcome: RoundOutcome;
    }) => updateInterviewRoundOutcome(id, outcome),
    onMutate: async ({ id, outcome }) => {
      await queryClient.cancelQueries({
        queryKey: ["interview-rounds"],
      });

      const previous = queryClient.getQueriesData<InterviewRound[]>({
        queryKey: ["interview-rounds"],
      });

      queryClient.setQueriesData<InterviewRound[]>(
        { queryKey: ["interview-rounds"] },
        (old) => {
          if (!old) return old;
          return old.map((round) =>
            round.id === id
              ? {
                  ...round,
                  outcome,
                  completed_at:
                    outcome === "pending"
                      ? null
                      : new Date().toISOString(),
                }
              : round,
          );
        },
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        for (const [key, data] of context.previous) {
          queryClient.setQueryData(key, data);
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-rounds"] });
    },
  });
}

export function useDeleteInterviewRound() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteInterviewRound(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["interview-rounds"],
      });

      const previous = queryClient.getQueriesData<InterviewRound[]>({
        queryKey: ["interview-rounds"],
      });

      queryClient.setQueriesData<InterviewRound[]>(
        { queryKey: ["interview-rounds"] },
        (old) => {
          if (!old) return old;
          return old.filter((round) => round.id !== id);
        },
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        for (const [key, data] of context.previous) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error("Failed to delete round");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-rounds"] });
    },
  });
}
