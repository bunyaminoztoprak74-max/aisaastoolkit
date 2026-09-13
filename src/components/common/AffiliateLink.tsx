"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

interface AffiliateLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  toolName: string;
  placement: string;
}

export function AffiliateLink({ href, toolName, placement, onClick, rel, target = "_blank", ...props }: AffiliateLinkProps) {
  const trackClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const isTrackedAffiliate = /[?&](pc|via|ref|aff|tag|referralcode)=|try\.elevenlabs\.io|jdoqocy\.com|anrdoezrs\.net/i.test(href);
    window.dataLayer?.push({
      event: isTrackedAffiliate ? "affiliate_click" : "outbound_product_click",
      affiliate_tool: toolName,
      affiliate_placement: placement,
      affiliate_tracked: isTrackedAffiliate,
      destination_url: href,
      page_path: window.location.pathname,
    });
    onClick?.(event);
  };

  return (
    <a
      {...props}
      href={href}
      target={target}
      rel={rel ?? (/([?&](pc|via|ref|aff|tag|referralcode)=|try\.elevenlabs\.io|jdoqocy\.com|anrdoezrs\.net)/i.test(href)
        ? "sponsored nofollow noopener noreferrer"
        : "nofollow noopener noreferrer")}
      data-affiliate-tool={toolName}
      data-affiliate-placement={placement}
      onClick={trackClick}
    />
  );
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}
