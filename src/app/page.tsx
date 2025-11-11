import { LucideLogIn } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Welcome to Invoify",
};

export default function HomePage() {
  return (
    <main className="grid min-h-svh">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <AppLogo />
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">
              Sign in
              <LucideLogIn />
            </Link>
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="container flex w-full flex-col items-center gap-2 text-center xl:gap-4">
            <h1 className="max-w-4xl text-balance font-semibold font-serif text-4xl leading-tighter tracking-tight lg:font-semibold lg:leading-[1.1] xl:text-5xl xl:tracking-tighter">
              A better way to manage your invoices
            </h1>
            <p className="max-w-3xl text-balance font-serif text-base sm:text-lg">
              Simplify and speed up your invoicing with a reliable solution that
              keeps your business running smoothly.
            </p>
            <div className="flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none">
              <Button asChild size="sm">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
