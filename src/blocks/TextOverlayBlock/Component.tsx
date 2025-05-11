import { TextOverlayBlock as TextOverlayProps } from "@/payload-types";
import React from "react";

export const TextOverlayBlock: React.FC<TextOverlayProps> = ({ title }) => {
  console.log('TEXT OVERLAY BLOCK', title);
  return (
    <div className="container my-16">
      Hello Text Overlay Component
    </div>
  )
}