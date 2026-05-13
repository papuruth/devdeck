import type { Metadata } from "next";
import Home from "views/Home";
import { SEO_META } from "utils/seoMeta";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";
import { headers } from "next/headers";

const meta = SEO_META["/"];
const { BASE_URL } = GLOBAL_CONSTANTS;

export const metadata: Metadata = {
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords,
    alternates: {
        canonical: BASE_URL
    }
};

async function isMac(): Promise<boolean> {
    const headersList = await headers();
    const userAgentString = headersList.get("user-agent") || "";
    return /Mac|iPhone|iPod|iPad/i.test(userAgentString);
}

export default async function HomePage() {
    return <Home isMac={await isMac()} />;
}
