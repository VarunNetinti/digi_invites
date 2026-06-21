import { notFound } from "next/navigation";
import { getInvitationBySlug } from "@/lib/storage";
import TemplateRenderer from "@/components/TemplateRenderer";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation) {
    return { title: "Invitation Not Found" };
  }

  return {
    title: `${invitation.brideName} & ${invitation.groomName} — Wedding Invitation`,
    description: `You are cordially invited to the wedding of ${invitation.brideName} and ${invitation.groomName} on ${invitation.date} at ${invitation.venue}.`,
    openGraph: {
      title: `${invitation.brideName} & ${invitation.groomName} — Wedding Invitation`,
      description: `Join us on ${invitation.date} at ${invitation.venue}`,
      images: invitation.imageUrls.length > 0 ? [invitation.imageUrls[0]] : [],
    },
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const invitation = await getInvitationBySlug(slug);

  if (!invitation || (invitation as { expired?: boolean }).expired) {
    notFound();
  }

  return <TemplateRenderer invitation={invitation} />;
}
