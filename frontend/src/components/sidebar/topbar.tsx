"use client";
import React from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { BellDot, PanelLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";

import { ThemeSwitch } from "./theme-switcher";

import { DropdownMenuAction, ProfileAvatar } from "@/shared/custom-ui";
import { Button } from "../ui/button";
import useGetTenant from "@/hooks/use-get-tenant";

const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const { tenant } = useGetTenant();
  const router = useRouter();

  //   const pathNameFunc = () => {};
  return (
    <header className="flex sticky  z-50 top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 justify-between w-full">
      <div className="flex items-center gap-3">
        <PanelLeft cursor="pointer" onClick={toggleSidebar} />
        <Label className="text-[1.2rem] font-medium capitalize">{tenant}</Label>
      </div>
      {/* //Implement to get title of each page here */}
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        <Button variant="outline">
          <BellDot />
        </Button>
        <DropdownMenuAction
          trigger={<ProfileAvatar name={`John Doe`} size="xs" />}
          items={[
            {
              label: "Profile",
              onClick: () => {
                router.push("/profile");
              },
            },
            {
              label: "",
              type: "separator",
            },
            {
              label: "Log out",
              onClick: () => {
                // dispatch(logOut());
                redirect("/login");
              },
            },
          ]}
        />
      </div>
    </header>
  );
};

export default Topbar;
