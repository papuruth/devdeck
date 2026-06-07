import type { MetadataRoute } from "next";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";
import { SEO_META } from "utils/seoMeta";

const { BASE_URL } = GLOBAL_CONSTANTS;

const TOOL_PATHS = [
    "/base64-image",
    "/qr-generator",
    "/image-resizer",
    "/aspect-ratio-calculator",
    "/base64-text",
    "/url-validator",
    "/url-shortener",
    "/json-viewer",
    "/password-tools",
    "/color-converter",
    "/text-case",
    "/hash-generator",
    "/regex-tester",
    "/jwt-decoder",
    "/uuid-generator",
    "/timestamp",
    "/number-base",
    "/yaml-json",
    "/text-diff",
    "/lorem-ipsum",
    "/word-counter",
    "/csv-json",
    "/api-builder",
    "/css-tailwind",
    "/smart-formatter"
];

const BLOG_POST_PATHS = Object.keys(SEO_META).filter((path) => path.startsWith("/blog/"));

export default function sitemap(): MetadataRoute.Sitemap {
    const toolUrls: MetadataRoute.Sitemap = TOOL_PATHS.map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8
    }));

    const blogPostUrls: MetadataRoute.Sitemap = BLOG_POST_PATHS.map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6
    }));

    return [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
        ...blogPostUrls,
        ...toolUrls
    ];
}
