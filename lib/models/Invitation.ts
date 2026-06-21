/**
 * lib/models/Invitation.ts
 * Mongoose schema for Wedding Invitation.
 * Only loaded when MongoDB is available.
 */

import { InferSchemaType } from "mongoose";

import mongoose, { Schema, Document, Model } from "mongoose";
import { Invitation } from "../types";

const FamilyMemberSchema = new Schema(
  { name: String, relation: String },
  { _id: false }
);

const FamilyDetailsSchema = new Schema(
  {
    fatherName: { type: String, default: "" },
    motherName: { type: String, default: "" },
    members: { type: [FamilyMemberSchema], default: [] },
  },
  { _id: false }
);

const WeddingEventSchema = new Schema(
  {
    name: String,
    date: String,
    time: String,
    venue: String,
    venueAddress: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const InvitationSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    brideName: { type: String, required: true },
    groomName: { type: String, required: true },
    brideFamily: { type: FamilyDetailsSchema, default: () => ({}) },
    groomFamily: { type: FamilyDetailsSchema, default: () => ({}) },
    date: String,
    time: String,
    venue: String,
    venueAddress: { type: String, default: "" },
    receptionVenue: { type: String, default: "" },
    receptionTime: { type: String, default: "" },
    dressCode: { type: String, default: "" },
    rsvpContact: { type: String, default: "" },
    rsvpDeadline: { type: String, default: "" },
    rsvpWhatsapp: { type: String, default: "" },
    story: { type: String, default: "" },
    templateId: String,
    imageUrls: { type: [String], default: [] },
    slug: { type: String, required: true, unique: true },
    createdAt: String,
    events: { type: [WeddingEventSchema], default: [] },
    coupleHashtag: { type: String, default: "" },
    venueMapUrl: { type: String, default: "" },
    backgroundMusicUrl: { type: String, default: "" },
    specialNote: { type: String, default: "" },
    brideAbout: { type: String, default: "" },
    groomAbout: { type: String, default: "" },
    fontFamily: { type: String, default: "Great Vibes" },
    accentColor: { type: String, default: "" },
    heroImageUrls: { type: [String], default: [] },
    storyImageUrls: { type: [String], default: [] },
    brideFamilyImageUrls: { type: [String], default: [] },
    groomFamilyImageUrls: { type: [String], default: [] },
    // ── Archive ──
    archived: { type: Boolean, default: false },
    archivedAt: { type: String, default: "" },
    archiveSnapshotUrl: { type: String, default: "" },
    openingEffect: { type: String, default: "hearts" },
    openingFormat: { type: String, default: "letter" },
  },
  { timestamps: false }
);

export type InvitationDocument = InferSchemaType<typeof InvitationSchema>;

// ── Prevent model re-compilation during hot-reload ────────────────────────────
const InvitationModel: Model<InvitationDocument> =
  (mongoose.models.Invitation as Model<InvitationDocument>) ||
  mongoose.model<InvitationDocument>("Invitation", InvitationSchema);

export default InvitationModel;
