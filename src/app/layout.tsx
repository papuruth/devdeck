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

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL(GLOBAL_CONSTANTS.BASE_URL),
    title: {
        default: "DevDeck — Developer Toolbox",
        template: "%s | DevDeck"
    },
    description:
        "A collection of 25+ free online developer tools. Base64, QR codes, image resizer, JWT decoder, regex tester, and more.",
    authors: [{ name: "Papu Kumar" }],
    creator: "Papu Kumar",
    robots: { index: true, follow: true },
    openGraph: {
        siteName: "DevDeck",
        type: "website",
        locale: "en_US"
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
            </body>
        </html>
    );
}
