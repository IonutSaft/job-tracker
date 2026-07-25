"use client";

import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarNavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <Link
      href={href}
      className={className}
      onClick={() => isMobile && setOpenMobile(false)}
    >
      {children}
    </Link>
  );
}
