import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getSupabaseClient, getCurrentUser, getProfile } from "@/lib/data";
import { ProfileForm } from "@/components/settings/profile-form";

async function SettingsFetcher() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);
  const { data: profile } = await getProfile(supabase, user?.id ?? "");
  return <ProfileForm profile={profile} />;
}

function SettingsSkeleton() {
  return (
    <Card className="mx-auto w-full max-w-3xl rounded-none border border-border bg-card">
      <CardHeader>
        <Skeleton className="h-4 w-16 rounded-none" />
        <Skeleton className="mt-1 h-3 w-40 rounded-none" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <Skeleton className="h-3 w-12 rounded-none" />
            <Skeleton className="h-10 w-full rounded-none" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-14 rounded-none" />
            <Skeleton className="h-10 w-full rounded-none" />
          </div>
          <Skeleton className="h-10 w-24 rounded-none" />
        </div>
      </CardContent>
    </Card>
  );
}

export default async function SettingsPage() {
  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)] mb-4">
        {"// SETTINGS"}
      </h1>
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsFetcher />
      </Suspense>
    </div>
  );
}
