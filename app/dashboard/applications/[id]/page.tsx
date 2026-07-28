import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

import {
  getSupabaseClient,
  getCurrentUser,
  getApplication,
  getApplicationResume,
  getInterviewRounds,
  getContacts,
  getActivityLogs,
} from "@/lib/data";
import { ApplicationCard } from "@/components/applications/application-card";
import { InterviewRoundsSection } from "@/components/applications/interview-rounds-section";
import { ContactsSection } from "@/components/applications/contacts-section";
import { ActivityLogSection } from "@/components/applications/activity-log-section";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ErrorBoundary } from "@/components/error-boundary";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function ApplicationDetailSkeleton() {
  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <div className="shrink-0">
        <Skeleton className="h-9 w-44 rounded-none" />
      </div>
      <div className="flex gap-2 mb-2 flex-wrap">
        <Skeleton className="h-8 w-16 rounded-none" />
        <Skeleton className="h-8 w-32 rounded-none" />
        <Skeleton className="h-8 w-24 rounded-none" />
        <Skeleton className="h-8 w-20 rounded-none" />
      </div>
      <Skeleton className="flex-1 rounded-none" />
    </div>
  );
}

async function ApplicationDetailFetcher(props: { params: Promise<{ id: string }> }) {
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

  const resume = application.resume_id
    ? (await getApplicationResume(supabase, application.resume_id)).data
    : null;

  const rounds = roundsResult.data ?? [];
  const contacts = contactsResult.data ?? [];
  const activityLogs = activityResult.data ?? [];

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-3 p-6">
      <div className="shrink-0">
        <Link href="/dashboard/applications">
          <Button
            variant="ghost"
            className="-ml-2 gap-1 rounded-none text-muted-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Applications
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="info" className="flex-1 min-h-0 flex-col">
        <TabsList
          variant="line"
          className="shrink-0 md:inline-flex md:w-fit flex w-full flex-wrap mb-2"
        >
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="rounds">Interview Rounds</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="pt-4 min-h-0">
          <ApplicationCard application={application} resume={resume} />
        </TabsContent>
        <TabsContent value="rounds" className="pt-4 min-h-0">
          <ErrorBoundary>
            <InterviewRoundsSection applicationId={id} initialRounds={rounds} />
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="contacts" className="pt-4 min-h-0">
          <ErrorBoundary>
            <ContactsSection applicationId={id} initialContacts={contacts} />
          </ErrorBoundary>
        </TabsContent>
        <TabsContent value="activity" className="pt-4 min-h-0">
          <ErrorBoundary>
            <ActivityLogSection
              applicationId={id}
              initialActivityLogs={activityLogs}
            />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<ApplicationDetailSkeleton />}>
      <ApplicationDetailFetcher {...props} />
    </Suspense>
  );
}
