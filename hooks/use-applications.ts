import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/auth/auth-context";
import {
  createApplication,
  updateApplication,
  deleteApplication,
  updateApplicationsOrder,
} from "@/lib/actions/applications";
import type { ApplicationFormData } from "@/lib/schemas/applications";
import type { Database } from "@/lib/database.types";
import { toast } from "sonner";

type Application = Database["public"]["Tables"]["applications"]["Row"];

export function useApplications(initialData: Application[]) {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") ?? "applied_at";
  const sortDir = (searchParams.get("sortDir") as "asc" | "desc") ?? "desc";
  const statusFilter = searchParams.get("status") ?? "";

  const queryKey = useMemo(
    () => ["applications", { sortBy, sortDir, statusFilter, userId: user?.id }],
    [sortBy, sortDir, statusFilter, user?.id],
  );

  return useQuery<Application[]>({
    queryKey,
    queryFn: async () => {
      const supabase = createClient();
      let query = supabase.from("applications").select("*");

      if (user?.id) {
        query = query.eq("user_id", user.id);
      }

      if (statusFilter) {
        query = query.eq("status", statusFilter);
      }

      query = query.order(sortBy, { ascending: sortDir === "asc" });

      const { data } = await query;
      return data ?? [];
    },
    initialData,
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
      }
    },
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ApplicationFormData }) =>
      updateApplication(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });
      const previous = queryClient.getQueriesData({
        queryKey: ["applications"],
      });

      queryClient.setQueriesData<Application[]>(
        { queryKey: ["applications"] },
        (old) => {
          if (!old) return old;
          return old.map((app) =>
            app.id === id ? { ...app, ...data, updated_at: new Date().toISOString() } : app,
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
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });
      const previous = queryClient.getQueriesData({
        queryKey: ["applications"],
      });

      queryClient.setQueriesData<Application[]>(
        { queryKey: ["applications"] },
        (old) => {
          if (!old) return old;
          return old.filter((app) => app.id !== id);
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
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useKanbanApplications(initialData: Application[]) {
  return useQuery<Application[]>({
    queryKey: ["applications", "kanban"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("applications")
        .select("*")
        .order("kanban_order", { ascending: true })
        .order("applied_at", { ascending: false });
      return data ?? [];
    },
    initialData,
  });
}

export function useReorderApplications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateApplicationsOrder,
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ["applications"] });

      const previous = queryClient.getQueriesData<Application[]>({
        queryKey: ["applications"],
      });

      queryClient.setQueryData<Application[]>(
        ["applications", "kanban"],
        (old) => {
          if (!old) return old;
          const updated = old.map((app) => {
            const update = updates.find((u) => u.id === app.id);
            if (update) {
              return {
                ...app,
                status: update.status,
                kanban_order: update.kanban_order,
              };
            }
            return app;
          });
          updated.sort((a, b) => a.kanban_order - b.kanban_order);
          return updated;
        },
      );

      return { previous };
    },
    onError: (_err, _updates, context) => {
      if (context?.previous) {
        for (const [key, data] of context.previous) {
          queryClient.setQueryData(key, data);
        }
      }
      toast.error("Failed to reorder cards");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
