import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MobileCarousel } from "@/components/MobileCarousel";
import { getGalleryItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Galerie photo des événements APRT."
};

export default async function GaleriePage() {
  const items = await getGalleryItems();
  return (
    <div className="container-site space-y-5">
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Galerie" }]} />
      <section className="section-card p-5">
        <h1 className="text-2xl font-bold text-slate-900">Galerie</h1>
        <p className="mt-1 text-sm text-slate-600">Sélection visuelle des éditions APRT.</p>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Essaouira</h2>
        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="section-card overflow-hidden">
              <div className="relative aspect-[4/3] bg-brand-50">
                <Image src={item.imagePath} alt={item.title} fill className="object-cover" />
              </div>
            </article>
          ))}
        </div>
        <MobileCarousel
          label="Galerie Essaouira"
          itemWidthClassName="w-[82%]"
          items={items.map((item) => (
            <article key={item.id} className="section-card overflow-hidden">
              <div className="relative aspect-[4/3] bg-brand-50">
                <Image src={item.imagePath} alt={item.title} fill className="object-cover" />
              </div>
            </article>
          ))}
        />
      </section>
    </div>
  );
}
