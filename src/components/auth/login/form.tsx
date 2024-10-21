"use client";

import React, { useState } from "react";
import Link from "next/link";
import { loginSchema } from "@/validations/auth.validation";
import { SignInResponse, signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

// Define Errors type with an index signature
type Errors = {
  [key: string]: string | undefined;
} | null;

const Form = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>(null);
  const [isMutation, setIsMutation] = useState<boolean>(false);

  const clientAction = async (formData: FormData) => {
    if (isMutation) return; // Prevent multiple submissions
    setIsMutation(true);

    try {
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const validations = loginSchema.safeParse(data);
      if (!validations.success) {
        const newErrors: Errors = {};
        validations.error.issues.forEach((issue) => {
          // Using type assertion for dynamic keys
          newErrors[issue.path[0] as string] = issue.message;
        });

        setErrors(newErrors);
        return;
      }

      setErrors(null); // Clear previous errors if any

      const res: SignInResponse | undefined = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error === "CredentialsSignin") {
        setErrors({
          email: "Wrong email or password",
          password: "Wrong email or password",
        });
      } else if (res && res.ok && res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("[ERROR_CLIENT_ACTION]", error);
      toast.error("Something went wrong");
    } finally {
      setIsMutation(false); // Reset loading state after completion
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        clientAction(formData);
      }}
      className="flex flex-col gap-y-5"
    >
      {/* Email */}
      <div className="flex flex-col gap-y-1">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          autoFocus
          className={`input ${errors?.email ? "input-error" : ""}`}
        />
        {errors?.email && (
          <p className="text-red-500 font-sans">{errors?.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-y-1">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          className={`input ${errors?.password ? "input-error" : ""}`}
        />
        {errors?.password && (
          <p className="text-red-500 font-sans">{errors?.password}</p>
        )}
      </div>

      {/* Redirect To Register Page */}
      <p className="text-primary font-sans">
        You don't have an account yet?{" "}
        <Link
          href="/auth/register"
          className="text-indigo-600 underline hover:text-indigo-600/90"
        >
          Register now!
        </Link>
      </p>

      {/* Button Submit */}
      <button
        type="submit"
        className={`btn btn-primary ${isMutation ? "opacity-50" : ""}`}
        disabled={isMutation}
      >
        {isMutation ? (
          <>
            <CgSpinner className="animate-spin w-8 h-8" />
            Loading
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default Form;
