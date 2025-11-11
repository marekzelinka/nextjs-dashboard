import type { Metadata } from "next";
import { Suspense } from "react";
import { AppLogo } from "@/components/app-logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <AppLogo className="self-center" />
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle asChild className="font-serif text-xl">
                <h1>Login to your account</h1>
              </CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense>
                <LoginForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
