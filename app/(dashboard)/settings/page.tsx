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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your name and avatar</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
