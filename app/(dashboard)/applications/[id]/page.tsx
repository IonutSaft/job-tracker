import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  getSupabaseClient,
  getCurrentUser,
  getApplication,
  getInterviewRounds,
  getContacts,
  getActivityLogs,
} from "@/lib/data";
import { ApplicationCard } from "@/components/applications/application-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = await getSupabaseClient();
  const user = await getCurrentUser(supabase);
  if (!user) notFound();

  const [applicationResult, roundsResult, contactsResult, activityResult] =
    await Promise.all([
      getApplication(supabase, id, user.id),
      getInterviewRounds(supabase, id),
      getContacts(supabase, id),
      getActivityLogs(supabase, id),
    ]);

  const application = applicationResult.data;
  if (!application) notFound();

  const rounds = roundsResult.data ?? [];
  const contacts = contactsResult.data ?? [];
  const activityLogs = activityResult.data ?? [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/applications">
          <Button variant="ghost" className="-ml-2 gap-1 text-muted-foreground">
            <ArrowLeft className="size-4" />
            Back to Applications
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="rounds" disabled>
            Interview Rounds
          </TabsTrigger>
          <TabsTrigger value="contacts" disabled>
            Contacts
          </TabsTrigger>
          <TabsTrigger value="activity" disabled>
            Activity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="pt-4">
          <ApplicationCard application={application} />
        </TabsContent>
        <TabsContent value="rounds" className="pt-4" />
        <TabsContent value="contacts" className="pt-4" />
        <TabsContent value="activity" className="pt-4" />
      </Tabs>
    </div>
  );
}
