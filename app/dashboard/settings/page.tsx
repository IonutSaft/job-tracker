import { getSupabaseClient, getCurrentUser, getProfile } from "@/lib/data";
import { ProfileForm } from "@/components/settings/profile-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function SettingsPage() {
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);

  const { data: profile } = await getProfile(supabase, user?.id ?? "");

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <h1 className="shrink-0 font-heading text-xl uppercase tracking-[0.15em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
        {"// SETTINGS"}
      </h1>

      <Card className="mx-auto w-full max-w-3xl rounded-none border border-border bg-card">
        <CardHeader>
          <CardTitle className="font-heading text-xs uppercase tracking-wider text-muted-foreground">
            Profile
          </CardTitle>
          <CardDescription className="font-mono text-[10px] text-muted-foreground">
            Update your name and avatar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
