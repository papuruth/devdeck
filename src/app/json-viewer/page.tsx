import type { Metadata } from "next";
import ToolJsonLd from "components/ToolJsonLd";
import { SEO_META } from "utils/seoMeta";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";
import ClientWrapper from "./client-wrapper";

const meta = SEO_META["/json-viewer"];

export const metadata: Metadata = {
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords,
    alternates: {
        canonical: `${GLOBAL_CONSTANTS.BASE_URL}/json-viewer`
    }
};

export default function Page() {
    return (
        <>
            <ToolJsonLd name={meta?.title ?? ""} description={meta?.about ?? meta?.description ?? ""} path="/json-viewer" />
            <ClientWrapper />
        </>
    );
}
