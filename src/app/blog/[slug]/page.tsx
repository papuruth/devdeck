import type { Metadata } from "next";
import BlogPost from "views/Blog/BlogPost";
import { SEO_META } from "utils/seoMeta";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";

type Props = { params: Promise<{ slug: string }> };

const { BASE_URL } = GLOBAL_CONSTANTS;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const route = `/blog/${slug}`;
    const meta = (SEO_META as any)[route] as (typeof SEO_META)["/"] | undefined;
    return {
        title: meta?.title ?? `${slug} — DevDeck Guides`,
        description: meta?.description,
        keywords: meta?.keywords,
        alternates: {
            canonical: `${BASE_URL}/blog/${slug}`
        }
    };
}

export default function BlogPostPage() {
    return <BlogPost />;
}
