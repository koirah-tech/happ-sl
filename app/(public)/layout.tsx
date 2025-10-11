
import fs from "fs";
import path from "path";

import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

import { Theme } from "@/hooks/themeProvider";
import { Navigation } from "@/components/common/navigation";
import Footer from "@/components/common/footer";
import Divider from "@/components/ui/divider";


const inter = localFont({
    src: "../fonts/InterVF.ttf",
    variable: "--font-inter",
    weight: "100, 200, 300, 400, 500, 600, 700, 800, 900",
});

const montserrat = localFont({
    src: "../fonts/MontserratVF.ttf",
    variable: "--font-montserrat",
    weight: "100, 200, 300, 400, 500, 600, 700, 800, 900",
});


export const metadata: Metadata = {
  title: "HAPP-SL | Housemanship & PIN Portal - MoHS",
  description: "A Ministry of Health & Sanitation initiative to provide a transparent, efficient, and timely process for all medical, nursing, and midwifery graduates in Sierra Leone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // loading generated sprite svg at build time
  const spritePath = fs.readFileSync(
    path.join(process.cwd(), "public/icons/sprite.svg"),"utf8"
  )

  return (
    <html lang="en" suppressContentEditableWarning={true}>
      <body
        className={`${montserrat.className} ${inter.className} font-sans antialiased`}
      >

    <Theme>
      <Navigation />

      <div
        className="hidden"
        dangerouslySetInnerHTML={{ __html: spritePath }}
      />

      <main>
          {children}
      </main>

      <Divider className="mt-5 md:mt-15"/>
      <Footer />
    </Theme>

    </body>
    </html>
  );
}
