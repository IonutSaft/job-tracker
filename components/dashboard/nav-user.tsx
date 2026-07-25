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
              <SidebarMenuButton className="py-6 rounded-none">
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage src={avatarUrl} alt="User Avatar" />
                    <AvatarFallback className="font-heading text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-heading text-sm uppercase tracking-wider">
                    {displayName}
                  </p>
                </div>
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-none border border-border bg-popover"
          >
            <div className="flex items-center gap-2 border-b border-border px-2 py-2">
              <Avatar className="size-10">
                <AvatarImage src={avatarUrl} alt="User Avatar" />
                <AvatarFallback className="font-heading text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-heading text-xs uppercase tracking-wider text-popover-foreground">
                  {displayName}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator className="hidden" />
            <div className="p-1 mt-1">
              <DropdownMenuItem
                render={
                  <Link
                    href="/dashboard/resumes"
                    className="font-heading text-xs uppercase tracking-wider text-popover-foreground transition-colors hover:text-primary"
                  />
                }
              >
                &gt; Resumes
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <Link
                    href="/dashboard/settings"
                    className="font-heading text-xs uppercase tracking-wider text-popover-foreground transition-colors hover:text-primary"
                  />
                }
              >
                &gt; Settings
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="mx-1 w-auto border-border" />
            <form action={logout}>
              <DropdownMenuItem
                nativeButton
                render={
                  <button
                    type="submit"
                    className="w-full text-left font-heading text-xs uppercase tracking-wider text-destructive transition-colors hover:text-destructive/80"
                  />
                }
              >
                &gt; Logout
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
