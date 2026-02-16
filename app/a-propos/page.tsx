import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "À propos de nous",
  description: "Mission, historique et objectifs de l'association APRT."
};

export default function AproposPage() {
  return (
    <div className="container-site space-y-5">
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "À propos de nous" }]} />

      <section className="section-card p-6">
        <h1 className="text-2xl font-bold text-slate-900">À propos de nous</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          L&apos;A.P.R.T. a un objectif scientifique, culturel et social. Depuis sa création en 1995, elle vise à la
          promotion et au développement de la pédiatrie et de la chirurgie pédiatrique et des spécialités qui
          s&apos;y rattachent au niveau de Marrakech et régions.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="section-card p-5">
          <h2 className="text-lg font-semibold text-slate-900">Mission</h2>
          <p className="mt-2 text-sm text-slate-700">
            Renforcer la qualité des soins pédiatriques via la formation continue, les échanges scientifiques et la
            collaboration multidisciplinaire.
          </p>
        </article>
        <article className="section-card p-5">
          <h2 className="text-lg font-semibold text-slate-900">Historique (1995)</h2>
          <p className="mt-2 text-sm text-slate-700">
            Depuis 1995, l&apos;APRT structure des rendez-vous académiques annuels et développe un réseau médical
            régional engagé.
          </p>
        </article>
        <article className="section-card p-5">
          <h2 className="text-lg font-semibold text-slate-900">Objectifs</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>Promotion de la pédiatrie et de la chirurgie pédiatrique.</li>
            <li>Diffusion des bonnes pratiques cliniques.</li>
            <li>Encouragement de la recherche et des communications scientifiques.</li>
          </ul>
        </article>
        <article className="section-card p-5">
          <h2 className="text-lg font-semibold text-slate-900">Contact APRT</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>Email: aprtassociation.1995@gmail.com</li>
            <li>Dr Moulay Abdelaziz Katif: 0661264254</li>
            <li>Dr Fatiha Bennaoui: 0664848734</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
