"use client";

import { useState } from "react";
import type { ProgrammeDay } from "@/lib/types";

export function ProgrammeTabs({ days }: { days: ProgrammeDay[] }) {
  const [active, setActive] = useState(days[0]?.key);
  const current = days.find((day) => day.key === active) ?? days[0];

  if (!current) {
    return <p className="text-sm text-slate-600">Programme bientôt disponible.</p>;
  }

  return (
    <section className="space-y-4">
      <div className="section-card flex flex-wrap gap-2 p-2">
        {days.map((day) => (
          <button
            key={day.key}
            type="button"
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              day.key === current.key ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
            onClick={() => setActive(day.key)}
          >
            {day.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {current.sessions.map((session) => (
          <article key={`${session.title}-${session.time ?? ""}`} className="section-card p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-slate-900">{session.title}</h3>
              {session.time && <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{session.time}</span>}
            </div>

            {session.talks && session.talks.length > 0 && (
              <ul className="space-y-2 text-sm text-slate-700">
                {session.talks.map((talk) => (
                  <li key={`${talk.speaker ?? ""}-${talk.title}-${talk.time ?? ""}`} className="rounded-md border border-brand-100 p-3">
                    <p className="font-semibold text-slate-800">{talk.speaker ? `${talk.speaker} — ${talk.title}` : talk.title}</p>
                    {talk.time && <p className="mt-1 text-xs text-slate-500">{talk.time}</p>}
                  </li>
                ))}
              </ul>
            )}

            {session.moderators && session.moderators.length > 0 && (
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-700">Modérateurs:</span> {session.moderators.join(", ")}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
