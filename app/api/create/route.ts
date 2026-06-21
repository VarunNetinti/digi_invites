import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { saveInvitation, generateUniqueSlug } from "@/lib/storage";
import { CreateInvitationPayload, Invitation, FamilyDetails } from "@/lib/types";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";

const EMPTY_FAMILY: FamilyDetails = { fatherName: "", motherName: "", members: [] };
const VALID_TEMPLATE_IDS = new Set(TEMPLATE_REGISTRY.map((t) => t.id));

function validatePayload(body: Partial<CreateInvitationPayload>): string | null {
  if (!body.brideName?.trim()) return "Bride name is required.";
  if (!body.groomName?.trim()) return "Groom name is required.";
  if (!body.date?.trim()) return "Wedding date is required.";
  if (!body.time?.trim()) return "Wedding time is required.";
  if (!body.venue?.trim()) return "Venue is required.";
  if (!body.templateId?.trim()) return "Template selection is required.";
  if (!VALID_TEMPLATE_IDS.has(body.templateId)) return "Invalid template.";
  return null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as Partial<CreateInvitationPayload>;
    const err = validatePayload(body);
    if (err) return NextResponse.json({ error: err }, { status: 400 });

    const slug = await generateUniqueSlug(body.brideName!, body.groomName!);

    const invitation: Invitation = {
      id: uuidv4(),
      brideName: body.brideName!.trim(),
      groomName: body.groomName!.trim(),
      brideFamily: body.brideFamily ?? EMPTY_FAMILY,
      groomFamily: body.groomFamily ?? EMPTY_FAMILY,
      date: body.date!.trim(),
      time: body.time!.trim(),
      venue: body.venue!.trim(),
      venueAddress: body.venueAddress?.trim() ?? "",
      receptionVenue: body.receptionVenue?.trim() ?? "",
      receptionTime: body.receptionTime?.trim() ?? "",
      dressCode: body.dressCode?.trim() ?? "",
      rsvpContact: body.rsvpContact?.trim() ?? "",
      rsvpDeadline: body.rsvpDeadline?.trim() ?? "",
      story: body.story?.trim() ?? "",
      templateId: body.templateId!.trim(),
      imageUrls: body.imageUrls ?? [],
      heroImageUrls: body.heroImageUrls ?? [],
      storyImageUrls: body.storyImageUrls ?? [],
      brideFamilyImageUrls: body.brideFamilyImageUrls ?? [],
      groomFamilyImageUrls: body.groomFamilyImageUrls ?? [],
      slug,
      createdAt: new Date().toISOString(),
      events: body.events ?? [],
      coupleHashtag: body.coupleHashtag?.trim() ?? "",
      rsvpWhatsapp: body.rsvpWhatsapp?.trim() ?? "",
      venueMapUrl: body.venueMapUrl?.trim() ?? "",
      backgroundMusicUrl: body.backgroundMusicUrl?.trim() ?? "",
      specialNote: body.specialNote?.trim() ?? "",
      brideAbout: body.brideAbout?.trim() ?? "",
      groomAbout: body.groomAbout?.trim() ?? "",
      fontFamily: body.fontFamily?.trim() ?? "Great Vibes",
      accentColor: body.accentColor?.trim() ?? "",
      openingEffect: body.openingEffect?.trim() ?? "hearts",
      openingFormat: body.openingFormat?.trim() ?? "letter",
      lang: body.lang?.trim() ?? "english",
      galleryStyle: body.galleryStyle?.trim() ?? "slideshow",
      galleryFillet: body.galleryFillet?.trim() ?? "soft",
      heroGalleryStyle: body.heroGalleryStyle?.trim() ?? "slideshow",
      heroGalleryFillet: body.heroGalleryFillet?.trim() ?? "soft",
      storyGalleryStyle: body.storyGalleryStyle?.trim() ?? "slideshow",
      storyGalleryFillet: body.storyGalleryFillet?.trim() ?? "soft",
      brideFamilyGalleryStyle: body.brideFamilyGalleryStyle?.trim() ?? "slideshow",
      brideFamilyGalleryFillet: body.brideFamilyGalleryFillet?.trim() ?? "soft",
      groomFamilyGalleryStyle: body.groomFamilyGalleryStyle?.trim() ?? "slideshow",
      groomFamilyGalleryFillet: body.groomFamilyGalleryFillet?.trim() ?? "soft",
    };

    await saveInvitation(invitation);
    return NextResponse.json({ success: true, slug, url: `/${slug}`, invitation }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create invitation." }, { status: 500 });
  }
}
