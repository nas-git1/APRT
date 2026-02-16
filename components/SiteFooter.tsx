"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";

const socialLinks = [
  { href: "#", label: "Facebook", icon: FaFacebookF },
  { href: "#", label: "X", icon: FaXTwitter },
  { href: "#", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "#", label: "YouTube", icon: FaYoutube }
];

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#0f0f0f] text-white">
      <div className="container-site py-12 text-center">
        <div className="mx-auto mb-6 grid max-w-5xl items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-slate-200 md:text-left lg:text-xl">
            ASSOCIATION DES PEDIATRES
            <br />
            DE LA REGION TENSIFT
          </p>
          <div className="mx-auto inline-flex rounded-full border border-slate-700 p-3">
            <Image src="/logo.png" alt="Logo APRT" width={74} height={74} className="h-16 w-16 rounded-full object-contain" />
          </div>
          <p className="text-center text-base font-semibold text-slate-200 md:text-right lg:text-2xl">
            جمعية أطباء الأطفال
            <br />
            بجهة تانسيفت
          </p>
        </div>

        <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-300">
          L&apos;A.P.R.T. a un objectif scientifique, culturel et social. Depuis sa création en 1995, elle vise à la
          promotion et au développement de la pédiatrie et de la chirurgie pédiatrique et des spécialités qui s&apos;y
          rattachent au niveau de Marrakech et régions.
        </p>

        <div className="mx-auto mt-5 max-w-5xl text-sm text-slate-300">
          <p className="inline-flex items-center gap-2">
            <FiMail className="text-brand-400" />
            <Link href="mailto:aprtassociation.1995@gmail.com" className="font-semibold text-brand-400 hover:text-brand-300">
              aprtassociation.1995@gmail.com
            </Link>
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <p className="inline-flex items-center gap-2">
              <FiPhone className="text-brand-400" />
              Dr Moulay Abdelaziz Katif : 0661264254
            </p>
            <p className="inline-flex items-center gap-2">
              <FiPhone className="text-brand-400" />
              Dr Fatiha Bennaoui : 0664848734
            </p>
            <p className="inline-flex items-center gap-2">
              <FiPhone className="text-brand-400" />
              Dr Khalid Lagmiri : 0661192622
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {socialLinks.map((item, idx) => {
            const Icon = item.icon;
            const colorClass =
              idx === 0
                ? "bg-[#3b5998]"
                : idx === 1
                  ? "bg-[#1f9cf0]"
                  : idx === 2
                    ? "bg-[#0077b5]"
                    : "bg-[#ff0000]";
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className={`inline-flex h-12 w-12 items-center justify-center border border-white/20 text-white transition hover:brightness-110 ${colorClass}`}
              >
                <Icon size={16} />
              </Link>
            );
          })}
        </div>

        <p className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-400">© {new Date().getFullYear()} APRT. Tous droits réservés.</p>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className="fixed bottom-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-brand-500 text-white shadow-lg transition hover:bg-brand-600"
      >
        ↑
      </button>
    </footer>
  );
}
