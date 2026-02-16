"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type CountdownProps = {
  targetISO: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
};

function computeTimeLeft(targetISO: string): TimeLeft {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, ended: false };
}

export function Countdown({ targetISO }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(targetISO));
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(computeTimeLeft(targetISO));
      setPulse(true);
      setTimeout(() => setPulse(false), 240);
    }, 1000);
    return () => clearInterval(timer);
  }, [targetISO]);

  const blocks = useMemo(
    () => [
      { label: "Days", fr: "Jours", value: timeLeft.days },
      { label: "Hours", fr: "Heures", value: timeLeft.hours },
      { label: "Minutes", fr: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", fr: "Secondes", value: timeLeft.seconds }
    ],
    [timeLeft]
  );

  if (timeLeft.ended) {
    return (
      <div className="rounded-xl bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_30px_rgba(237,121,147,0.45)]">
        L&apos;événement a commencé
      </div>
    );
  }

  return (
    <section
      className={`relative overflow-hidden rounded-xl p-5 text-white transition ${
        pulse ? "shadow-[0_0_40px_rgba(237,121,147,0.45)]" : "shadow-[0_14px_35px_rgba(237,121,147,0.3)]"
      }`}
    >
      <div className="absolute inset-0">
        <Image src="/assets/img/hero-area.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-700/50 to-brand-500/55" />
      <p className="relative text-center text-sm italic text-white/90">Du 08 au 10 Mai 2026 - Marrakech, Maroc</p>

      <div className="relative mt-3 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
        {blocks.map((item, idx) => (
          <div key={item.fr} className="text-center">
            <p className="text-5xl font-extrabold leading-none tracking-tight md:text-6xl">{String(item.value).padStart(2, "0")}</p>
            <p className="mt-2 text-base font-semibold text-white/95">{item.fr}</p>
          </div>
        )).flatMap((node, idx) =>
          idx < blocks.length - 1
            ? [
                node,
                <div key={`sep-${idx}`} className="hidden text-5xl font-black text-white/85 sm:block">
                  :
                </div>
              ]
            : [node]
        )}
      </div>
    </section>
  );
}
