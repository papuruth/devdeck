import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GLOBAL_CONSTANTS } from "utils/globalConstants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledComponentsRegistry from "lib/StyledComponentsRegistry";
import ColorModeProvider from "lib/ColorModeProvider";
import MuiThemeProvider from "lib/MuiThemeProvider";
import ReduxProvider from "lib/ReduxProvider";
import ThemeAttributeSetter from "lib/ThemeAttributeSetter";
import "./globals.css";
import { ToolChainProvider } from "context/ToolChainContext";
import GlobalLayout from "components/GlobalLayout";
import NavigationProgress from "components/NavigationProgress";
import PWAUpdateWatcher from "components/PWAUpdateWatcher";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL(GLOBAL_CONSTANTS.BASE_URL),
    title: {
        default: "DevDeck — Developer Toolbox",
        template: "%s"
    },
    description: "A collection of 25+ free online developer tools. Base64, QR codes, image resizer, JWT decoder, regex tester, and more.",
    authors: [{ name: "Papu Kumar" }],
    creator: "Papu Kumar",
    robots: { index: true, follow: true },
    icons: {
        icon: [
            { rel: "icon", type: "image/x-icon", url: "favicon.ico" },
            { rel: "icon", type: "image/svg+xml", url: "favicon.svg" },
            { rel: "icon", type: "image/png", sizes: "16x16", url: "/assets/images/icon-16x16.png" },
            { rel: "icon", type: "image/png", sizes: "32x32", url: "/assets/images/icon-32x32.png" }
        ],
        apple: "/assets/images/apple-touch-icon.png",
        shortcut: "/assets/images/icon-32x32.png"
    },
    openGraph: {
        siteName: "DevDeck",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: `${GLOBAL_CONSTANTS.BASE_URL}/assets/images/og-preview.png`,
                width: 1200,
                height: 630,
                alt: "DevDeck - Developer Toolbox"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        // TODO: Update with actual Twitter handle if available
        // site: "",
        // creator: "",
        images: [`${GLOBAL_CONSTANTS.BASE_URL}/assets/images/og-preview.png`]
    },
    verification: {
        google: "google-site-verification=d9X2uV7QOAgl6y0GrAk5ijW1ufkps8N9azwPvUAwKzQ"
    }
};

export const viewport: Viewport = {
    themeColor: "#22cc99",
    width: "device-width",
    initialScale: 1
};

const themeScript = `(function(){try{var s=localStorage.getItem('devdeck-theme');document.documentElement.setAttribute('data-theme',s==='light'||s==='dark'?s:window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <body>
                {/* eslint-disable-next-line react/no-danger */}
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                <StyledComponentsRegistry>
                    <ColorModeProvider>
                        <ReduxProvider>
                            <MuiThemeProvider>
                                <ToolChainProvider>
                                    <ThemeAttributeSetter />
                                    <NavigationProgress />
                                    <PWAUpdateWatcher />
                                    <GlobalLayout>{children}</GlobalLayout>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={3000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable={false}
                                        pauseOnHover
                                        theme="colored"
                                        closeButton={false}
                                    />
                                </ToolChainProvider>
                            </MuiThemeProvider>
                        </ReduxProvider>
                    </ColorModeProvider>
                </StyledComponentsRegistry>
                <SpeedInsights />
                <Analytics />
                <GoogleAnalytics gaId="G-HCS4THL5ZL" />
            </body>
        </html>
    );
}
