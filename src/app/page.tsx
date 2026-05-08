import type { Metadata } from "next";
import Home from "views/Home";
import { SEO_META } from "utils/seoMeta";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";

const meta = SEO_META["/"];
const { BASE_URL } = GLOBAL_CONSTANTS;

export const metadata: Metadata = {
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords,
    openGraph: {
        title: meta?.title,
        description: meta?.description,
        url: BASE_URL,
        type: "website",
        images: [
            {
                url: `${BASE_URL}/assets/images/og-preview.png`,
                width: 1200,
                height: 630,
                alt: "DevDeck - Developer Toolbox"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: meta?.title,
        description: meta?.description,
        site: "@papu_kumar",
        creator: "@papu_kumar",
        images: [`${BASE_URL}/assets/images/og-preview.png`]
    },
    alternates: {
        canonical: BASE_URL
    }
};

export default function HomePage() {
    return <Home />;
}
