import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReduxProvider from "./reduxProvider";

import { ToastContainer } from "react-toastify";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "BetinExchange Backoffice",
  description: "Professional backoffice management system for betting exchange platform",
  keywords: ["betting", "exchange", "backoffice", "admin", "management"],
  authors: [{ name: "Your Company Name" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <html lang="en"  className={inter.variable}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover theme="light" />
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
