import Form from "@/components/auth/register/form";
import { authOptions } from "@/lib/utils/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div className="p-8 rounded-1 bg-white shadow flex flex-col space-y-4 w-[400px]">
      <h1 className="font-sans text-4xl font-semibold text-center text-primary">
        Register
      </h1>
      <Form />
    </div>
  );
};

export default Page;
