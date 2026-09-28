import type { Metadata } from "next";
import { Anton, Montserrat } from "next/font/google";
import { BrandBar } from "@/components/BrandBar";
import { Header } from "@/components/Header";
import { PaperPage } from "@/components/PaperPage";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const body = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="h-dvh overflow-hidden bg-cream font-body text-ink">
        <Providers>
          <PaperPage>
            <Header />
            <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
              {children}
            </main>
            <BrandBar />
          </PaperPage>
        </Providers>
      </body>
    </html>
  );
}
