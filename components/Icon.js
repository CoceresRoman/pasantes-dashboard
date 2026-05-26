"use client";

import * as Lucide from "lucide-react";
import { HelpCircle } from "lucide-react";

export default function Icon({ name, size = 20, className = "", strokeWidth = 2, style }) {
  const Cmp = Lucide[name] || HelpCircle;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} style={style} />;
}
