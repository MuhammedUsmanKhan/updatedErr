import React from "react";
import UserInfo from "@/components/common/UserInfo";
import SidebarLink from "@/components/SidebarLink";
import { MdOutlineInventory } from "react-icons/md";
import { GiMedicalPackAlt } from "react-icons/gi";

export const Sidebar = () => {
  const SidebarButtonsArray = [
    {
      id: 1,
      icon: <GiMedicalPackAlt />,
      title: "Medical",
      href: "/dashboard/medical",
    },
    {
      id: 1,
      icon: <MdOutlineInventory />,
      title: "Inventory",
      href: "/dashboard/inventory",
    },
  ];
  return (
    <div className="flex flex-col min-w-64 w-64">
      {/* //logo */}
      <div className="flex justify-center items-center h-16 w-full">hehe</div>
      {/* image name */}
      <UserInfo />
      <div className="flex flex-col p-4 space-y-4 items-center max-h-full h-full overflow-auto ">
        {SidebarButtonsArray.map((element) => {
          return (
            <SidebarLink
              key={element.id}
              icon={element.icon}
              title={element.title}
              href={element.href}
            />
          );
        })}
      </div>
    </div>
  );
};
