import Link from "next/link";
import type { EventData } from "@/lib/types";

export function EventSidebar({ event }: { event: EventData }) {
  const links = [
    { href: `/events/${event.slug}`, label: "Présentation" },
    { href: `/events/${event.slug}/programme`, label: "Programme" },
    { href: `/events/${event.slug}/intervenants`, label: "Intervenants" },
    { href: `/events/${event.slug}/eposters`, label: "E-posters" }
  ];
  if (event.sections.presidentMessage) {
    links.push({ href: `/events/${event.slug}/mot-du-president`, label: "Mot du Président" });
  }

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <div className="section-card p-4">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700">Sections</h3>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block rounded-md px-3 py-2 text-sm text-slate-700 transition hover:bg-brand-50 hover:text-brand-700">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="section-card p-4">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">Contacts</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {event.contacts.map((contact) => (
            <li key={contact.phone}>
              <p className="font-medium">{contact.name}</p>
              <p>{contact.phone}</p>
            </li>
          ))}
        </ul>
      </div>

      {event.sections.practicalInfo && event.sections.practicalInfo.length > 0 && (
        <div className="section-card p-4">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">Infos pratiques</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {event.sections.practicalInfo.map((row) => (
              <li key={row.title}>
                <span className="font-semibold">{row.title}: </span>
                <span>{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {event.sections.documents && event.sections.documents.length > 0 && (
        <div className="section-card p-4">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">Documents</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {event.sections.documents.map((doc) => (
              <li key={doc.label}>
                <a href={doc.href} className="hover:text-brand-700">
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {event.sections.usefulLinks && event.sections.usefulLinks.length > 0 && (
        <div className="section-card p-4">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-700">Liens utiles</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {event.sections.usefulLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-brand-700">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
