import { PowerIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { signOut } from "@/features/auth/actions/sign-out";

export function NavUser() {
  return (
    <Form action={signOut}>
      <button
        type="submit"
        className="flex h-12 w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 font-medium text-sm hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </Form>
  );
}
