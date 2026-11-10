"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const isNavigatingRef = useRef(false);

  // When pathname changes (new route has mounted), reset state and scroll to top
  useEffect(() => {
    setIsExiting(false);
    isNavigatingRef.current = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Find nearest anchor tag
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignore special or external links
      if (
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }

      try {
        const targetUrl = new URL(link.href, window.location.href);

        // Ignore external hosts
        if (targetUrl.origin !== window.location.origin) {
          return;
        }

        // If same pathname (e.g. hash link or anchor on current page), allow standard smooth scroll
        if (targetUrl.pathname === window.location.pathname) {
          return;
        }

        // Internal navigation to another page!
        e.preventDefault();

        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;
        setIsExiting(true);

        // Previous page swipes up (exit animation ~240ms), then route changes
        window.setTimeout(() => {
          router.push(targetUrl.pathname + targetUrl.search + targetUrl.hash);
        }, 240);
      } catch {
        // Fallback to normal browser behavior
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, [router]);

  return (
    <>
      <div
        className={`ge-transition-bar${isExiting ? " is-active" : ""}`}
        aria-hidden="true"
      />
      <div
        key={pathname}
        className={`ge-page-transition-wrapper ${isExiting ? "ge-page-swipe-out" : "ge-page-swipe-in"}`}
      >
        {children}
      </div>
    </>
  );
}
