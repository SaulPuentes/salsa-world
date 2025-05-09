import { AboutOverviewBlock as AboutOverviewProps } from "@/payload-types";
import React from "react";

export const AboutOverviewBlock: React.FC<AboutOverviewProps> = ({ sections }) => {
  return (
    <div className="container my-16">
      Hello About Overview block
    </div>
  )
}