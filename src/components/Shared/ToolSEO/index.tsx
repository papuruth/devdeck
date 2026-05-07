import Head from "next/head";
import React from "react";
import { SEO_META } from "utils/seoMeta";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";

const { BASE_URL } = GLOBAL_CONSTANTS;

function buildJsonLd(route: string, meta: any) {
    const url = `${BASE_URL}${route}`;

    if (route === "/") {
        return {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "DevDeck",
            url: BASE_URL,
            description: meta.description,
            potentialAction: {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${BASE_URL}/?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        };
    }

    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: meta.title.split(" — ")[0],
        url,
        description: meta.description,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD"
        }
    };
}

interface ToolSEOProps {
    route: string;
}

export default function ToolSEO({ route }: ToolSEOProps) {
    const meta = (SEO_META as Record<string, any>)[route] || SEO_META["/"];
    const canonicalUrl = `${BASE_URL}${route}`;
    const jsonLd = buildJsonLd(route, meta);

    return (
        <Head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="canonical" href={canonicalUrl} />
            <meta name="keywords" content={meta.keywords} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="DevDeck" />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={`${BASE_URL}/assets/images/og-preview.png`} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta name="twitter:image" content={`${BASE_URL}/assets/images/og-preview.png`} />

            {/* JSON-LD */}
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Head>
    );
}

