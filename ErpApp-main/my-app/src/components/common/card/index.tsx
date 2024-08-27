import React from "react";
import { Card as CardNextUi, CardFooter, Image, Button, CardHeader } from "@nextui-org/react";

type PropsType = {
totalItems:number;
title:string;
} 

export default function Card(props:PropsType) {
  const {totalItems,title} = props;
    return (
    <CardNextUi  isFooterBlurred radius="lg" className="relative flex items-center text-white font-semibold overflow-visible justify-center border-none bg-blue-500 w-4/12 h-48">
      <h1 className="absolute bg-white w-12 py-2 text-center rounded-xl text-blue-800 text-3xl -top-4" >{totalItems}</h1>
      <h2 className="text-xl">{title}</h2>
    </CardNextUi>
  );
}
