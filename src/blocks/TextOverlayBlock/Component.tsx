import { TextOverlayBlock as TextOverlayProps } from "@/payload-types";
import React from "react";

export const TextOverlayBlock: React.FC<TextOverlayProps> = ({ title }) => {
  return (
    <div className="container my-16 bg-violet">
      {title && <h2 className="text-3xl font-bold text-center">{title}</h2>}
    </div>
  )
}