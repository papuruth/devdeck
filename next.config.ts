import type { NextConfig } from "next";
import path from "path";
import withPWAInit from "@ducanh2912/next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withPWA = withPWAInit({
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
        disableDevLogs: true,
        importScripts: ["/assets/sw-helpers.js"],
        // Precaching 100+ JS chunks during SW install saturates HTTP/1.1's 6-connection
        // limit, causing all page requests to hang as "pending". Content-hashed filenames
        // make CacheFirst runtime caching the correct strategy anyway.
        exclude: [/static\/chunks\/.*\.js$/],
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
                urlPattern: /\/_next\/static\/chunks\/.+\.js$/i,
                handler: "CacheFirst",
                options: {
                    cacheName: "next-js-chunks",
                    expiration: { maxEntries: 128, maxAgeSeconds: 60 * 60 * 24 * 30 }
                }
            }
        ]
    }
});

const webpackAliases = {
    "@mui/styled-engine": path.resolve(__dirname, "node_modules/@mui/styled-engine-sc"),
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

const srcAliases = Object.fromEntries(
    Object.entries(webpackAliases).filter(([k]) => k !== "@mui/styled-engine")
);

const nextConfig: NextConfig = {
    compiler: {
        styledComponents: {
            displayName: true,
            ssr: true,
            fileName: true,
            topLevelImportPaths: ["styled-components", "styled-components/macro", "@mui/material/styles", "@mui/styled-engine-sc"]
        }
    },
    webpack(config, { webpack }) {
        // Redirect @mui/styled-engine → @mui/styled-engine-sc at module resolution stage
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /^@mui\/styled-engine(?!-sc)(\/.*)?$/,
                (resource: { request: string }) => {
                    resource.request = resource.request.replace(
                        "@mui/styled-engine",
                        "@mui/styled-engine-sc"
                    );
                }
            )
        );

        if (Array.isArray(config.resolve.alias)) {
            config.resolve.alias.push(
                ...Object.entries(srcAliases).map(([alias, name]) => ({ alias, name }))
            );
        } else {
            config.resolve.alias = { ...(config.resolve.alias ?? {}), ...srcAliases };
        }
        return config;
    },
    async redirects() {
        return [];
    }
};

export default withPWA(withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig));
