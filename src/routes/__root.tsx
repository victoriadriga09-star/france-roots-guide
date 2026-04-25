import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CleoCompanion } from "@/components/concierge/CleoCompanion";
import { Cleo } from "@/components/concierge/Cleo";
import { motion, AnimatePresence } from "framer-motion";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-silver">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#040F0F" },
      { title: "Concierge — Your guide to life in France" },
      {
        name: "description",
        content:
          "Concierge is your warm, gamified guide to banking, taxes and benefits when settling in France.",
      },
      { name: "author", content: "Concierge" },
      { property: "og:title", content: "Concierge — Your guide to life in France" },
      {
        property: "og:description",
        content: "A friendly companion for banking, taxes and benefits in France.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Concierge — Your guide to life in France" },
      { name: "description", content: "Concierge guides newcomers through France with gamified financial and administrative support." },
      { property: "og:description", content: "Concierge guides newcomers through France with gamified financial and administrative support." },
      { name: "twitter:description", content: "Concierge guides newcomers through France with gamified financial and administrative support." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/55c977ad-68c9-4034-803b-84c1e2ec4537/id-preview-51b0725c--ad938315-38ac-4f6e-b2d9-d5b7c6a5d6a6.lovable.app-1777139668819.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/55c977ad-68c9-4034-803b-84c1e2ec4537/id-preview-51b0725c--ad938315-38ac-4f6e-b2d9-d5b7c6a5d6a6.lovable.app-1777139668819.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
