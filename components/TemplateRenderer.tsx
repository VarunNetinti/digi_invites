"use client";
import dynamic from "next/dynamic";
import { Invitation, TemplateProps } from "@/lib/types";
import InvitationWrapper from "./InvitationWrapper";
import { ComponentType } from "react";

interface TemplateRendererProps {
  invitation: Invitation;
}
const templateMap: Record<string, ComponentType<TemplateProps>> = {
  template1: dynamic<TemplateProps>(() => import("./templates/Template1"), { ssr: false }),
  template2: dynamic<TemplateProps>(() => import("./templates/Template2"), { ssr: false }),
  template3: dynamic<TemplateProps>(() => import("./templates/Template3"), { ssr: false }),
  template4: dynamic<TemplateProps>(() => import("./templates/Template4"), { ssr: false }),
  template5: dynamic<TemplateProps>(() => import("./templates/Template5"), { ssr: false }),
  template6: dynamic<TemplateProps>(() => import("./templates/Template6"), { ssr: false }),
  template7: dynamic<TemplateProps>(() => import("./templates/Template7"), { ssr: false }),
  template8: dynamic<TemplateProps>(() => import("./templates/Template8"), { ssr: false }),
  template9: dynamic<TemplateProps>(() => import("./templates/Template9"), { ssr: false }),
  template10: dynamic<TemplateProps>(() => import("./templates/Template10"), { ssr: false }),
  template11: dynamic<TemplateProps>(() => import("./templates/Template11"), { ssr: false }),
  template12: dynamic<TemplateProps>(() => import("./templates/Template12"), { ssr: false }),
  template13: dynamic<TemplateProps>(() => import("./templates/Template13"), { ssr: false }),
  template14: dynamic<TemplateProps>(() => import("./templates/Template14"), { ssr: false }),
  template15: dynamic<TemplateProps>(() => import("./templates/Template15"), { ssr: false }),
};

export default function TemplateRenderer({ invitation }: TemplateRendererProps) {
  const TemplateComponent = templateMap[invitation.templateId] ?? templateMap["template1"];
  return (
    <InvitationWrapper invitation={invitation}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <TemplateComponent invitation={invitation} />
    </InvitationWrapper>
  );
}
