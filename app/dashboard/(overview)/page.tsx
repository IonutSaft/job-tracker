import Link from "next/link";
import { Activity, Award, Briefcase, LayoutDashboard, Percent } from "lucide-react";

import { ApplicationsTimelineChart } from "@/components/dashboard/applications-timeline-chart";
import { AverageTimeCard } from "@/components/dashboard/average-time-card";
import { FunnelChart } from "@/components/dashboard/funnel-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
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
  const [stats, funnel, timeline, upcomingInterviews, avgDays] =
    await Promise.all([
      getDashboardStats(supabase, user?.id),
      getApplicationFunnel(supabase, user?.id),
      getApplicationTimeline(supabase, user?.id),
      getUpcomingInterviews(supabase, user?.id),
      getAverageTimeToInterview(supabase, user?.id),
    ]);

  const responseRateColor = (rate: number) => {
    switch (true) {
      case rate <= 10:
        return "text-red-500";
      case rate <= 25:
        return "text-red-300";
      case rate <= 40:
        return "text-orange-500";
      case rate <= 50:
        return "text-orange-300";
      case rate <= 60:
        return "text-yellow-500";
      case rate <= 74:
        return "text-yellow-300";
      case rate <= 85:
        return "text-green-300";
      default:
        return "text-green-500";
    }
  };

  if (stats.totalApplications === 0) {
    return (
      <div className="flex flex-1 min-h-0 flex-col items-center justify-center p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LayoutDashboard />
            </EmptyMedia>
            <EmptyTitle>No data yet</EmptyTitle>
            <EmptyDescription>
              Start tracking your applications to see insights, charts, and upcoming interviews here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button render={<Link href="/dashboard/applications" />} nativeButton={false}>
              Go to Applications
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
        {"// DASHBOARD"}
      </h1>

      <div className="shrink-0 grid grid-cols-1 gap-4 sm:grid-cols-4">
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
          valueClassName={responseRateColor(stats.responseRate)}
        />
      </div>

      <div className="min-h-0 flex-[3] grid grid-cols-1 gap-4 max-lg:min-h-[300px] lg:grid-cols-2">
        <FunnelChart data={funnel} />
        <ApplicationsTimelineChart data={timeline} />
      </div>

      <div className="min-h-0 flex-[2] grid grid-cols-1 gap-4 max-lg:min-h-[200px] lg:grid-cols-2">
        <UpcomingInterviews data={upcomingInterviews} />
        <AverageTimeCard value={avgDays} />
      </div>
    </div>
  );
}
