import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "DevDeck — Developer Toolbox",
        short_name: "DevDeck",
        description: "25+ free developer tools in a single progressive web app — JSON, JWT, Base64, Regex, and more.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "natural",
        background_color: "#1f1e29",
        theme_color: "#22cc99",
        categories: ["productivity", "developer", "utilities"],
        icons: [
            { src: "/assets/images/icon-16x16.png", sizes: "16x16", type: "image/png" },
            { src: "/assets/images/icon-32x32.png", sizes: "32x32", type: "image/png" },
            { src: "/assets/images/icon-48x48.png", sizes: "48x48", type: "image/png" },
            { src: "/assets/images/icon-64x64.png", sizes: "64x64", type: "image/png" },
            { src: "/assets/images/icon-128x128.png", sizes: "128x128", type: "image/png" },
            { src: "/assets/images/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "/assets/images/icon-256x256.png", sizes: "256x256", type: "image/png" },
            { src: "/assets/images/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "/assets/images/icon-maskable-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
            { src: "/assets/images/icon-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ],
        protocol_handlers: [
            {
                protocol: "web+devdeck",
                url: "/?tool=%s"
            }
        ],
        screenshots: [
            {
                src: "/assets/images/screenshot-mobile.png",
                sizes: "390x844",
                type: "image/png",
                form_factor: "narrow",
                label: "DevDeck on mobile — 25+ tools at your fingertips"
            },
            {
                src: "/assets/images/og-preview.png",
                sizes: "1200x630",
                type: "image/png",
                form_factor: "wide",
                label: "DevDeck — all-in-one developer toolbox"
            }
        ]
    };
}
