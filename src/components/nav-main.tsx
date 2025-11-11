"use client";

import {
  LucideFileSpreadsheet,
  LucideGauge,
  type LucideIcon,
  LucideUsers,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavItem<T extends string = string> = {
  href: T;
  title: string;
  icon: LucideIcon;
};

const navItems: NavItem<Route>[] = [
  { href: "/dashboard", title: "Dashboard", icon: LucideGauge },
  {
    href: "/dashboard/invoices",
    title: "Invoices",
    icon: LucideFileSpreadsheet,
  },
  { href: "/dashboard/customers", title: "Customers", icon: LucideUsers },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
