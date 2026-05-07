import React from "react";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";

interface ToolJsonLdProps {
    name: string;
    description: string;
    path: string;
}

const { BASE_URL } = GLOBAL_CONSTANTS;

export default function ToolJsonLd({ name, description, path }: ToolJsonLdProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url: `${BASE_URL}${path}`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    };
    // eslint-disable-next-line react/no-danger
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
