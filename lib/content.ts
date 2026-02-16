import { promises as fs } from "node:fs";
import path from "node:path";
import type { EventData, EventIndexItem, GalleryItem, NewsItem } from "@/lib/types";

const eventsDir = path.join(process.cwd(), "content", "events");
const newsPath = path.join(process.cwd(), "content", "news", "index.json");
const galleryPath = path.join(process.cwd(), "content", "galerie", "index.json");

export async function getEventsIndex(): Promise<EventIndexItem[]> {
  const indexPath = path.join(eventsDir, "index.json");
  const raw = await fs.readFile(indexPath, "utf8");
  const data = JSON.parse(raw) as EventIndexItem[];
  return data.sort((a, b) => (a.startDateISO < b.startDateISO ? 1 : -1));
}

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  try {
    const filePath = path.join(eventsDir, `${slug}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as EventData;
  } catch {
    return null;
  }
}

export async function getFeaturedEvent(): Promise<EventData | null> {
  const index = await getEventsIndex();
  const featured = index.find((e) => e.featured) ?? index.find((e) => e.status === "upcoming");
  if (!featured) return null;
  return getEventBySlug(featured.slug);
}

export async function getAllEventSlugs(): Promise<string[]> {
  const index = await getEventsIndex();
  return index.map((event) => event.slug);
}

export async function getNewsItems(): Promise<NewsItem[]> {
  const raw = await fs.readFile(newsPath, "utf8");
  return JSON.parse(raw) as NewsItem[];
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const raw = await fs.readFile(galleryPath, "utf8");
  return JSON.parse(raw) as GalleryItem[];
}
