const { run } = require("react-snap");

// On Netlify, PUPPETEER_EXECUTABLE_PATH is set in build env vars.
// Locally on macOS, fall back to system Chrome.
const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : undefined);

run({
    source: "build",
    include: [
        "/",
        "/json-viewer",
        "/jwt-decoder",
        "/regex-tester",
        "/base64-text",
        "/base64-image",
        "/uuid-generator",
        "/password-tools",
        "/hash-generator",
        "/qr-generator",
        "/url-validator",
        "/url-shortener",
        "/color-converter",
        "/text-case",
        "/timestamp",
        "/number-base",
        "/yaml-json",
        "/text-diff",
        "/word-counter",
        "/csv-json",
        "/image-resizer",
        "/aspect-ratio-calculator",
        "/lorem-ipsum",
        "/api-builder",
        "/blog",
        "/blog/json-viewer",
        "/blog/jwt-decoder",
        "/blog/regex-tester",
        "/blog/base64-text-encoder",
        "/blog/base64-image-converter",
        "/blog/uuid-generator",
        "/blog/password-generator",
        "/blog/hash-generator",
        "/blog/qr-code-generator",
        "/blog/url-parser",
        "/blog/url-shortener",
        "/blog/color-converter",
        "/blog/text-case-converter",
        "/blog/timestamp-converter",
        "/blog/number-base-converter",
        "/blog/yaml-to-json-converter",
        "/blog/text-diff-checker",
        "/blog/word-counter",
        "/blog/csv-to-json-converter",
        "/blog/image-resizer",
        "/blog/aspect-ratio-calculator",
        "/blog/lorem-ipsum-generator",
        "/blog/api-request-builder"
    ],
    puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
    ...(executablePath && { puppeteerExecutablePath: executablePath }),
    inlineCss: false,
    skipThirdPartyRequests: true,
    saveAs: "html"
}).catch((err) => {
    console.error("react-snap failed:", err);
    process.exit(1);
});
