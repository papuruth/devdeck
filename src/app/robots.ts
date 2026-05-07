import type { MetadataRoute } from "next";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";

const { BASE_URL } = GLOBAL_CONSTANTS;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${BASE_URL}/sitemap.xml`
    };
}
