import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/auth-options";
import { redirect } from "next/navigation";
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

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  return <>{children}</>;
}
