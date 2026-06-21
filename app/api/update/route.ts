import { NextRequest, NextResponse } from "next/server";
import { getInvitationById, updateInvitation } from "@/lib/storage";
import { Invitation, FamilyDetails } from "@/lib/types";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";

const VALID_TEMPLATE_IDS = new Set(TEMPLATE_REGISTRY.map((t) => t.id));
const EMPTY_FAMILY: FamilyDetails = { fatherName: "", motherName: "", members: [] };

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json() as Partial<Invitation> & { id?: string };

    if (!body.id) return NextResponse.json({ error: "ID required." }, { status: 400 });
    if (!body.brideName?.trim()) return NextResponse.json({ error: "Bride name required." }, { status: 400 });
    if (!body.groomName?.trim()) return NextResponse.json({ error: "Groom name required." }, { status: 400 });
    if (!body.date?.trim()) return NextResponse.json({ error: "Wedding date required." }, { status: 400 });
    if (!body.time?.trim()) return NextResponse.json({ error: "Wedding time required." }, { status: 400 });
    if (!body.venue?.trim()) return NextResponse.json({ error: "Venue required." }, { status: 400 });
    if (!body.templateId || !VALID_TEMPLATE_IDS.has(body.templateId)) {
      return NextResponse.json({ error: "Invalid template." }, { status: 400 });
    }

    const existing = await getInvitationById(body.id);
    if (!existing) return NextResponse.json({ error: "Invitation not found." }, { status: 404 });

    const updates: Partial<Invitation> = {
      brideName: body.brideName.trim(),
      groomName: body.groomName.trim(),
      brideFamily: body.brideFamily ?? EMPTY_FAMILY,
      groomFamily: body.groomFamily ?? EMPTY_FAMILY,
      date: body.date.trim(),
      time: body.time.trim(),
      venue: body.venue.trim(),
      venueAddress: body.venueAddress?.trim() ?? "",
      receptionVenue: body.receptionVenue?.trim() ?? "",
      receptionTime: body.receptionTime?.trim() ?? "",
      dressCode: body.dressCode?.trim() ?? "",
      rsvpContact: body.rsvpContact?.trim() ?? "",
      rsvpDeadline: body.rsvpDeadline?.trim() ?? "",
      rsvpWhatsapp: body.rsvpWhatsapp?.trim() ?? "",
      story: body.story?.trim() ?? "",
      templateId: body.templateId,
      imageUrls: body.imageUrls ?? existing.imageUrls,
      heroImageUrls: body.heroImageUrls ?? existing.heroImageUrls ?? [],
      storyImageUrls: body.storyImageUrls ?? existing.storyImageUrls ?? [],
      brideFamilyImageUrls: body.brideFamilyImageUrls ?? existing.brideFamilyImageUrls ?? [],
      groomFamilyImageUrls: body.groomFamilyImageUrls ?? existing.groomFamilyImageUrls ?? [],
      events: body.events ?? [],
      coupleHashtag: body.coupleHashtag?.trim() ?? "",
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

    const ok = await updateInvitation(body.id, updates);
    if (!ok) return NextResponse.json({ error: "Update failed." }, { status: 500 });

    return NextResponse.json({ success: true, slug: existing.slug, url: `/${existing.slug}` });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update invitation." }, { status: 500 });
  }
}
