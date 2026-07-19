import { Activity, Award, Briefcase, Percent } from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { getCurrentUser, getDashboardStats, getSupabaseClient } from "@/lib/data";

export default async function Page() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);
  const stats = await getDashboardStats(supabase, user?.id);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Applications"
          value={stats.totalApplications}
          icon={<Briefcase className="size-4" />}
        />
        <StatCard
          label="Currently Active"
          value={stats.activeApplications}
          icon={<Activity className="size-4" />}
        />
        <StatCard
          label="Offers Received"
          value={stats.offersReceived}
          icon={<Award className="size-4" />}
        />
        <StatCard
          label="Response Rate"
          value={`${stats.responseRate}%`}
          icon={<Percent className="size-4" />}
        />
      </div>
    </div>
  );
}
