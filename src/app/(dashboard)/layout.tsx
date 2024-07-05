import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "@/components/navbar/Navbar";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "smile - Admin Dashboard",
    description: "Admin dashboard to manage smile's data",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ToasterProvider />
                    <div className="flex max-lg:flex-col text-grey-1">
                        <Navbar />
                        <div className="flex-1">{children}</div>
                    </div>
                </body>
            </html>
        </ClerkProvider>
    );
}
