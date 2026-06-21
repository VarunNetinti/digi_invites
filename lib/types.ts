export interface FamilyMember {
  name: string;
  relation: string;
}

export interface FamilyDetails {
  fatherName: string;
  motherName: string;
  members: FamilyMember[];
}

export interface WeddingEvent {
  name: string;
  date: string;
  time: string;
  venue: string;
  venueAddress?: string;
  description?: string;
}

export interface Invitation {
  id: string;
  brideName: string;
  groomName: string;
  brideFamily: FamilyDetails;
  groomFamily: FamilyDetails;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  receptionVenue: string;
  receptionTime: string;
  dressCode: string;
  rsvpContact: string;
  rsvpDeadline: string;
  story: string;
  templateId: string;
  imageUrls: string[];          // legacy / general (kept for backward compat)
  heroImageUrls: string[];      // shown below ceremony header
  storyImageUrls: string[];     // shown inside love story section
  brideFamilyImageUrls: string[]; // shown beside bride's family
  groomFamilyImageUrls: string[]; // shown beside groom's family
  slug: string;
  createdAt: string;
  events: WeddingEvent[];
  coupleHashtag: string;
  rsvpWhatsapp: string;
  venueMapUrl: string;
  backgroundMusicUrl?: string;
  specialNote: string;
  brideAbout: string;
  groomAbout: string;
  fontFamily?: string;
  accentColor?: string;
  openingEffect?: string;   // e.g. 'hearts' | 'birds' | 'parrots' | 'petals' | 'stars' | 'butterflies' | 'none'
  openingFormat?: string;   // e.g. 'letter' | 'scroll' | 'curtain' | 'book' | 'gate' | 'zoom-reveal' | 'typewriter' | 'photo-peel' | 'cinematic'
  lang?: string;            // e.g. 'english' | 'hindi' | 'telugu' | 'marathi' | 'kannada' | 'malayalam' | 'tamil' | 'urdu'
  galleryStyle?: string;
  galleryFillet?: string;
  heroGalleryStyle?: string;
  heroGalleryFillet?: string;
  storyGalleryStyle?: string;
  storyGalleryFillet?: string;
  brideFamilyGalleryStyle?: string;
  brideFamilyGalleryFillet?: string;
  groomFamilyGalleryStyle?: string;
  groomFamilyGalleryFillet?: string;
  // ── Archive ──
  archived?: boolean;           // true once archived
  archivedAt?: string;          // ISO timestamp of when archived
  archiveSnapshotUrl?: string;  // Cloudinary URL of full-page PNG snapshot
}

export interface CreateInvitationPayload {
  brideName: string;
  groomName: string;
  brideFamily: FamilyDetails;
  groomFamily: FamilyDetails;
  date: string;
  time: string;
  venue: string;
  venueAddress: string;
  receptionVenue: string;
  receptionTime: string;
  dressCode: string;
  rsvpContact: string;
  rsvpDeadline: string;
  story: string;
  templateId: string;
  imageUrls: string[];          // legacy / general
  heroImageUrls: string[];
  storyImageUrls: string[];
  brideFamilyImageUrls: string[];
  groomFamilyImageUrls: string[];
  events: WeddingEvent[];
  coupleHashtag: string;
  rsvpWhatsapp: string;
  venueMapUrl: string;
  backgroundMusicUrl?: string;
  specialNote: string;
  brideAbout: string;
  groomAbout: string;
  fontFamily?: string;
  accentColor?: string;
  openingEffect?: string;
  openingFormat?: string;
  lang?: string;
  galleryStyle?: string;
  galleryFillet?: string;
  heroGalleryStyle?: string;
  heroGalleryFillet?: string;
  storyGalleryStyle?: string;
  storyGalleryFillet?: string;
  brideFamilyGalleryStyle?: string;
  brideFamilyGalleryFillet?: string;
  groomFamilyGalleryStyle?: string;
  groomFamilyGalleryFillet?: string;
}

export type TemplateId =
  | "template1" | "template2" | "template3" | "template4" | "template5"
  | "template6" | "template7" | "template8" | "template9" | "template10"
  | "template11" | "template12" | "template13" | "template14" | "template15";

export interface TemplateProps {
  invitation: Invitation;
  isPreview?: boolean;
}
