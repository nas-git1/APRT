import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EventCard } from "@/components/EventCard";
import { MobileCarousel } from "@/components/MobileCarousel";
import { getEventsIndex } from "@/lib/content";

const PAGE_SIZE = 6;

export const metadata: Metadata = {
  title: "Événements",
  description: "Liste des événements APRT à venir et passés."
};

type SearchParams = Promise<{
  filter?: string;
  page?: string;
}>;

function pageHref(filter: string, page: number) {
  return `/events?filter=${filter}&page=${page}`;
}

export default async function EventsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const filter = searchParams.filter === "past" ? "past" : "upcoming";
  const page = Number(searchParams.page ?? "1");
  const currentPage = Number.isNaN(page) || page < 1 ? 1 : page;

  const allEvents = await getEventsIndex();
  const filtered = allEvents.filter((event) => event.status === filter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = currentPage > totalPages ? totalPages : currentPage;
  const start = (safePage - 1) * PAGE_SIZE;
  const currentEvents = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="container-site space-y-6">
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "Événements" }]} />
      <div className="section-card p-5">
        <h1 className="text-2xl font-bold text-slate-900">Tous les événements</h1>
        <p className="mt-1 text-sm text-slate-600">Filtrer les éditions à venir et les archives.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={pageHref("upcoming", 1)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              filter === "upcoming" ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
          >
            À venir
          </Link>
          <Link
            href={pageHref("past", 1)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              filter === "past" ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
          >
            Passés
          </Link>
        </div>
      </div>

      <div className="section-card p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-800">Archives et éditions</p>
        <p className="mt-1">Chaque édition dispose de pages dédiées: programme, intervenants, e-posters et documents utiles.</p>
      </div>

      {currentEvents.length === 0 ? (
        <div className="section-card p-6">
          <p className="text-sm text-slate-600">Aucun événement pour ce filtre.</p>
        </div>
      ) : (
        <>
          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {currentEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
          <MobileCarousel
            label="Liste des événements APRT"
            items={currentEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          />
        </>
      )}

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
            <Link
              key={num}
              href={pageHref(filter, num)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold ${
                num === safePage ? "bg-brand-500 text-white" : "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50"
              }`}
            >
              {num}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
