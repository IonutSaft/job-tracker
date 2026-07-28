import Link from "next/link";
import { Suspense } from "react";
import {
  Activity,
  Award,
  Briefcase,
  LayoutDashboard,
  Percent,
} from "lucide-react";

import { ApplicationsTimelineChart } from "@/components/dashboard/applications-timeline-chart";
import { AverageTimeCard } from "@/components/dashboard/average-time-card";
import { FunnelChart } from "@/components/dashboard/funnel-chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/error-boundary";
import {
  getApplicationFunnel,
  getApplicationTimeline,
  getAverageTimeToInterview,
  getCurrentUser,
  getDashboardStats,
  getSupabaseClient,
  getUpcomingInterviews,
} from "@/lib/data";

// --- DASHBOARD CONTENT ---

async function DashboardContent() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);
  const stats = await getDashboardStats(supabase, user?.id);

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
              Start tracking your applications to see insights, charts, and
              upcoming interviews here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              render={<Link href="/dashboard/applications" />}
              nativeButton={false}
            >
              Go to Applications
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  const [funnel, timeline, upcomingInterviews, avgDays] = await Promise.all([
    getApplicationFunnel(supabase, user?.id),
    getApplicationTimeline(supabase, user?.id),
    getUpcomingInterviews(supabase, user?.id),
    getAverageTimeToInterview(supabase, user?.id),
  ]);

  return (
    <>
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
        <ErrorBoundary>
          <FunnelChart data={funnel} />
        </ErrorBoundary>
        <ErrorBoundary>
          <ApplicationsTimelineChart data={timeline} />
        </ErrorBoundary>
      </div>

      <div className="min-h-0 flex-[2] grid grid-cols-1 gap-4 max-lg:min-h-[200px] lg:grid-cols-2">
        <UpcomingInterviews data={upcomingInterviews} />
        <AverageTimeCard value={avgDays} />
      </div>
    </>
  );
}

// --- SKELETON ---

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            size="sm"
            className="rounded-none border border-border bg-card"
          >
            <CardHeader className="flex-row items-center justify-between gap-2">
              <Skeleton className="h-3 w-24 rounded-none" />
              <Skeleton className="size-4 rounded-none" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-16 rounded-none" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="min-h-0 flex-[3] grid grid-cols-1 gap-4 max-lg:min-h-[300px] lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card
            key={i}
            className="flex flex-col rounded-none border border-border bg-card min-h-0"
          >
            <CardHeader className="shrink-0">
              <Skeleton className="h-4 w-40 rounded-none" />
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <Skeleton className="h-full w-full rounded-none" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="min-h-0 flex-[2] grid grid-cols-1 gap-4 max-lg:min-h-[200px] lg:grid-cols-2">
        <Card className="flex flex-col rounded-none border border-border bg-card min-h-0">
          <CardHeader className="shrink-0">
            <Skeleton className="h-4 w-36 rounded-none" />
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 rounded-none border border-border bg-muted/30 p-2"
                >
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-32 rounded-none" />
                    <Skeleton className="h-3 w-24 rounded-none" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Skeleton className="h-5 w-20 rounded-none" />
                    <Skeleton className="h-3 w-16 rounded-none" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-none border border-border bg-card">
          <CardHeader className="flex-row items-center justify-between gap-2">
            <Skeleton className="h-4 w-36 rounded-none" />
            <Skeleton className="size-4 rounded-none" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-7 w-24 rounded-none" />
            <Skeleton className="mt-1 h-3 w-48 rounded-none" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// --- PAGE ---

export default async function Page() {
  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
        {"// DASHBOARD"}
      </h1>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
