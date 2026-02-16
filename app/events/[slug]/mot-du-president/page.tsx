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
  return { title: event ? `Mot du Président | ${event.editionTitle}` : "Mot du Président | APRT" };
}

export default async function MotDuPresidentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event || !event.sections.presidentMessage) notFound();

  const message = event.sections.presidentMessage;

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Événements", href: "/events" },
          { label: event.editionTitle, href: `/events/${event.slug}` },
          { label: "Mot du Président" }
        ]}
      />
      <div className="section-card p-5">
        <h1 className="text-2xl font-bold text-slate-900">Mot du Président</h1>
        <p className="mt-1 text-sm text-slate-600">{event.editionTitle}</p>
      </div>

      <article className="section-card p-5">
        <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{message.content}</p>
        <p className="mt-4 text-sm font-semibold text-brand-700">{message.signature}</p>
      </article>
    </div>
  );
}
