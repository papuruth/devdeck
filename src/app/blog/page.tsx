import type { Metadata } from "next";
import BlogIndex from "views/Blog";
import { SEO_META } from "utils/seoMeta";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";

const meta = SEO_META["/blog"];
const { BASE_URL } = GLOBAL_CONSTANTS;

export const metadata: Metadata = {
    title: meta?.title ?? "DevDeck Guides — Developer Tool Tutorials",
    description: meta?.description ?? "Step-by-step guides for developer tools. Learn JSON, JWT, Base64, Regex, and more.",
    keywords: meta?.keywords,
    alternates: {
        canonical: `${BASE_URL}/blog`
    }
};

export default function BlogPage() {
    return <BlogIndex />;
}
