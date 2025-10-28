import React from "react";
import { Loginform } from "./-Component/Loginform";

export default function Login() {
  return (
    <>
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <Loginform />
      </div>
    </>
  );
}
