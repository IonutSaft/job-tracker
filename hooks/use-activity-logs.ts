import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/components/auth/auth-context";
import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/lib/database.types";

type ActivityLog = Database["public"]["Tables"]["activity_logs"]["Row"];

export function useActivityLogs(
  applicationId: string,
  initialData: ActivityLog[],
) {
  const { user } = useAuth();
  return useQuery<ActivityLog[]>({
    queryKey: ["activity-logs", applicationId, user?.id],
    queryFn: async () => {
      const supabase = createClient();
      let query = supabase
        .from("activity_logs")
        .select("*")
        .eq("application_id", applicationId)
        .order("created_at", { ascending: false });
      if (user?.id) query = query.eq("user_id", user.id);
      const { data } = await query;
      return data ?? [];
    },
    initialData,
  });
}
