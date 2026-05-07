import type { Metadata } from "next";
import Operations from "views/Operations";
import { SEO_META } from "utils/seoMeta";
import ToolJsonLd from "components/ToolJsonLd";

const meta = SEO_META["/url-validator"];

export const metadata: Metadata = {
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords
};

export default function Page() {
    return (
        <>
            <ToolJsonLd name={meta?.title ?? ""} description={meta?.about ?? meta?.description ?? ""} path="/url-validator" />
            <Operations />
        </>
    );
}
