import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { SidebarNavLink } from "./sidebar-nav-link";
import { NavUser } from "./nav-user";

export async function AppSidebar() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = user
    ? await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single()
        .then((r) => r.data)
    : null;

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-primary/20 pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span className="font-heading text-sm uppercase tracking-[0.2em] text-primary [text-shadow:0_0_8px_rgba(0,255,65,0.4)]">
                [_] Job Tracker
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-heading text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {"// PAGES"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem className="border-b border-sidebar-border pb-1 last:border-b-0">
                <SidebarNavLink
                  href="/dashboard"
                  className="font-heading text-base uppercase tracking-wider text-sidebar-foreground transition-colors hover:text-primary"
                >
                  &gt; Dashboard
                </SidebarNavLink>
              </SidebarMenuItem>
              <SidebarMenuItem className="border-b border-sidebar-border py-1 last:border-b-0">
                <SidebarNavLink
                  href="/dashboard/applications"
                  className="font-heading text-base uppercase tracking-wider text-sidebar-foreground transition-colors hover:text-primary"
                >
                  &gt; Applications
                </SidebarNavLink>
              </SidebarMenuItem>
              <SidebarMenuItem className="border-b border-sidebar-border pb-1 last:border-b-0">
                <SidebarNavLink
                  href="/dashboard/kanban"
                  className="font-heading text-base uppercase tracking-wider text-sidebar-foreground transition-colors hover:text-primary"
                >
                  &gt; Kanban Board
                </SidebarNavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} profile={profile} />
      </SidebarFooter>
    </Sidebar>
  );
}
