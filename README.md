[![Deployment Status](https://api.netlify.com/api/v1/badges/74b15c5e-4c32-4bc0-b93f-829768a2342e/deploy-status)](https://app.netlify.com/projects/devdeckio/overview)

# DevDeck

A free, open-source, all-in-one developer toolbox — 23 utilities available in a single progressive web app, with dark mode, search, offline support, and server-side rendering.

---

## Tools

### Image Tools

| Tool                    | Route                      | Description                                                 |
| ----------------------- | -------------------------- | ----------------------------------------------------------- |
| Base64 Image            | `/base64-image`            | Convert images to Base64 and decode Base64 back to image    |
| QR Code Generator       | `/qr-generator`            | Generate QR codes from any text with optional logo overlay  |
| Image Resizer           | `/image-resizer`           | Crop, scale, and rotate images with a live preview canvas   |
| Aspect Ratio Calculator | `/aspect-ratio-calculator` | Calculate and copy the simplified aspect ratio of any image |

### Encoding & Text

| Tool                | Route             | Description                                                             |
| ------------------- | ----------------- | ----------------------------------------------------------------------- |
| Base64 Text         | `/base64-text`    | Encode plain text to Base64 and decode Base64 back to text              |
| Text Case Converter | `/text-case`      | Transform text to UPPER, lower, Title, camelCase, snake_case, and more  |
| Hash Generator      | `/hash-generator` | Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text          |
| Regex Tester        | `/regex-tester`   | Test regular expressions with live match highlighting and group capture |
| JWT Toolkit         | `/jwt-decoder`    | Decode, inspect, and generate JWT tokens — sign with HMAC, RSA, ECDSA, and EdDSA |
| YAML ↔ JSON         | `/yaml-json`      | Convert YAML to JSON and JSON to YAML with error feedback               |
| Text Diff           | `/text-diff`      | Compare two text blocks and highlight added and removed words           |
| Word Counter        | `/word-counter`   | Count words, characters, lines, sentences, paragraphs, and reading time |
| CSV to JSON         | `/csv-json`       | Parse CSV data into JSON with configurable header row support           |

### URL & Web

| Tool                | Route            | Description                                                                        |
| ------------------- | ---------------- | ---------------------------------------------------------------------------------- |
| URL Validator       | `/url-validator` | Check HTTP status codes and strip tracking parameters from URLs                    |
| URL Shortener       | `/url-shortener` | Shorten any long URL to a compact shareable link (via Short.io)                    |
| API Request Builder | `/api-builder`   | Construct and send HTTP requests with custom headers and body, inspect JSON output |

### Utilities

| Tool                  | Route              | Description                                                               |
| --------------------- | ------------------ | ------------------------------------------------------------------------- |
| Password Tools        | `/password-tools`  | Generate secure passwords and analyze strength with crack-time estimation |
| JSON Viewer           | `/json-viewer`     | Format, validate, and interactively browse JSON data                      |
| Color Converter       | `/color-converter` | Convert colors between HEX, RGB, and HSL formats instantly                |
| UUID Generator        | `/uuid-generator`  | Generate one or more UUID v4 values with a single click                   |
| Timestamp Converter   | `/timestamp`       | Convert Unix timestamps to human-readable dates and vice versa            |
| Number Base Converter | `/number-base`     | Convert numbers between binary, octal, decimal, and hexadecimal           |
| Lorem Ipsum           | `/lorem-ipsum`     | Generate placeholder text by paragraphs, sentences, or words              |

---

## Features

-   **Dark mode** — system-aware toggle persisted across sessions
-   **Global search** — filter tools from the header in real time
-   **PWA / offline support** — installable as a progressive web app via `@ducanh2912/next-pwa` (service worker + manifest)
-   **Server-side rendering** — Next.js 15 App Router with static generation for all tool pages
-   **SEO** — per-page `metadata` exports, JSON-LD `WebApplication` schema on every tool page, dynamic `sitemap.xml` and `robots.txt`
-   **Blog** — `/blog` index and `/blog/[slug]` post pages with per-post metadata
-   **Localization-ready** — all user-visible strings centralised in `src/localization/languages/english.js`
-   **Responsive** — mobile, tablet, and desktop layouts

---

## Tech Stack

| Layer            | Library                                                             |
| ---------------- | ------------------------------------------------------------------- |
| Framework        | Next.js 15 (App Router)                                             |
| UI library       | React 18                                                            |
| Language         | TypeScript 5                                                        |
| Component lib    | MUI (Material UI) latest — engine: `@mui/styled-engine-sc`          |
| Styling          | Styled Components 6 + MUI `sx` prop, CSS custom properties          |
| State management | Redux 5 + Redux Saga                                                |
| Crypto / hashing | crypto-js 4                                                         |
| YAML parsing     | js-yaml 4                                                           |
| Text diff        | diff 9                                                              |
| CSV parsing      | papaparse 5                                                         |
| QR codes         | qrcode                                                              |
| HTTP             | axios                                                               |
| PWA              | workbox-core                                                        |
| Bundle analysis  | @next/bundle-analyzer (`yarn analyze`)                              |

---

## Getting Started

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Production build
yarn build

# Start production server
yarn start

# Lint
yarn lint

# Format (Prettier + ESLint --fix)
yarn format

# Analyze bundle sizes
yarn analyze

# TS Typecheck
yarn typecheck
```

Requires **Node ≥ 22** and **Yarn ≥ 1.22**.

---

## Project Structure

```
src/
├── app/              # Next.js App Router — one folder per route
│   ├── layout.tsx    # Root layout (providers, fonts, global styles)
│   ├── page.tsx      # Home page
│   ├── sitemap.ts    # Dynamic sitemap route handler
│   ├── robots.ts     # Dynamic robots.txt route handler
│   ├── blog/         # Blog index + [slug] post pages
│   └── <tool>/       # One folder per tool (page.tsx + client-wrapper.tsx)
├── views/            # Tool UI — one folder per tool
├── components/       # Shared UI primitives (GlobalLayout, ToolJsonLd, etc.)
├── store/            # Redux store, root reducer, root sagas
├── localization/     # react-localization strings (english.js)
├── utils/            # globalConstants (tool registry, BASE_URL), helpers
├── styles/           # Global CSS, color tokens
├── services/         # axios API helpers
├── context/          # React context providers (ToolChainContext)
├── lib/              # Next.js integration layers (StyledComponentsRegistry, providers)
└── types/            # Shared TypeScript type definitions
```

---

## Environment Variables

| Variable               | Required | Description                                   |
| ---------------------- | -------- | --------------------------------------------- |
| `SHORT_URL_API_PK`     | For URL shortener | Short.io API key (server-only)       |
| `SHORT_URL_DOMAIN`     | For URL shortener | Short.io domain (server-only)        |

---

## License

[MIT](LICENSE)
