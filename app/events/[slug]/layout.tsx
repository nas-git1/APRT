import { notFound } from "next/navigation";
import { EventSidebar } from "@/components/EventSidebar";
import { getEventBySlug } from "@/lib/content";

export default async function EventLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="container-site grid gap-6 lg:grid-cols-[1fr_280px]">
      <div>{children}</div>
      <EventSidebar event={event} />
    </div>
  );
}
