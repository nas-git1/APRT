"use client";

import { useMemo, useState } from "react";

type Eposter = {
  title: string;
  language?: string;
  tags?: string[];
};

const PAGE_SIZE = 6;

export function EposterSearch({ posters }: { posters: Eposter[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("Tous");
  const [page, setPage] = useState(1);

  const tags = useMemo(() => {
    const set = new Set<string>();
    posters.forEach((poster) => (poster.tags ?? []).forEach((tag) => set.add(tag)));
    return ["Tous", ...Array.from(set)];
  }, [posters]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posters.filter((poster) => {
      const queryMatch = !normalized || poster.title.toLowerCase().includes(normalized);
      const tagMatch = activeTag === "Tous" || (poster.tags ?? []).includes(activeTag);
      return queryMatch && tagMatch;
    });
  }, [posters, query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = page > totalPages ? totalPages : page;
  const start = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  return (
    <section className="space-y-4">
      <div className="section-card p-4">
        <label htmlFor="recherche-eposters" className="mb-2 block text-sm font-medium text-slate-700">
          Rechercher un e-poster
        </label>
        <input
          id="recherche-eposters"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Tapez un titre..."
          className="w-full rounded-md border border-brand-200 bg-white px-3 py-2 text-sm outline-none ring-brand-300 transition focus:ring"
        />
        {tags.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setActiveTag(tag);
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  activeTag === tag ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="section-card p-4">
        <p className="mb-3 text-sm text-slate-600">{filtered.length} résultat(s)</p>
        <ul className="space-y-2">
          {pageItems.map((poster) => (
            <li key={poster.title} className="rounded-md border border-brand-100 p-3">
              <p className="text-sm font-medium text-slate-800">{poster.title}</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {poster.language && <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs text-brand-700">{poster.language}</span>}
                {(poster.tags ?? []).map((tag) => (
                  <span key={`${poster.title}-${tag}`} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold ${
                n === safePage ? "bg-brand-500 text-white" : "border border-brand-200 bg-white text-brand-700"
              }`}
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </section>
  );
}
