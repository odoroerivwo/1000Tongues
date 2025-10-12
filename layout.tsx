import "@/styles/globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "1000t Admin - Dashboard",
  description: "Admin dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F4F7FB] text-slate-800">
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-6 md:p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
