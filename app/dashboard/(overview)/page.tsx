import { Activity, Award, Briefcase, Percent } from "lucide-react";

import { ApplicationsTimelineChart } from "@/components/dashboard/applications-timeline-chart";
import { AverageTimeCard } from "@/components/dashboard/average-time-card";
import { FunnelChart } from "@/components/dashboard/funnel-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews";
import {
  getApplicationFunnel,
  getApplicationTimeline,
  getAverageTimeToInterview,
  getCurrentUser,
  getDashboardStats,
  getSupabaseClient,
  getUpcomingInterviews,
} from "@/lib/data";

export default async function Page() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);
  const [stats, funnel, timeline, upcomingInterviews, avgDays] = await Promise.all([
    getDashboardStats(supabase, user?.id),
    getApplicationFunnel(supabase, user?.id),
    getApplicationTimeline(supabase, user?.id),
    getUpcomingInterviews(supabase, user?.id),
    getAverageTimeToInterview(supabase, user?.id),
  ]);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FunnelChart data={funnel} />
        <ApplicationsTimelineChart data={timeline} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UpcomingInterviews data={upcomingInterviews} />
        <AverageTimeCard value={avgDays} />
      </div>
    </div>
  );
}
