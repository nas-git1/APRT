import Image from "next/image";
import Link from "next/link";
import type { EventIndexItem } from "@/lib/types";

export function EventCard({ event, showImage = true }: { event: EventIndexItem; showImage?: boolean }) {
  return (
    <article className="section-card overflow-hidden">
      {showImage && (
        <div className="relative aspect-[4/5] w-full bg-brand-50">
          <Image
            src={event.posterImagePath}
            alt={event.editionTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="space-y-3 p-4">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            event.status === "upcoming" ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-700"
          }`}
        >
          {event.status === "upcoming" ? "À venir" : "Passé"}
        </span>
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{event.editionTitle}</h3>
        <p className="text-sm text-slate-600">{event.datesText}</p>
        <p className="text-sm text-slate-600">{event.venue ? `${event.city} • ${event.venue}` : event.city}</p>
        <Link href={`/events/${event.slug}`} className="btn-outline w-full">
          Voir les détails
        </Link>
      </div>
    </article>
  );
}
