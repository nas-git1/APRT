import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProgrammeTabs } from "@/components/ProgrammeTabs";
import { getEventBySlug } from "@/lib/content";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Programme | APRT" };
  return { title: `Programme | ${event.editionTitle}` };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Événements", href: "/events" },
          { label: event.editionTitle, href: `/events/${event.slug}` },
          { label: "Programme" }
        ]}
      />
      <div className="section-card p-5">
        <h1 className="text-2xl font-bold text-slate-900">Programme</h1>
        <p className="mt-1 text-sm text-slate-600">{event.editionTitle}</p>
      </div>

      {event.sections.programme ? (
        <ProgrammeTabs days={event.sections.programme.days} />
      ) : (
        <div className="section-card p-5">
          <p className="text-sm text-slate-600">Programme en cours de préparation.</p>
        </div>
      )}
    </div>
  );
}
