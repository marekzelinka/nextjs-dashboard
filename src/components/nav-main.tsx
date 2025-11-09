"use client";

import {
  DocumentDuplicateIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem<T extends string = string> = {
  href: T;
  label: string;
  icon: typeof HomeIcon;
};

const navItems: NavItem<Route>[] = [
  { href: "/dashboard", label: "Home", icon: HomeIcon },
  {
    href: "/dashboard/invoices",
    label: "Invoices",
    icon: DocumentDuplicateIcon,
  },
  { href: "/dashboard/customers", label: "Customers", icon: UserGroupIcon },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        const LinkIcon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={clsx(
              "flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 font-medium text-sm hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === item.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{item.label}</p>
          </Link>
        );
      })}
    </>
  );
}
