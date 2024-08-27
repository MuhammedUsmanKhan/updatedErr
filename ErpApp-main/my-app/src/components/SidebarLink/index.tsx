import React from "react";
import { Link } from "@nextui-org/react";
type PropsType = {
  title: string;
  href: string;
  icon: React.ReactElement
};
export default function SidebarLink(props: PropsType) {
  const { title, href, icon } = props;
  return (
    <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-blue-400 w-full">
      {icon}
      <Link href={href} className="text-white">
        {title}
      </Link>
    </div>
  );
}
