import React from "react";
import { Button as Btn } from "@nextui-org/react";

type PropsType = {
  onClick: () => void;
  className: string;
};

export default function Button(props: PropsType) {
  const { className, onClick } = props;

  return (
    <Btn onClick={onClick} color="primary" className={className}>
      Button
    </Btn>
  );
}
