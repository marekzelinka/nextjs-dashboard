import { GlobeAltIcon } from "@heroicons/react/24/outline";

export function AppLogo() {
  return (
    <div className="flex flex-row items-center font-serif text-white leading-none">
      <GlobeAltIcon className="size-12 rotate-15" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
