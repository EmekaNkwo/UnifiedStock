import { RegisterForm } from "@/components/register-form";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to your account",
};

const page = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;
