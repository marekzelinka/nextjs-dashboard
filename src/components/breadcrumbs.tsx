import { clsx } from "clsx";
import type { Route } from "next";
import Link from "next/link";

type Breadcrumb<T extends string = string> = {
  href: T;
  label: string;
  active?: boolean;
};

export function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb<Route>[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx("flex font-serif text-xl md:text-2xl")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? "text-gray-900" : "text-gray-500",
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
