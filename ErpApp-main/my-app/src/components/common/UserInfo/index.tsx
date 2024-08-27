import React from "react";
import {User} from "@nextui-org/react";

export default function UserInfo() {
  return (
    <User   
      name="Jane Doe"
      className="h-16"
      description="Product Designer"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
    />
  );
}
