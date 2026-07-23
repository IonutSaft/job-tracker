import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 min-h-0 flex-col bg-card overflow_auto">
        <SidebarTrigger className="shrink-0 text-muted-foreground transition-colors hover:text-primary sticky top-0 z-20" />
        <TooltipProvider>
          <div className="flex flex-1 min-h-0 flex-col">{children}</div>
        </TooltipProvider>
      </main>
    </SidebarProvider>
  );
}
