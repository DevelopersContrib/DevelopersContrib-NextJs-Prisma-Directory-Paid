import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { Toaster } from "sonner";
import { getDomain, getData } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const domain = getDomain();
  const c = await getData();

  return {
    title: c.data.title,
    description: c.data.description,
  };
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={` bg-primary`}>
        <Toaster position="top-center" richColors />

        <main className="w-full h-screen grid place-items-center">
          {children}
        </main>
      </div>
    </>
  );
}
