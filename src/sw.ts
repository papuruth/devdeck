/* eslint-disable no-restricted-globals */
// @ts-nocheck

import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, setDefaultHandler } from "workbox-routing";
import { CacheFirst, NetworkFirst, NetworkOnly } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

const SW_BUILD_ID = process.env.SW_BUILD_ID ?? "unknown";
console.log("🚀 ~ Service Worker initialized with build ID:", SW_BUILD_ID);
clientsClaim();

// Allow the client to trigger a SW update via postMessage
self.addEventListener("message", (event) => {
    if ((event as ExtendableMessageEvent).data?.type === "SKIP_WAITING") {
        (self as unknown as ServiceWorkerGlobalScope).skipWaiting();
    }
});

// Injected by InjectManifest at build time. We exclude all webpack assets so
// this is always [] — no chunks are precached, runtime caching handles them.
// The self.__WB_MANIFEST reference is required for InjectManifest injection.
precacheAndRoute(self.__WB_MANIFEST);

// HTML navigation — NetworkFirst so users always get fresh pages
registerRoute(({ request }) => request.mode === "navigate", new NetworkFirst({ cacheName: "pages", networkTimeoutSeconds: 3 }));

// Google Fonts stylesheets + webfonts
registerRoute(
    /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    new CacheFirst({
        cacheName: "google-fonts",
        plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 365, purgeOnQuotaError: true })]
    })
);

// Images
registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
    new CacheFirst({
        cacheName: "static-images",
        plugins: [new ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 30, purgeOnQuotaError: true })]
    })
);

// Next.js static assets (content-hashed — safe to cache immutably)
registerRoute(
    /\/_next\/static\/.*/i,
    new CacheFirst({
        cacheName: "next-static",
        plugins: [new ExpirationPlugin({ maxEntries: 256, maxAgeSeconds: 60 * 60 * 24 * 30, purgeOnQuotaError: true })]
    })
);

// Fallback: pass everything else straight to the network
setDefaultHandler(new NetworkOnly());
