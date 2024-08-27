"use client";

import React, { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
export const AuthRightContainer = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");


  const router = useRouter()

  // Email validation
  const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  // // Password validation (simple example)
  // const validatePassword = (password: string) => {
  //   return password.length >= 6; // Minimum length requirement
  // };

  // Determine validation errors
  const emailIsValid = validateEmail(emailValue);
  // const passwordIsValid = false;

  // Handle form submission
  const handleSubmit = () => {
    if (emailIsValid && passwordValue !== "") {
      // console.log("move to home");
      router.push('/dashboard')
    }
  };
  return (
    <div className="flex justify-center items-center h-full w-1/2 ">
      <div className="flex flex-col space-y-5 w-3/4">
        <div>
          <h1 className="text-center text-2xl">Welcome to ......</h1>
          <h2 className="text-center text-lg">.................</h2>
        </div>
        <div className="flex flex-col justify-center items-center space-y-3">
          <Input
            value={emailValue}
            onValueChange={setEmailValue}
            isInvalid={!emailIsValid && emailValue !== ""}
            // emailValue={emailValue}
            // setEmailValue={setEmailValue}
            errorMessage={"Please enter an valid email"}
            title=""
            type="email"
          />
          <Input
            value={passwordValue}
            onValueChange={setPasswordValue}
            // isInvalid={passwordValue == ""}
            // passwordValue={passwordValue}
            // setPasswordValue={setPasswordValue}
            errorMessage={"heeeeehe"}
            title=""
            type="password"
          />
          <Button className="min-w-full" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
