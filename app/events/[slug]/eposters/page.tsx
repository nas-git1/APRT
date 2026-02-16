import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EposterSearch } from "@/components/EposterSearch";
import { getEventBySlug } from "@/lib/content";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return { title: event ? `E-posters | ${event.editionTitle}` : "E-posters | APRT" };
}

export default async function EpostersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const posters = event.sections.eposters ?? [];

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Événements", href: "/events" },
          { label: event.editionTitle, href: `/events/${event.slug}` },
          { label: "E-posters" }
        ]}
      />
      <div className="section-card p-5">
        <h1 className="text-2xl font-bold text-slate-900">E-posters</h1>
        <p className="mt-1 text-sm text-slate-600">{event.editionTitle}</p>
      </div>
      <EposterSearch posters={posters} />
    </div>
  );
}
