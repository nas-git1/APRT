"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import eventsIndex from "@/content/events/index.json";
import type { EventIndexItem } from "@/lib/types";

type MenuItem = {
  label: string;
  href?: string;
  children?: MenuItem[];
};

const eventsByYear = (eventsIndex as EventIndexItem[]).reduce<Record<string, EventIndexItem[]>>((acc, event) => {
  const year = String(new Date(event.startDateISO).getFullYear());
  if (!acc[year]) acc[year] = [];
  acc[year].push(event);
  return acc;
}, {});

const eventYearItems: MenuItem[] = Object.keys(eventsByYear)
  .sort((a, b) => Number(b) - Number(a))
  .map((year) => ({
    label: year,
    children: [...eventsByYear[year]]
      .sort((a, b) => (a.startDateISO < b.startDateISO ? 1 : -1))
      .map((event) => ({
        label: event.editionTitle,
        href: `/events/${event.slug}`
      }))
  }));

const menuItems: MenuItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Programme", href: "/programme" },
  { label: "Intervenants", href: "/intervenants" },
  { label: "E-posters", href: "/eposters" },
  { label: "Galerie", href: "/galerie" },
  { label: "A propos de nous", href: "/a-propos" },
  {
    label: "Evenements",
    children: [
      ...eventYearItems,
      { label: "Tous les evenements", href: "/events" }
    ]
  },
  { label: "Contact", href: "/contact" }
];

const socialLinks = [
  { href: "#", label: "Facebook", icon: FaFacebookF },
  { href: "#", label: "Instagram", icon: FaInstagram },
  { href: "#", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "#", label: "YouTube", icon: FaYoutube }
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function RightChevron() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileNestedDropdown, setMobileNestedDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="container-site py-3 lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="APRT" width={36} height={36} className="h-9 w-9 rounded-md" />
            <span className="text-sm font-bold text-slate-900">APRT</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-200 text-brand-700 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="M3.5 6H16.5M3.5 10H16.5M3.5 14H16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="hidden border-t border-brand-100 bg-white lg:block">
        <div className="container-site">
          <nav className="flex items-center gap-1 py-2">
            <Link href="/" className="mr-2 flex items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-brand-50">
              <Image src="/logo.png" alt="APRT" width={34} height={34} className="h-8 w-8 rounded-md" />
              <span className="text-sm font-bold text-slate-900">APRT</span>
            </Link>
            {menuItems.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700">
                    {item.label}
                    <Chevron open={false} />
                  </button>
                  <div className="invisible absolute left-0 top-full min-w-64 translate-y-1 rounded-lg border border-brand-100 bg-white p-2 opacity-0 shadow-soft transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) =>
                      child.children ? (
                        <div key={child.label} className="group/nested relative">
                          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-brand-50 hover:text-brand-700">
                            {child.label}
                            <RightChevron />
                          </button>
                          <div className="invisible absolute left-full top-0 z-10 ml-1 min-w-56 rounded-lg border border-brand-100 bg-white p-2 opacity-0 shadow-soft transition duration-150 group-hover/nested:visible group-hover/nested:opacity-100">
                            {child.children.map((grandChild) => (
                              <Link
                                key={grandChild.href}
                                href={grandChild.href as string}
                                className={`block rounded-md px-3 py-2 text-sm transition hover:bg-brand-50 hover:text-brand-700 ${
                                  pathname === grandChild.href ? "bg-brand-50 text-brand-700" : "text-slate-700"
                                }`}
                              >
                                {grandChild.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={child.href}
                          href={child.href as string}
                          className={`block rounded-md px-3 py-2 text-sm transition hover:bg-brand-50 hover:text-brand-700 ${
                            pathname === child.href ? "bg-brand-50 text-brand-700" : "text-slate-700"
                          }`}
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href as string}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition hover:bg-brand-50 hover:text-brand-700 ${
                    pathname === item.href ? "bg-brand-50 text-brand-700" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-brand-100 bg-white lg:hidden">
          <div className="container-site py-3">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                        onClick={() => setMobileDropdown((prev) => (prev === item.label ? null : item.label))}
                      >
                        {item.label}
                        <Chevron open={mobileDropdown === item.label} />
                      </button>
                      <div className={`${mobileDropdown === item.label ? "mt-1 space-y-1" : "hidden"}`}>
                        {item.children.map((child) =>
                          child.children ? (
                            <div key={child.label}>
                              <button
                                type="button"
                                className="flex w-full items-center justify-between rounded-md px-5 py-2 text-left text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                                onClick={() => setMobileNestedDropdown((prev) => (prev === child.label ? null : child.label))}
                              >
                                {child.label}
                                <Chevron open={mobileNestedDropdown === child.label} />
                              </button>
                              <div className={`${mobileNestedDropdown === child.label ? "mt-1 space-y-1" : "hidden"}`}>
                                {child.children.map((grandChild) => (
                                  <Link
                                    key={grandChild.href}
                                    href={grandChild.href as string}
                                    onClick={() => setMobileOpen(false)}
                                    className="block rounded-md px-8 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                                  >
                                    {grandChild.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              key={child.href}
                              href={child.href as string}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-md px-5 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href as string}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 border-t border-brand-100 pt-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-200 text-brand-700"
                  >
                    <Icon size={14} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
