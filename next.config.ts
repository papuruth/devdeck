import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "@ducanh2912/next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withPWA = withPWAInit({
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV === "development",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    workboxOptions: {
        disableDevLogs: true,
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
                handler: "CacheFirst",
                options: {
                    cacheName: "google-fonts",
                    expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 365 }
                }
            },
            {
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
                handler: "CacheFirst",
                options: {
                    cacheName: "static-images",
                    expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 30 }
                }
            },
            {
                urlPattern: /\.(?:js|css|woff2?)$/i,
                handler: "StaleWhileRevalidate",
                options: { cacheName: "static-assets" }
            },
            {
                urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
                handler: "StaleWhileRevalidate",
                options: { cacheName: "next-data" }
            }
        ]
    }
});

const nextConfig: NextConfig = {
    compiler: {
        styledComponents: true
    },
    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@mui/styled-engine": "@mui/styled-engine-sc",
            components: path.resolve(__dirname, "src/components"),
            views: path.resolve(__dirname, "src/views"),
            utils: path.resolve(__dirname, "src/utils"),
            styles: path.resolve(__dirname, "src/styles"),
            routes: path.resolve(__dirname, "src/routes"),
            localization: path.resolve(__dirname, "src/localization"),
            assets: path.resolve(__dirname, "src/assets"),
            services: path.resolve(__dirname, "src/services"),
            context: path.resolve(__dirname, "src/context"),
            data: path.resolve(__dirname, "src/data"),
            lib: path.resolve(__dirname, "src/lib"),
            store: path.resolve(__dirname, "src/store"),
            types: path.resolve(__dirname, "src/types")
        };
        return config;
    },
    async redirects() {
        return [];
    }
};

export default withPWA(withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig));
