import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-providers";
import { ClerkProvider } from '@clerk/nextjs'
import ModalProvider from "@/providers/modal-providers";
import { Toaster } from "@/components/ui/sonner"

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fuzzie",
  description: "Automate yout app using Fuzzie",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={font.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
           <ModalProvider>{children}</ModalProvider> 
           <Toaster />
          </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
