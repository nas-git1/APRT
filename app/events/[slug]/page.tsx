import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllEventSlugs, getEventBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) {
    return { title: "Événement introuvable" };
  }
  return {
    title: event.editionTitle,
    description: `${event.datesText} à ${event.city}.`,
    openGraph: {
      images: [event.posterImagePath]
    }
  };
}

export default async function EventMainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Événements", href: "/events" }, { label: event.editionTitle }]} />

      <section className="section-card overflow-hidden">
        <div className="grid gap-5 p-5 md:grid-cols-[320px_1fr]">
          <div className="relative flex min-h-72 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 p-3">
            <Image src={event.posterImagePath} alt={event.editionTitle} width={640} height={920} className="h-full w-full object-contain" />
          </div>

          <div className="space-y-4">
            {event.identityLine && <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{event.identityLine}</p>}
            <h1 className="text-2xl font-bold leading-tight text-slate-900">{event.editionTitle}</h1>
            <p className="text-sm text-slate-700">{event.datesText}</p>
            <p className="text-sm text-slate-700">
              {event.city}
              {event.venue ? ` • ${event.venue}` : ""}
            </p>

            <div className="flex flex-wrap gap-2">
              <Link href={`/events/${event.slug}/programme`} className="btn-brand">
                Programme
              </Link>
              <Link href={`/events/${event.slug}/intervenants`} className="btn-outline">
                Intervenants
              </Link>
              <Link href={`/events/${event.slug}/eposters`} className="btn-outline">
                E-posters
              </Link>
              {event.sections.presidentMessage && (
                <Link href={`/events/${event.slug}/mot-du-president`} className="btn-outline">
                  Mot du Président
                </Link>
              )}
              <button type="button" className="btn-outline" disabled>
                Replay (Bientôt)
              </button>
              <button type="button" className="btn-outline" disabled>
                Live (Bientôt)
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-card p-5">
        <h2 className="text-lg font-semibold text-slate-900">Thématiques</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {event.themes.map((theme) => (
            <li key={theme} className="rounded-md border border-brand-100 bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700">
              {theme}
            </li>
          ))}
        </ul>
      </section>

      {(event.prizes || event.submissionDeadline || event.email) && (
        <section className="section-card p-5">
          <h2 className="text-lg font-semibold text-slate-900">Informations importantes</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            {event.prizes && (
              <p>
                <span className="font-semibold">Prix:</span> 1er prix {event.prizes.first} • 2ème prix {event.prizes.second}
              </p>
            )}
            {event.submissionDeadline && (
              <p>
                <span className="font-semibold">Date limite de soumission:</span> {event.submissionDeadline}
              </p>
            )}
            {event.email && (
              <p>
                <span className="font-semibold">Email:</span> {event.email}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
