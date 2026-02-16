import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://aprt.local"),
  title: {
    default: "APRT | Journées Scientifiques",
    template: "%s | APRT"
  },
  description: "Site officiel des événements APRT, journées scientifiques annuelles.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png"
  },
  openGraph: {
    title: "APRT | Journées Scientifiques",
    description: "Informations, programme, intervenants et e-posters des journées APRT.",
    images: ["/og-image.jpg"],
    locale: "fr_FR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SiteHeader />
        <main className="py-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
