"use client";

/** One place that registers the GSAP plugins. Import gsap, ScrollTrigger and useGSAP from here in client components. */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Media query under which motion may run. Wrap every tween in gsap.matchMedia() with this. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
