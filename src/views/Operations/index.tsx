"use client";

import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import StepperNavigation from "components/StepperNavigation";
import localization from "localization";
import { GLOBAL_CONSTANTS, TOOL_CATEGORIES } from "utils/globalConstants";
import storage from "utils/storage";
import RelatedTools from "components/Shared/RelatedTools";
import { SEO_META } from "utils/seoMeta";
import { StyledHeroContent, StyledToolBody, StyledToolCard, StyledToolHero, StyledToolPage } from "./styles";

// Tool route → blog slug mapping
const TOOL_BLOG_SLUG: Record<string, string> = {
    "/base64-image": "base64-image-converter",
    "/base64-text": "base64-text-encoder",
    "/qr-generator": "qr-code-generator",
    "/image-resizer": "image-resizer",
    "/aspect-ratio-calculator": "aspect-ratio-calculator",
    "/url-validator": "url-parser",
    "/url-shortener": "url-shortener",
    "/json-viewer": "json-viewer",
    "/password-tools": "password-generator",
    "/color-converter": "color-converter",
    "/text-case": "text-case-converter",
    "/hash-generator": "hash-generator",
    "/regex-tester": "regex-tester",
    "/jwt-decoder": "jwt-decoder",
    "/uuid-generator": "uuid-generator",
    "/timestamp": "timestamp-converter",
    "/number-base": "number-base-converter",
    "/yaml-json": "yaml-to-json-converter",
    "/text-diff": "text-diff-checker",
    "/lorem-ipsum": "lorem-ipsum-generator",
    "/word-counter": "word-counter",
    "/csv-json": "csv-to-json-converter",
    "/api-builder": "api-request-builder",
    "/css-tailwind": "css-to-tailwind-converter",
    "/smart-formatter": "smart-formatter",
    "/html-jsx": "html-jsx",
    "/encoder-decoder": "encoder-decoder",
    "/command-playground": "command-playground"
};

function ToolFallback() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
            <CircularProgress size={32} sx={{ color: "var(--color-primary, #22c55e)" }} />
        </Box>
    );
}

const loading = () => <ToolFallback />;
const AspectRatioCalculator = dynamic(() => import("components/AspectRatioCalculator"), { loading, ssr: false });
const Base64Image = dynamic(() => import("components/Base64Image"), { loading, ssr: false });
const Base64Text = dynamic(() => import("components/Base64Text"), { loading, ssr: false });
const ColorConverter = dynamic(() => import("components/ColorConverter"), { loading, ssr: false });
const CSVToJSON = dynamic(() => import("components/CSVToJSON"), { loading, ssr: false });
const HashGenerator = dynamic(() => import("components/HashGenerator"), { loading, ssr: false });
const ImageResizer = dynamic(() => import("components/ImageResizer"), { loading, ssr: false });
const JWTDecoder = dynamic(() => import("components/JWTDecoder"), { loading, ssr: false });
const JSONViewer = dynamic(() => import("components/JSONViewer"), { loading, ssr: false });
const LoremIpsum = dynamic(() => import("components/LoremIpsum"), { loading, ssr: false });
const NumberBaseConverter = dynamic(() => import("components/NumberBaseConverter"), { loading, ssr: false });
const PasswordTools = dynamic(() => import("components/PasswordTools"), { loading, ssr: false });
const QRGenerator = dynamic(() => import("components/QRGenerator"), { loading, ssr: false });
const RegexTester = dynamic(() => import("components/RegexTester"), { loading, ssr: false });
const TextCaseConverter = dynamic(() => import("components/TextCaseConverter"), { loading, ssr: false });
const TextDiff = dynamic(() => import("components/TextDiff"), { loading, ssr: false });
const TimestampConverter = dynamic(() => import("components/TimestampConverter"), { loading, ssr: false });
const URLShortner = dynamic(() => import("components/URLShortner"), { loading, ssr: false });
const UrlValidator = dynamic(() => import("components/UrlValidator"), { loading, ssr: false });
const UUIDGenerator = dynamic(() => import("components/UUIDGenerator"), { loading, ssr: false });
const WordCounter = dynamic(() => import("components/WordCounter"), { loading, ssr: false });
const YAMLJSONConverter = dynamic(() => import("components/YAMLJSONConverter"), { loading, ssr: false });
const APIRequestBuilder = dynamic(() => import("components/APIRequestBuilder"), { loading, ssr: false });
const CSSToTailwind = dynamic(() => import("components/CSSToTailwind"), { loading, ssr: false });
const SmartFormatter = dynamic(() => import("components/SmartFormatter"), { loading, ssr: false });
const HTMLToJSX = dynamic(() => import("components/HTMLToJSX"), { loading, ssr: false });
const EncoderDecoder = dynamic(() => import("components/EncoderDecoder"), { loading, ssr: false });
const CommandPlayground = dynamic(() => import("components/CommandPlayground"), { loading, ssr: false });

export default function Operations() {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (pathname) {
            storage.setRecentTool(pathname);
        }
    }, [pathname]);

    const renderComponentConditionally = () => {
        const {
            base64Image,
            base64Text,
            qrGenerator,
            imageResizer,
            aspectRatioCalculator,
            urlValidator,
            urlShortner,
            jsonViewer,
            passwordTools,
            colorConverter,
            textCaseConverter,
            hashGenerator,
            regexTester,
            jwtDecoder,
            uuidGenerator,
            timestampConverter,
            numberBaseConverter,
            yamlJsonConverter,
            textDiff,
            loremIpsum,
            wordCounter,
            csvToJson,
            apiRequestBuilder,
            cssToTailwind,
            smartFormatter,
            htmlToJsx,
            encoderDecoder,
            commandPlayground
        } = localization;
        switch (pathname) {
            case "/base64-image":
                return { title: base64Image.pageTitle, component: Base64Image };
            case "/base64-text":
                return { title: base64Text.pageTitle, component: Base64Text };
            case "/qr-generator":
                return { title: qrGenerator.pageTitle, component: QRGenerator };
            case "/image-resizer":
                return { title: imageResizer.pageTitle, component: ImageResizer };
            case "/aspect-ratio-calculator":
                return { title: aspectRatioCalculator.pageTitle, component: AspectRatioCalculator };
            case "/url-validator":
                return { title: urlValidator.pageTitle, component: UrlValidator };
            case "/url-shortener":
                return { title: urlShortner.pageTitle, component: URLShortner };
            case "/json-viewer":
                return { title: jsonViewer.pageTitle, component: JSONViewer };
            case "/password-tools":
                return { title: passwordTools.pageTitle, component: PasswordTools };
            case "/color-converter":
                return { title: colorConverter.pageTitle, component: ColorConverter };
            case "/text-case":
                return { title: textCaseConverter.pageTitle, component: TextCaseConverter };
            case "/hash-generator":
                return { title: hashGenerator.pageTitle, component: HashGenerator };
            case "/regex-tester":
                return { title: regexTester.pageTitle, component: RegexTester };
            case "/jwt-decoder":
                return { title: jwtDecoder.pageTitle, component: JWTDecoder };
            case "/uuid-generator":
                return { title: uuidGenerator.pageTitle, component: UUIDGenerator };
            case "/timestamp":
                return { title: timestampConverter.pageTitle, component: TimestampConverter };
            case "/number-base":
                return { title: numberBaseConverter.pageTitle, component: NumberBaseConverter };
            case "/yaml-json":
                return { title: yamlJsonConverter.pageTitle, component: YAMLJSONConverter };
            case "/text-diff":
                return { title: textDiff.pageTitle, component: TextDiff };
            case "/lorem-ipsum":
                return { title: loremIpsum.pageTitle, component: LoremIpsum };
            case "/word-counter":
                return { title: wordCounter.pageTitle, component: WordCounter };
            case "/csv-json":
                return { title: csvToJson.pageTitle, component: CSVToJSON };
            case "/api-builder":
                return { title: apiRequestBuilder.pageTitle, component: APIRequestBuilder };
            case "/css-tailwind":
                return { title: cssToTailwind.pageTitle, component: CSSToTailwind };
            case "/smart-formatter":
                return { title: smartFormatter.pageTitle, component: SmartFormatter };
            case "/html-jsx":
                return { title: htmlToJsx.pageTitle, component: HTMLToJSX };
            case "/encoder-decoder":
                return { title: encoderDecoder.pageTitle, component: EncoderDecoder };
            case "/command-playground":
                return { title: commandPlayground.pageTitle, component: CommandPlayground };
            default:
                return null;
        }
    };

    const toolMeta = renderComponentConditionally();
    if (!toolMeta) return null;
    const { title, component: Component } = toolMeta;

    const currentItem = GLOBAL_CONSTANTS.OPERATIONS_ITEMS.find((item) => item.route === pathname);
    const category = currentItem ? TOOL_CATEGORIES.find((c) => c.id === currentItem.category) : null;

    const toolSeo = SEO_META[pathname as keyof typeof SEO_META];

    return (
        <StyledToolPage>
            <StyledToolHero $categoryColor={category?.color}>
                <StepperNavigation currentView={title} category={category} />
                <StyledHeroContent>
                    <Box>
                        <Typography variant="h5" sx={{ lineHeight: 1.2, fontWeight: 700 }}>
                            {title}
                        </Typography>
                        {currentItem?.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 540 }}>
                                {currentItem.description}
                            </Typography>
                        )}
                    </Box>
                    {category && (
                        <Chip
                            label={category.label}
                            size="small"
                            sx={{
                                bgcolor: `${category.color}22`,
                                color: category.color,
                                fontWeight: 600,
                                border: `1px solid ${category.color}55`,
                                alignSelf: "flex-start",
                                mt: 0.5
                            }}
                        />
                    )}
                </StyledHeroContent>
            </StyledToolHero>
            <StyledToolBody>
                <StyledToolCard elevation={2}>
                    <Suspense fallback={<ToolFallback />}>
                        <Component />
                    </Suspense>
                </StyledToolCard>
                {toolSeo?.about && (
                    <Box sx={{ mt: 3, px: 1 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ color: "var(--text-primary)", fontWeight: 700 }}>
                            About this tool
                        </Typography>
                        <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
                            {toolSeo.about}
                        </Typography>
                    </Box>
                )}
                <RelatedTools currentRoute={pathname} />
                {TOOL_BLOG_SLUG[pathname] && (
                    <Box sx={{ mt: 2, px: 1, pb: 1 }}>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{
                                color: "var(--text-secondary)",
                                fontSize: "0.75rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                fontWeight: 700
                            }}
                        >
                            📘 Learn More
                        </Typography>
                        <Box
                            component="button"
                            onClick={() => router.push(`/blog/${TOOL_BLOG_SLUG[pathname]}`)}
                            sx={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                                color: "#22cc99",
                                fontSize: "0.85rem",
                                fontFamily: "inherit",
                                textDecoration: "underline",
                                textUnderlineOffset: "3px",
                                "&:hover": { opacity: 0.75 }
                            }}
                        >
                            {SEO_META[`/blog/${TOOL_BLOG_SLUG[pathname]}` as keyof typeof SEO_META]?.title || "Read the guide"}
                        </Box>
                    </Box>
                )}
            </StyledToolBody>
        </StyledToolPage>
    );
}
