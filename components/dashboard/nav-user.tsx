import Link from "next/link";
import { logout } from "@/lib/actions/auth";

import type { User } from "@supabase/supabase-js";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
  profile,
}: {
  user: User | null;
  profile: { full_name: string | null; avatar_url: string | null } | null;
}) {
  if (!user) return null;

  const displayName = profile?.full_name ?? "Unknown User";
  const avatarUrl = profile?.avatar_url ?? "";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton className="py-6">
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src={avatarUrl} alt="User Avatar" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <p className="text-lg">{displayName}</p>
                </div>
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <Avatar className="size-10">
                <AvatarImage src={avatarUrl} alt="User Avatar" />
                <AvatarFallback className="text-base">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{displayName}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/resumes" />}>
              Resumes
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/settings" />}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={logout}>
              <DropdownMenuItem
                nativeButton
                render={<button type="submit" className="w-full text-left" />}
              >
                Logout
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
