import type { Metadata } from "next";
import Operations from "views/Operations";
import { SEO_META } from "utils/seoMeta";
import ToolJsonLd from "components/ToolJsonLd";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";

const meta = SEO_META["/url-shortener"];

export const metadata: Metadata = {
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords,
    alternates: {
        canonical: `${GLOBAL_CONSTANTS.BASE_URL}/url-shortener`
    }
};

export default function Page() {
    return (
        <>
            <ToolJsonLd name={meta?.title ?? ""} description={meta?.about ?? meta?.description ?? ""} path="/url-shortener" />
            <Operations />
        </>
    );
}
