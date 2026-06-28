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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export async function AppSidebar() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName = user?.user_metadata.full_name ?? "Unknown User";
  const userAvatar = user?.user_metadata.avatar_url ?? "";

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/applications">Applications</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/kanban">Kanban Board</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/">Landing Page</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger
                render={
                  <SidebarMenuButton className="py-6">
                    {user ? (
                      <div className="flex flex-row items-center gap-2">
                        {userAvatar && (
                          <Image
                            src={userAvatar}
                            alt="User Avatar"
                            className="h-8 w-8 rounded-full"
                            width={16}
                            height={16}
                            priority
                          ></Image>
                        )}
                        <p className="text-lg">{displayName}</p>
                      </div>
                    ) : (
                      <div>
                        <span>Uknown user</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                }
              ></TooltipTrigger>
              <TooltipContent>
                <p>Go to user page</p>
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
