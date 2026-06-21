"use client";
import dynamic from "next/dynamic";
import { Invitation } from "@/lib/types";
import InvitationWrapper from "./InvitationWrapper";

interface TemplateRendererProps {
  invitation: Invitation;
}

const templateMap: Record<string, ReturnType<typeof dynamic>> = {
  template1:  dynamic(() => import("./templates/Template1")),
  template2:  dynamic(() => import("./templates/Template2")),
  template3:  dynamic(() => import("./templates/Template3")),
  template4:  dynamic(() => import("./templates/Template4")),
  template5:  dynamic(() => import("./templates/Template5")),
  template6:  dynamic(() => import("./templates/Template6")),
  template7:  dynamic(() => import("./templates/Template7")),
  template8:  dynamic(() => import("./templates/Template8")),
  template9:  dynamic(() => import("./templates/Template9")),
  template10: dynamic(() => import("./templates/Template10")),
  template11: dynamic(() => import("./templates/Template11")),
  template12: dynamic(() => import("./templates/Template12")),
  template13: dynamic(() => import("./templates/Template13")),
  template14: dynamic(() => import("./templates/Template14")),
  template15: dynamic(() => import("./templates/Template15")),
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
