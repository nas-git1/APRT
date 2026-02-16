import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { EventCard } from "@/components/EventCard";
import { MobileCarousel } from "@/components/MobileCarousel";
import { getEventBySlug, getEventsIndex, getFeaturedEvent, getGalleryItems, getNewsItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Accueil",
  description: "Accueil APRT: événement principal, actualités et archives.",
  openGraph: {
    images: ["/og-image.jpg"]
  }
};

function excerptFromPresidentMessage(message: string) {
  return message.replace(/\s+/g, " ").trim();
}

export default async function HomePage() {
  const featured = await getFeaturedEvent();
  const index = await getEventsIndex();
  const news = await getNewsItems();
  const gallery = await getGalleryItems();
  const event2025 = await getEventBySlug("aprt-2025");
  const pastEvents = index.filter((event) => event.status === "past");

  if (!featured) {
    return (
      <div className="container-site">
        <p className="text-sm text-slate-600">Aucun événement disponible.</p>
      </div>
    );
  }

  const quickLinks = [
    { label: "Programme", href: `/events/${featured.slug}/programme` },
    { label: "Intervenants", href: `/events/${featured.slug}/intervenants` },
    { label: "E-posters", href: `/events/${featured.slug}/eposters` },
    { label: "Attestation", href: "#" },
    { label: "Replay", href: "#" },
    { label: "Live", href: "#" }
  ];

  const presidentExcerpt = event2025?.sections.presidentMessage?.content
    ? excerptFromPresidentMessage(event2025.sections.presidentMessage.content)
    : "Message du président bientôt disponible.";

  return (
    <div className="container-site space-y-10">
      <section className="section-card overflow-hidden">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_1fr] lg:p-8">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">Événement principal APRT</p>
            <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{featured.editionTitle}</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-700">
              Organisées par l&apos;Association des Pédiatres de la Région du Tensift (APRT), ces journées réuniront
              des experts autour de thématiques essentielles de la pédiatrie moderne.
            </p>
            <p className="text-sm text-slate-600">
              {featured.datesText} • {featured.city}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href={`/events/${featured.slug}`} className="btn-brand">
                Voir l&apos;événement
              </Link>
              <Link href={`/events/${featured.slug}/programme`} className="btn-outline">
                Consulter le programme
              </Link>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-md border border-brand-100 bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
                >
                  {link.label}
                  {link.href === "#" && " (Bientôt disponible)"}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative flex min-h-72 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 p-4">
              <Image
                src={featured.posterImagePath}
                alt={featured.editionTitle}
                width={620}
                height={860}
                priority
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Countdown targetISO="2026-05-08T00:00:00+01:00" />
      </section>

      <section className="section-card p-6">
        <div className="grid items-center gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-900">Présentation APRT</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              L&apos;A.P.R.T. a un objectif scientifique, culturel et social. Depuis sa création en 1995, elle vise à la
              promotion et au développement de la pédiatrie et de la chirurgie pédiatrique et des spécialités qui s&apos;y
              rattachent au niveau de Marrakech et régions.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <Link href="/contact" className="btn-brand">
                Nous contacter
              </Link>
              <Link href="/a-propos" className="btn-outline">
                En savoir plus
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[280px] overflow-hidden rounded-xl border border-brand-100 bg-brand-50">
            <Image src="/assets/img/img1.png" alt="Visuel APRT" width={420} height={420} className="h-auto w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="section-card h-full p-5">
          <h2 className="text-xl font-bold text-slate-900">À la une / Dernières actualités</h2>
          <div className="mt-4 space-y-3">
            {news.map((item) => (
              <article key={item.id} className="rounded-md border border-brand-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{new Date(item.date).toLocaleDateString("fr-FR")}</p>
                <h3 className="mt-1 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.excerpt}</p>
                <Link href={item.href} className="mt-2 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800">
                  Lire la suite
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="section-card flex h-full flex-col p-5">
          <h2 className="text-xl font-bold text-slate-900">Mot du Président</h2>
          <div className="mt-3 max-h-[560px] grow overflow-y-auto pr-2">
            <p className="text-sm leading-8 text-slate-700">{presidentExcerpt}</p>
          </div>
          <Link href="/events/aprt-2025/mot-du-president" className="btn-outline mt-4 w-fit">
            Explorer plus
          </Link>
        </div>
      </section>

      <section className="section-card p-5">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">Galerie</h2>
          <Link href="/galerie" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Voir toute la galerie
          </Link>
        </div>
        <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-6">
          {gallery.slice(0, 6).map((item) => (
            <article key={item.id} className="overflow-hidden rounded-md border border-brand-100 bg-brand-50">
              <div className="relative aspect-square">
                <Image src={item.imagePath} alt={item.title} fill className="object-cover" />
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4">
          <MobileCarousel
            label="Galerie APRT"
            itemWidthClassName="w-[78%]"
            items={gallery.slice(0, 6).map((item) => (
              <article key={item.id} className="overflow-hidden rounded-md border border-brand-100 bg-brand-50">
                <div className="relative aspect-square">
                  <Image src={item.imagePath} alt={item.title} fill className="object-cover" />
                </div>
              </article>
            ))}
          />
        </div>
        <div className="mt-4">
          <Link href="/galerie" className="btn-outline">
            Voir toute la galerie
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">Événements passés</h2>
          <Link href="/events?filter=past" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Voir les archives
          </Link>
        </div>
        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
        <MobileCarousel
          label="Événements passés APRT"
          items={pastEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        />
      </section>
    </div>
  );
}
