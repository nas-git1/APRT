import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getEventBySlug } from "@/lib/content";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return { title: event ? `Intervenants | ${event.editionTitle}` : "Intervenants | APRT" };
}

export default async function IntervenantsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const speakers = event.sections.speakers ?? [];
  const deduped = speakers.filter((speaker, idx) => speakers.findIndex((it) => it.name === speaker.name) === idx);

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Événements", href: "/events" },
          { label: event.editionTitle, href: `/events/${event.slug}` },
          { label: "Intervenants" }
        ]}
      />
      <div className="section-card p-5">
        <h1 className="text-2xl font-bold text-slate-900">Intervenants</h1>
        <p className="mt-1 text-sm text-slate-600">{event.editionTitle}</p>
      </div>

      <div className="section-card p-5">
        {deduped.length === 0 ? (
          <p className="text-sm text-slate-600">Liste des intervenants bientôt disponible.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {deduped.map((speaker) => (
              <li key={speaker.name} className="rounded-md border border-brand-100 p-3">
                <p className="font-semibold text-slate-800">{speaker.name}</p>
                {speaker.role && <p className="text-sm text-slate-600">{speaker.role}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
