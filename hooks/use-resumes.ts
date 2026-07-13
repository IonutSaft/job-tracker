import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@/components/auth/auth-context";
import { uploadResume, deleteResume } from "@/lib/actions/resumes";
import type { Database } from "@/lib/database.types";
import { toast } from "sonner";

type Resume = Database["public"]["Tables"]["resumes"]["Row"];

export function useResumes(initialData: Resume[]) {
  const { user } = useAuth();

  return useQuery<Resume[]>({
    queryKey: ["resumes", user?.id],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
    initialData,
  });
}

export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => uploadResume(formData),
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["resumes"] });
        toast.success("Resume uploaded");
      } else if (result.error) {
        toast.error(result.error);
      }
    },
    onError: () => {
      toast.error("Failed to upload resume");
    },
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteResume(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["resumes"] });

      const previous = queryClient.getQueriesData<Resume[]>({
        queryKey: ["resumes"],
      });

      queryClient.setQueriesData<Resume[]>(
        { queryKey: ["resumes"] },
        (old) => {
          if (!old) return old;
          return old.filter((resume) => resume.id !== id);
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
      toast.error("Failed to delete resume");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
}
