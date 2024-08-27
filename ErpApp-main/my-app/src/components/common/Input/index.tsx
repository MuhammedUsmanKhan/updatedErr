// "use client";

// import React, { useState } from "react";
// import Button from "../Button";
// import { Input as Inp, input } from "@nextui-org/react";

// type PropsType = {
//   type: string;
//   label: string;
// };

// export default function Input(props: PropsType) {
//   const { type, label } = props;

//   const [value, setValue] = useState<string>("");

//   const validateEmail = (value: string) =>
//     value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

//   const isInvalid = React.useMemo(() => {
//     if (value === "") return false;

//     return validateEmail(value) ? false : true;
//   }, [value]);

//   const [isVisible, setIsVisible] = useState(false);

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   return (
//     <Inp
//       value={value}
//       type={type}
//       label={label}
//       // classNames={{
//       //   base:['h-10 min-h-10']
//       // }}
//     // {type === "email" }
//       // color={"danger"}
//       isInvalid={type==='email'&& isInvalid}
//       errorMessage="Please enter a valid email"
//       onValueChange={setValue}
//       // endContent={==============>type = password
//       //   <Button
//       //     className="focus:outline-none"
//       //     onClick={toggleVisibility}
//       //     // startContent={}
//       //     aria-label="toggle password visibility"
//       //   />
//       // }
//       classNames={{}}
//       className="max-w-full max-h-12"
//     />
//   );
// }

// placeholder="Enter your password"
// endContent={
//     {isVisible ? (
//       <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//     ) : (
//       <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
//     )}
// type={isVisible ? "text" : "password"}

"use client";

import React, { forwardRef, ReactNode, useState } from "react";
import { Input as Inp, InputProps } from "@nextui-org/input";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";

type PropsType = {
  isInvalid?: boolean;
  errorMessage: string;
  type: string;
  emailValue?: string;
  setEmailValue?: (value: string) => void; // Update types here
  setPasswordValue?: (value: string) => void; // Update types here
  passwordValue?: string;
  mainWrapper?: string[];
  input?: string[];
  inputWrapper?: string[];
  icon?: string;
  rest?: any;
} & InputProps;

const Input = forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  const {
    type,
    icon,
    errorMessage,
    inputWrapper,
    mainWrapper,
    input,
    emailValue,
    isInvalid,
    setEmailValue,
    passwordValue,
    setPasswordValue,
    ...rest
  } = props;

  // const passwordValue = ''


  // const validatePassword = (value: string) =>
  //   value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const handleValidation = () => {
    return emailValue && passwordValue ? true : false;
  };

  // const isInvalid = React.useMemo(() => {
  //   console.log({ p: passwordValue, e: emailValue });
  //   if (emailValue === "" && passwordValue === "") return false;

  //   return validateEmail(emailValue) ? false : true;
  // }, [emailValue,passwordValue]);

  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    // event.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Inp
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        className={`w-full border-none `}
        ref={ref}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        variant="bordered"
        classNames={{
          //wanted to ask somehting on it.
          inputWrapper: [
            twMerge(
              `shadow-none  border-graish border-2 bg-white  h-10 px-4 ${inputWrapper} ${mainWrapper} ${input}`
            ),
          ],
          errorMessage: ["text-red-600"],
          input: ["mx-2"],
        }}
        startContent={
          (type === "email" && <HiOutlineMail className="h-7 w-7" />) ||
          (type === "password" && <MdLockOutline className="h-7 w-7" />)
        }
        endContent={
          type === "password" && (
            <button onClick={handleToggleVisibility}>
              {isVisible ? <FiEye /> : <FiEyeOff />}
            </button>
          )
        }
        // isInvalid

        {...rest}
      />
    </>
  );
});

Input.displayName = "Input"; // Add this line

export default Input;
