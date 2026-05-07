import type { Metadata } from "next";
import ToolJsonLd from "components/ToolJsonLd";
import { SEO_META } from "utils/seoMeta";
import ClientWrapper from "./client-wrapper";

const meta = SEO_META["/json-viewer"];

export const metadata: Metadata = {
    title: meta?.title,
    description: meta?.description,
    keywords: meta?.keywords
};

export default function Page() {
    return (
        <>
            <ToolJsonLd name={meta?.title ?? ""} description={meta?.about ?? meta?.description ?? ""} path="/json-viewer" />
            <ClientWrapper />
        </>
    );
}
