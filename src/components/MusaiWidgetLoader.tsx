"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MUSAI_WIDGET_SRC = "https://aidenbkhan.github.io/Musai/musai-widget.js";

/**
 * Next.js does client-side route transitions without a full page
 * reload, but the MUSAI widget script only scans the DOM for
 * `.musai-safety-widget` elements once, when it first loads. Re-inject
 * a fresh <script> tag on every route change so it re-scans the
 * current page's widgets instead of leaving newly navigated-to
 * widgets uninitialized.
 */
export default function MusaiWidgetLoader() {
  const pathname = usePathname();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = MUSAI_WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [pathname]);

  return null;
}
