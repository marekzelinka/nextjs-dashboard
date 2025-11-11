import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function PageHeading({ title }: { title: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-medium font-serif text-base">{title}</h1>
        {/*<Breadcrumb>
             <BreadcrumbList>
               <BreadcrumbItem>
                 <BreadcrumbPage className="line-clamp-1">
                   Project Management & Task Tracking
                 </BreadcrumbPage>
               </BreadcrumbItem>
             </BreadcrumbList>
           </Breadcrumb>*/}
      </div>
    </header>
  );
}
