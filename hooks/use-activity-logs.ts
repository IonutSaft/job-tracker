import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import type { Database } from "@/lib/database.types";

type ActivityLog = Database["public"]["Tables"]["activity_logs"]["Row"];

export function useActivityLogs(
  applicationId: string,
  initialData: ActivityLog[],
) {
  return useQuery<ActivityLog[]>({
    queryKey: ["activity-logs", applicationId],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("activity_logs")
        .select("*")
        .eq("application_id", applicationId)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
    initialData,
  });
}
