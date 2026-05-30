/* eslint-disable import/no-extraneous-dependencies */
import type { NextConfig } from "next";
import path from "path";
import { InjectManifest } from "workbox-webpack-plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

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

const srcAliases = Object.fromEntries(Object.entries(webpackAliases).filter(([k]) => k !== "@mui/styled-engine"));

const nextConfig: NextConfig = {
    compiler: {
        styledComponents: {
            displayName: true,
            ssr: true,
            fileName: true,
            topLevelImportPaths: ["styled-components", "styled-components/macro", "@mui/material/styles", "@mui/styled-engine-sc"]
        }
    },
    webpack(config, { webpack, isServer, dev }) {
        // Redirect @mui/styled-engine → @mui/styled-engine-sc at module resolution stage
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(/^@mui\/styled-engine(?!-sc)(\/.*)?$/, (resource: { request: string }) => {
                resource.request = resource.request.replace("@mui/styled-engine", "@mui/styled-engine-sc");
            })
        );

        if (Array.isArray(config.resolve.alias)) {
            config.resolve.alias.push(...Object.entries(srcAliases).map(([alias, name]) => ({ alias, name })));
        } else {
            config.resolve.alias = { ...(config.resolve.alias ?? {}), ...srcAliases };
        }

        // Build the service worker only for the client-side production bundle.
        // InjectManifest compiles sw.ts through its own webpack child compiler and
        // bundles workbox directly into the output — no importScripts, no blocking
        // network round-trip when the SW wakes up.
        if (!isServer && !dev) {
            const swBuildId = process.env.VERCEL_DEPLOYMENT_ID ?? String(Date.now());
            config.plugins.push(
                new webpack.DefinePlugin({
                    "process.env.SW_BUILD_ID": JSON.stringify(swBuildId)
                })
            );

            config.plugins.push(
                new InjectManifest({
                    swSrc: path.resolve(__dirname, "src/sw.ts"),
                    // Output relative to webpack's output dir (.next) — traverse up to public/
                    swDest: "../public/sw.js",
                    // Exclude all webpack assets so __WB_MANIFEST is [] at runtime.
                    // We don't precache Next.js chunks; runtime caching handles them.
                    exclude: [/./]
                })
            );
        }

        return config;
    },
    async headers() {
        return [
            {
                source: "/sw.js",
                headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }]
            }
        ];
    },
    async redirects() {
        return [];
    }
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);
