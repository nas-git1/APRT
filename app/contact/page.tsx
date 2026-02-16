import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact",
  description: "Coordonnées de contact APRT."
};

export default function ContactPage() {
  return (
    <div className="container-site space-y-5">
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />
      <div className="section-card p-6">
        <h1 className="text-2xl font-bold text-slate-900">Contact</h1>
        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <p>
            <span className="font-semibold">Email:</span> aprtassociation.1995@gmail.com
          </p>
          <p>
            <span className="font-semibold">Téléphone:</span> 0661264254
          </p>
          <p>
            <span className="font-semibold">Ville:</span> Marrakech
          </p>
          <p>
            <span className="font-semibold">Association:</span> APRT
          </p>
        </div>
      </div>
    </div>
  );
}
