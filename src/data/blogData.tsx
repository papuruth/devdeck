// Blog data for DevDeck tools (28 tools exist; blog posts cover 28)
// Shape: slug → { slug, title, metaDescription, metaKeywords, intro, sections[], cta, relatedSlugs[], faq[] }

const blogData = {
    "aspect-ratio-calculator": {
        slug: "aspect-ratio-calculator",
        title: "Aspect Ratio Calculator — Width & Height Dimensions",
        metaDescription:
            "Learn how to calculate and simplify aspect ratios from width and height values. Use DevDeck's free browser-based aspect ratio calculator instantly.",
        metaKeywords: "aspect ratio calculator, 16:9 calculator, image dimensions, width height ratio, online aspect ratio",
        intro: "Aspect ratio describes the proportional relationship between width and height. Whether you're designing for video, web layouts, or print, getting the ratio right prevents distortion and ensures consistency across screen sizes.",
        sections: [
            {
                heading: "What is an Aspect Ratio?",
                body: "An aspect ratio is the ratio of an image's or screen's width to its height, expressed as two numbers separated by a colon — like 16:9 or 4:3. It tells you the shape of the display area without specifying actual pixel dimensions."
            },
            {
                heading: "Why Aspect Ratio Matters",
                body: "Wrong aspect ratios cause stretched or cropped visuals. Front-end developers use it to size video embeds, hero images, and responsive containers correctly. Video producers need it to match platform requirements (YouTube is 16:9, Instagram is 1:1 or 4:5)."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Instantly simplify any width × height pair to its lowest-term ratio",
                    "No installation — runs entirely in browser",
                    "Works for any resolution, not just standard presets",
                    "Great for responsive design and media production",
                    "Free with no signup required"
                ]
            },
            {
                heading: "How to Use the Aspect Ratio Calculator",
                steps: ["Enter the width value", "Enter the height value", "View the simplified ratio instantly", "Copy or note down the result"]
            },
            {
                heading: "Example Use Case",
                body: "A developer building a video player needs to maintain 16:9 ratio for any given width. Enter 1920 × 1080 → get 16:9. Enter 800 × 600 → get 4:3. Instantly compare ratios across different content sizes."
            },
            {
                heading: "Tips",
                list: [
                    "Use 16:9 for landscape video content",
                    "Use 1:1 for social media square posts",
                    "Use 4:5 for Instagram portrait posts",
                    "CSS padding-top trick uses ratio to maintain proportional containers"
                ]
            }
        ],
        cta: { label: "Try Aspect Ratio Calculator →", toolRoute: "/aspect-ratio-calculator" },
        relatedSlugs: ["image-resizer", "base64-image-converter", "word-counter"],
        faq: [
            { q: "Is the Aspect Ratio Calculator free?", a: "Yes, completely free. No signup required." },
            { q: "Does it store my data?", a: "No. All processing happens locally in your browser." },
            { q: "What is 16:9 in pixels?", a: "Any resolution where width ÷ height = 1.778. For example 1920×1080, 1280×720, 854×480." }
        ]
    },

    "base64-image-converter": {
        slug: "base64-image-converter",
        title: "Base64 Image Converter — Encode & Decode Images",
        metaDescription:
            "Convert images to Base64 data URIs and decode Base64 back to images. Supports PNG, JPG, SVG, WebP. Free, browser-based, no upload required.",
        metaKeywords: "base64 image, image to base64, base64 to image, encode image, decode base64 image, data URI",
        intro: "Base64 image conversion lets you embed images directly into HTML, CSS, or JavaScript as text strings. No separate file requests, no CDN — the image travels with your code.",
        sections: [
            {
                heading: "What is Base64 Image Encoding?",
                body: "Base64 encoding converts binary image data into a printable ASCII string. The result is a data URI like `data:image/png;base64,iVBORw0KGgo...` that browsers can render directly without an HTTP request."
            },
            {
                heading: "Why Use Base64 for Images?",
                body: "Embedding images as Base64 reduces HTTP requests — useful for small icons, inline SVGs in CSS, or email templates where external images may be blocked. It's also handy for storing images in JSON APIs or localStorage."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Encode any PNG, JPG, SVG, GIF, or WebP to Base64",
                    "Decode any Base64 string back to a viewable image",
                    "No file upload to any server — fully client-side",
                    "Copy data URI with one click",
                    "Preview decoded image immediately"
                ]
            },
            {
                heading: "How to Use Base64 Image Converter",
                steps: [
                    "Drag and drop or select an image file",
                    "The Base64 data URI appears instantly",
                    "Copy and use in your HTML, CSS, or JSON",
                    "To decode: paste a Base64 string and see the image preview"
                ]
            },
            {
                heading: "Example Use Case",
                body: "An email developer needs to embed a logo without relying on external hosting (many email clients block remote images). Encode the PNG to Base64, paste the data URI into the `<img src>` attribute — the image renders reliably in every email client."
            },
            {
                heading: "Tips",
                list: [
                    "Base64 increases file size by ~33% — only use for small images",
                    "SVGs are already text so Base64 is often unnecessary for them",
                    "Large images as Base64 will bloat HTML significantly",
                    "Use for icons under 5KB for best performance"
                ]
            }
        ],
        cta: { label: "Try Base64 Image Converter →", toolRoute: "/base64-image" },
        relatedSlugs: ["image-resizer", "base64-text-encoder", "qr-code-generator"],
        faq: [
            { q: "Is Base64 Image Converter free?", a: "Yes, completely free." },
            { q: "Does it store my images?", a: "No. All encoding/decoding happens locally in your browser." },
            { q: "What image formats are supported?", a: "PNG, JPG/JPEG, GIF, SVG, and WebP." },
            { q: "Can I use the Base64 output in CSS?", a: "Yes. Use it as background-image: url('data:image/png;base64,...')" }
        ]
    },

    "base64-text-encoder": {
        slug: "base64-text-encoder",
        title: "Base64 Text Encoder & Decoder — Online Tool",
        metaDescription: "Encode plain text to Base64 and decode Base64 back to readable text. Supports Unicode. Free browser-based tool on DevDeck.",
        metaKeywords: "base64 encode, base64 decode, text to base64, base64 to text, online base64 encoder",
        intro: "Base64 text encoding converts any string into a safe ASCII representation. It's widely used in HTTP Basic Auth headers, JWT tokens, email encoding, and anywhere binary-safe text transport is needed.",
        sections: [
            {
                heading: "What is Base64 Text Encoding?",
                body: "Base64 is an encoding scheme that represents binary data using 64 printable ASCII characters (A–Z, a–z, 0–9, +, /). It doesn't encrypt — it just makes arbitrary bytes safe to transmit as text."
            },
            {
                heading: "Why Use Base64 for Text?",
                body: "HTTP headers, JSON payloads, and URLs can't safely carry arbitrary binary data. Base64 solves this by transforming any string into URL-safe or header-safe characters. It's the backbone of HTTP Basic Authentication (`Authorization: Basic dXNlcjpwYXNz`)."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Encode any text string to Base64 instantly",
                    "Decode any Base64 string back to plain text",
                    "Handles Unicode (UTF-8) characters",
                    "Supports large strings",
                    "100% client-side — nothing sent to server"
                ]
            },
            {
                heading: "How to Use Base64 Text Encoder",
                steps: [
                    "Paste or type your text in the input field",
                    "Switch between Encode and Decode modes",
                    "See the result instantly",
                    "Copy output to clipboard"
                ]
            },
            {
                heading: "Example Use Case",
                body: "A developer debugging an API that uses HTTP Basic Auth needs to manually construct the Authorization header. Enter `username:password` → encode → get the Base64 string to paste in the header. Also useful for decoding JWT payloads (the middle part of a JWT is Base64-encoded JSON)."
            },
            {
                heading: "Tips",
                list: [
                    "Base64 is not encryption — do not use it to 'hide' sensitive data",
                    "JWT middle section is Base64URL encoded (uses - and _ instead of + and /)",
                    "btoa() and atob() are built-in browser Base64 functions",
                    "For binary files, use the Base64 Image tool instead"
                ]
            }
        ],
        cta: { label: "Try Base64 Text Encoder →", toolRoute: "/base64-text" },
        relatedSlugs: ["base64-image-converter", "hash-generator", "jwt-decoder"],
        faq: [
            {
                q: "Is Base64 encoding secure?",
                a: "No. Base64 is encoding, not encryption. Anyone can decode it. Use it only for transport compatibility, not for hiding data."
            },
            { q: "Does it store my text?", a: "No. Everything runs locally in your browser." },
            { q: "What is the difference between Base64 and Base64URL?", a: "Base64URL replaces + with - and / with _ to make the string URL-safe." }
        ]
    },

    "color-converter": {
        slug: "color-converter",
        title: "Color Converter — HEX, RGB, HSL Online Tool",
        metaDescription: "Convert colors instantly between HEX, RGB, and HSL formats. Free browser-based color converter on DevDeck.",
        metaKeywords: "color converter, hex to rgb, rgb to hex, hsl converter, color code converter, css colors",
        intro: "Color codes come in multiple formats depending on the context — CSS uses HEX or RGB, design tools use HSL, and APIs may return any format. Color Converter lets you translate between all three instantly.",
        sections: [
            {
                heading: "What is a Color Converter?",
                body: "A color converter translates color values between different notation systems: HEX (#rrggbb), RGB (red, green, blue channels 0–255), and HSL (hue 0–360°, saturation %, lightness %). All three represent the same color — just in different formats."
            },
            {
                heading: "Why Use a Color Converter?",
                body: "Design tools like Figma export colors as HEX, but CSS animations and theming often work better with HSL. APIs return RGB values. Having a quick converter eliminates manual calculation and copy-paste errors between design and development."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Instant conversion between HEX, RGB, and HSL",
                    "Visual color preview",
                    "Copy any format with one click",
                    "Works in browser with no installation",
                    "Supports the full visible color gamut"
                ]
            },
            {
                heading: "How to Use Color Converter",
                steps: [
                    "Paste a HEX code, RGB value, or HSL value",
                    "All three formats update instantly",
                    "Click to copy any format",
                    "Use the color picker for visual selection"
                ]
            },
            {
                heading: "Example Use Case",
                body: "A developer implementing a dark mode theme needs a color that's 20% lighter than the brand color #22cc99. Convert to HSL → adjust lightness → convert back to HEX for CSS. Much faster than mental math."
            },
            {
                heading: "Tips",
                list: [
                    "HSL is best for programmatic color manipulation (adjust L for shades)",
                    "HEX is most common in CSS and design tools",
                    "RGB(a) needed when working with canvas or WebGL",
                    "HSL hue 0=red, 120=green, 240=blue"
                ]
            }
        ],
        cta: { label: "Try Color Converter →", toolRoute: "/color-converter" },
        relatedSlugs: ["text-case-converter", "hash-generator", "regex-tester"],
        faq: [
            { q: "Is Color Converter free?", a: "Yes, completely free." },
            {
                q: "Does it support alpha/transparency?",
                a: "The converter handles RGB and HEX. RGBA/HSLA support depends on the current version of the tool."
            },
            {
                q: "What is the HEX format?",
                a: "HEX is a 6-digit hexadecimal color code (#RRGGBB) where each pair represents red, green, and blue from 00 to FF."
            }
        ]
    },

    "csv-to-json-converter": {
        slug: "csv-to-json-converter",
        title: "CSV to JSON Converter — Parse CSV Online",
        metaDescription:
            "Convert CSV data to JSON with header row support. Handles quoted fields and special characters. Free, browser-based on DevDeck.",
        metaKeywords: "csv to json, csv converter, parse csv online, csv parser, convert csv to json",
        intro: "CSV is the universal format for spreadsheet exports and database dumps, but modern APIs and apps expect JSON. Convert CSV to JSON instantly without writing a single line of code.",
        sections: [
            {
                heading: "What is CSV to JSON Conversion?",
                body: "CSV (Comma-Separated Values) stores tabular data as plain text rows. JSON (JavaScript Object Notation) is a nested key-value format used by APIs and web apps. Converting between them maps column headers to JSON keys and row values to JSON values."
            },
            {
                heading: "Why Convert CSV to JSON?",
                body: "REST APIs consume JSON. If you export data from Excel, Google Sheets, or a database, it comes out as CSV. Converting to JSON lets you directly use that data in a Node.js script, a POST request body, or a JavaScript application without writing a parser."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Instant CSV → JSON conversion in browser",
                    "Handles header rows, quoted fields, commas inside values",
                    "Output is formatted and readable",
                    "No data leaves your browser",
                    "Supports large files"
                ]
            },
            {
                heading: "How to Use CSV to JSON Converter",
                steps: [
                    "Paste your CSV data or upload a .csv file",
                    "Check that the first row is headers (toggle if needed)",
                    "View the JSON output instantly",
                    "Copy or download the result"
                ]
            },
            {
                heading: "Example Use Case",
                body: "You exported a list of users from a MySQL database as CSV. You need to seed a new MongoDB collection with that data. Paste the CSV, get a JSON array of objects, paste into your Node.js seed script — done in under a minute."
            },
            {
                heading: "Tips",
                list: [
                    "Ensure your CSV has a header row for meaningful JSON keys",
                    "Quoted fields with commas are handled correctly",
                    "Empty cells become null or empty string in JSON",
                    "Use the YAML/JSON converter after if you need YAML output"
                ]
            }
        ],
        cta: { label: "Try CSV to JSON Converter →", toolRoute: "/csv-json" },
        relatedSlugs: ["json-viewer", "yaml-to-json-converter", "text-diff-checker"],
        faq: [
            { q: "Is CSV to JSON Converter free?", a: "Yes, completely free." },
            { q: "Does it store my data?", a: "No. All processing is client-side in your browser." },
            { q: "Can it handle large CSV files?", a: "Yes. The converter uses PapaParse which handles large files efficiently." }
        ]
    },

    "hash-generator": {
        slug: "hash-generator",
        title: "Hash Generator — MD5, SHA-256, SHA-512 Online",
        metaDescription: "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes from any text. Runs entirely in browser. Free on DevDeck.",
        metaKeywords: "hash generator, md5 hash, sha256 online, sha512 generator, checksum tool, cryptographic hash",
        intro: "Cryptographic hashes are one-way fingerprints of data. Use them to verify file integrity, store passwords safely, generate checksums, or debug HMAC signatures — all without sending data to any server.",
        sections: [
            {
                heading: "What is a Hash Generator?",
                body: "A hash generator applies a cryptographic hash function to any input and produces a fixed-length hexadecimal digest. The same input always produces the same hash; any change to the input produces a completely different hash."
            },
            {
                heading: "Why Use Cryptographic Hashes?",
                body: "Hashes are used everywhere in software: passwords stored in databases are hashed (never stored in plain text), file integrity checks compare SHA-256 hashes, digital signatures rely on hash functions, and Git commit IDs are SHA-1 hashes."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes",
                    "All algorithms computed simultaneously",
                    "Real-time hashing as you type",
                    "100% client-side — your data never leaves the browser",
                    "Copy any hash with one click"
                ]
            },
            {
                heading: "How to Use Hash Generator",
                steps: [
                    "Type or paste any text into the input",
                    "All four hash outputs update instantly",
                    "Select the algorithm you need",
                    "Click to copy the hash"
                ]
            },
            {
                heading: "Example Use Case",
                body: "A developer needs to verify a downloaded file's integrity. The file host publishes a SHA-256 checksum. Paste the file contents (or the canonical string) into the hash generator, compare the SHA-256 output to the published checksum — if they match, the file is unmodified."
            },
            {
                heading: "Tips",
                list: [
                    "MD5 and SHA-1 are broken for security — use SHA-256 or SHA-512 for cryptographic purposes",
                    "MD5 is still fine for non-security checksums and deduplication",
                    "Hash output is always the same length regardless of input size",
                    "Hashing is deterministic but irreversible — you cannot recover the original from the hash"
                ]
            }
        ],
        cta: { label: "Try Hash Generator →", toolRoute: "/hash-generator" },
        relatedSlugs: ["base64-text-encoder", "jwt-decoder", "password-generator"],
        faq: [
            { q: "Is Hash Generator free?", a: "Yes, completely free." },
            { q: "Does it store my data?", a: "No. All hashing runs locally in your browser using the Web Crypto API." },
            {
                q: "Which hash algorithm should I use?",
                a: "Use SHA-256 or SHA-512 for security-sensitive purposes. MD5/SHA-1 are acceptable for checksums and deduplication only."
            }
        ]
    },

    "image-resizer": {
        slug: "image-resizer",
        title: "Image Resizer & Cropper — Resize Images Online",
        metaDescription:
            "Crop, scale, and rotate images with live canvas preview. Download resized images as PNG. No upload to server. Free on DevDeck.",
        metaKeywords: "image resizer, crop image online, resize image, scale photo, rotate image, image editor online",
        intro: "Resizing images for different contexts — web thumbnails, social media posts, email banners — usually requires Photoshop or similar software. Image Resizer lets you do it directly in your browser with a live preview.",
        sections: [
            {
                heading: "What is an Image Resizer?",
                body: "An image resizer changes the pixel dimensions of an image. You can scale it to a specific width/height, crop to a region, or rotate it. The output is a new image file at the target dimensions."
            },
            {
                heading: "Why Use a Browser-Based Image Resizer?",
                body: "Traditional image editors require installation and a learning curve. For quick resizing tasks — thumbnail for a blog post, avatar for a profile, banner for an email — a browser tool is faster. And because it runs locally, your images never leave your device."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Drag and drop or select any image",
                    "Live canvas preview while you resize",
                    "Set exact pixel dimensions",
                    "Crop, scale, and rotate in one place",
                    "Download resized PNG — no server upload"
                ]
            },
            {
                heading: "How to Use Image Resizer",
                steps: [
                    "Drop an image onto the canvas or click to select",
                    "Set target width and height",
                    "Drag to crop or use controls to rotate",
                    "Click Download to save the resized PNG"
                ]
            },
            {
                heading: "Example Use Case",
                body: "You need a 200×200 avatar image from a 2000×1500 landscape photo. Open Image Resizer, drop the photo, set width and height to 200, drag to center on the face, download — finished in 30 seconds."
            },
            {
                heading: "Tips",
                list: [
                    "Lock aspect ratio when scaling to avoid distortion",
                    "Use PNG output for images with transparency",
                    "For web use, aim for files under 200KB for fast loading",
                    "Combine with Base64 Image tool to embed the resized image directly"
                ]
            }
        ],
        cta: { label: "Try Image Resizer →", toolRoute: "/image-resizer" },
        relatedSlugs: ["base64-image-converter", "aspect-ratio-calculator", "qr-code-generator"],
        faq: [
            { q: "Is Image Resizer free?", a: "Yes, completely free." },
            { q: "Does it upload my images?", a: "No. All processing happens in your browser via HTML5 Canvas. Nothing is uploaded." },
            { q: "What formats can I input?", a: "PNG, JPG, GIF, WebP, and most other browser-renderable image formats." }
        ]
    },

    "json-viewer": {
        slug: "json-viewer",
        title: "JSON Viewer & Formatter — Validate and Pretty Print JSON",
        metaDescription: "Format, validate, and browse JSON data in your browser. Supports tree view and error highlighting. Free on DevDeck.",
        metaKeywords: "json viewer, json formatter, json validator, pretty print json, json tree viewer, format json online",
        intro: "Raw JSON from APIs is often a single unreadable line. JSON Viewer formats it instantly, validates the syntax, and lets you browse the structure as an expandable tree — no IDE required.",
        sections: [
            {
                heading: "What is a JSON Viewer?",
                body: "A JSON viewer parses a JSON string and presents it in a structured, readable format. It shows indentation, highlights keys and values, detects syntax errors, and often provides a collapsible tree view for nested objects."
            },
            {
                heading: "Why Use a JSON Viewer?",
                body: "When debugging API responses, config files, or log entries, raw JSON is hard to read. A viewer formats it with correct indentation, makes errors obvious with highlighting, and lets you navigate nested structures by expanding/collapsing nodes."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Instant JSON formatting and pretty-printing",
                    "Syntax error detection with line numbers",
                    "Collapsible tree view for nested JSON",
                    "Supports large payloads",
                    "Copy formatted JSON with one click"
                ]
            },
            {
                heading: "How to Use JSON Viewer",
                steps: [
                    "Paste raw JSON into the input area",
                    "The formatted and validated output appears instantly",
                    "Expand/collapse nodes in the tree view",
                    "Copy the formatted JSON or fix errors highlighted in red"
                ]
            },
            {
                heading: "Example Use Case",
                body: "You're debugging a REST API response. The server returns a minified JSON blob. Paste it into JSON Viewer — you instantly see the formatted structure, find the missing `user.address` field that's causing a null error, and understand the response shape."
            },
            {
                heading: "Tips",
                list: [
                    "Use Ctrl+A to select all in the input before pasting new content",
                    "JSON keys must be double-quoted — single quotes cause parse errors",
                    "Trailing commas are not valid JSON",
                    "Use YAML/JSON converter if you need YAML output of your JSON"
                ]
            }
        ],
        cta: { label: "Try JSON Viewer →", toolRoute: "/json-viewer" },
        relatedSlugs: ["csv-to-json-converter", "yaml-to-json-converter", "jwt-decoder"],
        faq: [
            { q: "Is JSON Viewer free?", a: "Yes, completely free." },
            { q: "Does it store my JSON data?", a: "No. All processing is local in your browser." },
            {
                q: "What is the difference between JSON and YAML?",
                a: "JSON uses braces and brackets; YAML uses indentation. YAML is more human-readable. The YAML/JSON Converter tool on DevDeck converts between them."
            }
        ]
    },

    "jwt-decoder": {
        slug: "jwt-decoder",
        title: "JWT Toolkit — Decode & Generate JSON Web Tokens Online",
        metaDescription:
            "Decode, inspect, and generate signed JWT tokens in your browser. Supports HMAC (HS256/384/512), RSA, RSA-PSS, ECDSA, and EdDSA. No server required.",
        metaKeywords:
            "jwt toolkit, jwt decoder, jwt generator, sign jwt online, json web token, hs256, rs256, es256, ecdsa jwt, ed25519 jwt, jwt debugger",
        intro: "JWT Toolkit is a complete JWT workbench. Decode any token to inspect its claims, and generate cryptographically signed JWTs using five algorithm families — all in-browser with zero server calls.",
        sections: [
            {
                heading: "What is a JWT?",
                body: "A JSON Web Token is a compact, URL-safe token used for authentication and authorization. It has three dot-separated parts: Header (algorithm + type), Payload (claims like user ID and expiry), and Signature (cryptographic proof). Format: `xxxxx.yyyyy.zzzzz`"
            },
            {
                heading: "Decode: Inspect Any JWT",
                body: "Paste any JWT into the Decode tab and the toolkit instantly splits, Base64URL-decodes, and formats all three sections. The `exp` claim is shown as a human-readable date with an expiry countdown. Expired tokens are highlighted. All 18 standard JWT claim names are documented inline."
            },
            {
                heading: "Generate: Sign Tokens In-Browser",
                body: "The Generate tab lets you create real, cryptographically signed JWTs. Choose your algorithm, edit the header and payload JSON, provide a secret or key, and a live token is produced with a 300ms debounce. Use 'Test in Decoder' to immediately verify what you just signed."
            },
            {
                heading: "Supported Algorithms",
                list: [
                    "HMAC — HS256, HS384, HS512 (shared secret, Base64 or plain text)",
                    "RSA — RS256, RS384, RS512 (RSASSA-PKCS1-v1_5, PEM private key)",
                    "RSA-PSS — PS256, PS384, PS512 (probabilistic signature scheme)",
                    "ECDSA — ES256 (P-256), ES384 (P-384), ES512 (P-521)",
                    "EdDSA — Ed25519 (fast, modern elliptic curve)"
                ]
            },
            {
                heading: "Key Pair Generation",
                body: "For asymmetric algorithms (RSA, RSA-PSS, ECDSA, EdDSA), click 'Generate Key Pair' to create a browser-native cryptographic key pair via the Web Crypto API. The private key is used for signing and the public key is shown with a copy button — ready to paste into your verification config."
            },
            {
                heading: "Example: Debug an Expired Session",
                body: "A user reports being logged out unexpectedly. Grab their JWT from DevTools → Network → Authorization header. Paste it into the Decode tab: the `exp` claim shows the token expired 2 hours ago. Confirmed — not a bug, just an expired session."
            },
            {
                heading: "Tips",
                list: [
                    "Never paste production JWTs into external tools — this toolkit is 100% local",
                    "The 'exp' claim is a Unix timestamp — the toolkit converts it to a readable date automatically",
                    "Algorithm change resets the key pair and syncs the header's `alg` field",
                    "Use EdDSA (Ed25519) for new systems — it's faster and more secure than RSA",
                    "Use JWT for stateless auth, not for storing sensitive data in the payload"
                ]
            }
        ],
        cta: { label: "Open JWT Toolkit →", toolRoute: "/jwt-decoder" },
        relatedSlugs: ["hash-generator", "json-viewer", "base64-text-encoder"],
        faq: [
            { q: "Is JWT Toolkit free?", a: "Yes, completely free." },
            {
                q: "Does it send my token to a server?",
                a: "No. All decoding and signing happens locally in your browser. Nothing is ever sent to a server."
            },
            {
                q: "Can it verify the JWT signature?",
                a: "Yes. In the Decode tab, provide your secret (HMAC) or public key PEM (RSA/ECDSA/EdDSA) and the signature is verified in-browser using the Web Crypto API."
            },
            {
                q: "Which algorithms are supported for generation?",
                a: "HS256/384/512 (HMAC), RS256/384/512 (RSA), PS256/384/512 (RSA-PSS), ES256/384/512 (ECDSA), and Ed25519 (EdDSA)."
            }
        ]
    },

    "lorem-ipsum-generator": {
        slug: "lorem-ipsum-generator",
        title: "Lorem Ipsum Generator — Placeholder Text Online",
        metaDescription: "Generate lorem ipsum placeholder text by paragraphs, sentences, or words. Free browser-based tool on DevDeck.",
        metaKeywords: "lorem ipsum generator, placeholder text, dummy text generator, lorem ipsum online, filler text",
        intro: "Lorem ipsum is the industry-standard placeholder text used in design mockups, wireframes, and prototypes. Generate exactly the amount you need — by paragraphs, sentences, or words — instantly.",
        sections: [
            {
                heading: "What is Lorem Ipsum?",
                body: "Lorem ipsum is dummy text derived from a passage of Cicero's De Finibus Bonorum et Malorum from 45 BC. It has been the standard placeholder text for typesetting since the 1500s. It looks natural because it has similar word length distribution to real Latin text, without meaningful content distracting reviewers."
            },
            {
                heading: "Why Use Lorem Ipsum?",
                body: "Using real content in mockups causes reviewers to focus on the words rather than the layout. Lorem ipsum shifts attention to design: typography, spacing, alignment, and visual hierarchy. It's a communication tool between designers and developers."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Generate text by paragraphs, sentences, or words",
                    "Configurable output length",
                    "Copy to clipboard with one click",
                    "Instant — no waiting",
                    "Free with no account needed"
                ]
            },
            {
                heading: "How to Use Lorem Ipsum Generator",
                steps: [
                    "Choose output type: paragraphs, sentences, or words",
                    "Set the quantity you need",
                    "Click Generate",
                    "Copy and paste into your design or prototype"
                ]
            },
            {
                heading: "Example Use Case",
                body: "You're building a blog template and need content to test how long paragraphs look in the design. Generate 3 paragraphs of lorem ipsum, paste into the template, and adjust line-height and font-size until the reading experience is comfortable."
            },
            {
                heading: "Tips",
                list: [
                    "Use sentence-level generation for UI labels and button text mockups",
                    "Use paragraph-level for blog post and article layout testing",
                    "Word-level is good for short placeholder labels",
                    "Never ship lorem ipsum text to production — replace before launch"
                ]
            }
        ],
        cta: { label: "Try Lorem Ipsum Generator →", toolRoute: "/lorem-ipsum" },
        relatedSlugs: ["word-counter", "text-case-converter", "text-diff-checker"],
        faq: [
            { q: "Is Lorem Ipsum Generator free?", a: "Yes, completely free." },
            {
                q: "Where does lorem ipsum come from?",
                a: "It's derived from Cicero's philosophical work De Finibus Bonorum et Malorum, scrambled to be meaningless."
            },
            {
                q: "Can I customize the generated text?",
                a: "You can set the quantity (paragraphs/sentences/words). Custom vocabulary is not supported."
            }
        ]
    },

    "number-base-converter": {
        slug: "number-base-converter",
        title: "Number Base Converter — Binary, Hex, Octal, Decimal",
        metaDescription: "Convert numbers between binary, octal, decimal, and hexadecimal instantly. Supports large numbers. Free on DevDeck.",
        metaKeywords: "number base converter, binary to decimal, hex to decimal, octal converter, base conversion, binary hex octal",
        intro: "Computers think in binary. Programmers read hex. Humans use decimal. Number Base Converter instantly translates between binary (base-2), octal (base-8), decimal (base-10), and hexadecimal (base-16) — all at once.",
        sections: [
            {
                heading: "What is Number Base Conversion?",
                body: "Number base conversion changes how a number is represented without changing its value. The number 255 in decimal is FF in hex, 11111111 in binary, and 377 in octal. They're all the same value, just written in different numeral systems."
            },
            {
                heading: "Why Use a Number Base Converter?",
                body: "Low-level programming, networking, and computer science require working across multiple bases. IP addresses and subnet masks are often shown in decimal and binary simultaneously. Color codes use hex. Assembly and bitwise operations require binary. Having instant cross-base conversion saves mental effort."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Convert between binary, octal, decimal, and hex simultaneously",
                    "All representations update as you type",
                    "Supports large numbers",
                    "No installation needed",
                    "Copy any base representation instantly"
                ]
            },
            {
                heading: "How to Use Number Base Converter",
                steps: [
                    "Enter a number in any base field",
                    "All other bases update instantly",
                    "Copy the representation you need",
                    "Clear and enter a new number"
                ]
            },
            {
                heading: "Example Use Case",
                body: "Working on a bitwise permissions system where flags are stored as integers. The value 45 in decimal needs to be checked as bits. Enter 45 → binary shows `101101` → bits 0, 2, 3, 5 are set → permissions map confirmed."
            },
            {
                heading: "Tips",
                list: [
                    "Hex values are often prefixed with 0x in code (0xFF = 255)",
                    "Binary values can be prefixed with 0b (0b11111111 = 255)",
                    "Octal is less common today but used in Unix file permissions (chmod 755)",
                    "All conversions are integers — this tool does not handle fractional bases"
                ]
            }
        ],
        cta: { label: "Try Number Base Converter →", toolRoute: "/number-base" },
        relatedSlugs: ["hash-generator", "timestamp-converter", "regex-tester"],
        faq: [
            { q: "Is Number Base Converter free?", a: "Yes, completely free." },
            { q: "Does it support floating point numbers?", a: "No. The converter handles integers only." },
            {
                q: "What is hexadecimal used for?",
                a: "Hex is used for color codes (#FF0000), memory addresses, binary file inspection, and network packets."
            }
        ]
    },

    "password-generator": {
        slug: "password-generator",
        title: "Password Generator & Strength Meter",
        metaDescription:
            "Generate secure random passwords with custom length and character sets. Analyze password strength with crack-time estimation. Free on DevDeck.",
        metaKeywords: "password generator, strong password, random password, password strength meter, secure password, password creator",
        intro: "Weak passwords are the leading cause of account breaches. Password Generator creates cryptographically random passwords with configurable complexity, and the built-in strength meter tells you exactly how secure each password is.",
        sections: [
            {
                heading: "What is a Password Generator?",
                body: "A password generator creates random character sequences using a cryptographically secure random number generator. You configure the length and which character sets to include (uppercase, lowercase, numbers, symbols), and it produces a password that's practically impossible to brute-force."
            },
            {
                heading: "Why Generate Passwords Instead of Creating Your Own?",
                body: "Humans are terrible at creating truly random passwords. We reuse patterns, use dictionary words, and avoid symbols. A generator produces genuinely unpredictable passwords, making dictionary attacks and pattern-based brute-force ineffective."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Cryptographically secure random generation",
                    "Configurable length (8–128+ characters)",
                    "Toggle uppercase, lowercase, numbers, symbols",
                    "Built-in strength meter with crack-time estimation",
                    "Copy to clipboard — nothing stored anywhere"
                ]
            },
            {
                heading: "How to Use Password Generator",
                steps: [
                    "Set desired password length",
                    "Toggle character sets (uppercase, lowercase, numbers, symbols)",
                    "Click Generate (or it updates as you adjust)",
                    "Check strength meter",
                    "Copy and store in a password manager"
                ]
            },
            {
                heading: "Example Use Case",
                body: "Setting up a new server database user. Requirements: 20+ characters, must include symbols. Set length to 24, enable all character sets, generate, check strength meter (should show 'Very Strong'), copy into your password manager."
            },
            {
                heading: "Tips",
                list: [
                    "Use a password manager (1Password, Bitwarden) to store generated passwords",
                    "Never reuse passwords across sites",
                    "16+ characters with mixed types is effectively uncrackable with current hardware",
                    "For passphrases, use 4+ random words instead (diceware method)"
                ]
            }
        ],
        cta: { label: "Try Password Generator →", toolRoute: "/password-tools" },
        relatedSlugs: ["hash-generator", "uuid-generator", "base64-text-encoder"],
        faq: [
            { q: "Is Password Generator free?", a: "Yes, completely free." },
            { q: "Are generated passwords stored?", a: "No. Passwords are generated client-side and never sent to any server." },
            { q: "How long should my password be?", a: "At minimum 12 characters. 16+ with mixed character types is recommended for most accounts." }
        ]
    },

    "qr-code-generator": {
        slug: "qr-code-generator",
        title: "QR Code Generator — Free Online QR Creator",
        metaDescription: "Generate QR codes from any text or URL. Add custom logo overlay. Download as PNG. Free browser-based tool on DevDeck.",
        metaKeywords: "qr code generator, free qr code, qr creator, qr code online, generate qr, qr from url",
        intro: "QR codes bridge the physical and digital world. Generate a QR code for any URL, contact, WiFi credentials, or text — instantly, with optional logo overlay and downloadable PNG.",
        sections: [
            {
                heading: "What is a QR Code?",
                body: "A QR (Quick Response) code is a 2D barcode that smartphones can scan with their camera to instantly access a URL, read text, connect to WiFi, or open contact info. They encode data as a grid of black and white squares."
            },
            {
                heading: "Why Use a QR Code Generator?",
                body: "QR codes appear on business cards, product packaging, event posters, restaurant menus, and marketing materials. Generating one requires no app — just a browser. You can customize the content and download a high-resolution PNG for print or digital use."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Generate QR codes from any text, URL, or data string",
                    "Add a logo or icon overlay to the center",
                    "Download as PNG at multiple resolutions",
                    "Instant generation — no server required",
                    "Free with no account"
                ]
            },
            {
                heading: "How to Use QR Code Generator",
                steps: [
                    "Type or paste the URL or text to encode",
                    "QR code generates instantly",
                    "Optionally upload a logo for the center overlay",
                    "Adjust size if needed",
                    "Click Download to save as PNG"
                ]
            },
            {
                heading: "Example Use Case",
                body: "Printing flyers for an event. You want attendees to scan to register. Enter the registration URL → generate QR code → download PNG → drop into your design file. Add the QR to the flyer and print."
            },
            {
                heading: "Tips",
                list: [
                    "Shorter URLs produce simpler, more scannable QR codes",
                    "Use URL shortener to simplify long links before encoding",
                    "Test scan quality before mass printing",
                    "Minimum print size is about 2cm × 2cm for reliable scanning"
                ]
            }
        ],
        cta: { label: "Try QR Code Generator →", toolRoute: "/qr-generator" },
        relatedSlugs: ["url-shortener", "base64-image-converter", "image-resizer"],
        faq: [
            { q: "Is QR Code Generator free?", a: "Yes, completely free." },
            {
                q: "What can I encode in a QR code?",
                a: "Any text or URL. Common uses: website links, WiFi passwords, contact vCards, plain text messages."
            },
            {
                q: "Does adding a logo reduce scannability?",
                a: "QR codes have built-in error correction. A centered logo covering up to ~30% of the code still scans correctly."
            }
        ]
    },

    "regex-tester": {
        slug: "regex-tester",
        title: "Regex Tester — Test Regular Expressions Online",
        metaDescription: "Test regular expressions with live match highlighting. Supports JavaScript regex flags. Free on DevDeck.",
        metaKeywords: "regex tester, regular expression tester, regex online, test regex, regexp validator, regex debugger",
        intro: "Regular expressions are powerful but notoriously hard to write and debug. DevDeck's Regex Tester has two modes: a live Tester that highlights matches as you type, and a Generator that builds regex patterns from plain-English descriptions — so you can test patterns you already know and create ones you don't.",
        sections: [
            {
                heading: "What is a Regex Tester?",
                body: "A regex tester provides an interactive environment where you enter a regular expression pattern and a test string, and it highlights all matches in real time. It shows captured groups, match positions, and whether the pattern compiles without errors."
            },
            {
                heading: "Why Use a Regex Tester?",
                body: "Regex syntax is dense and error-prone. A small typo creates a pattern that matches nothing — or worse, matches everything. Real-time visual feedback shows exactly what your pattern captures, catches syntax errors immediately, and lets you iterate without rerunning code."
            },
            {
                heading: "Two Tabs: Tester and Generator",
                body: "The Tester tab is the classic experience: enter a pattern, set flags, paste text, and matches light up instantly. The Generator tab lets you describe what you want in plain English — like 'email address' or 'ISO date' — and the tool returns a ready-to-use regex pattern with a plain-language explanation of each part."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Live match highlighting as you type",
                    "Shows all captures and groups",
                    "Supports flags: g, i, m, s",
                    "Syntax error messages shown immediately",
                    "Generator tab: describe the pattern, get the regex",
                    "Transfer generated regex directly to the Tester tab"
                ]
            },
            {
                heading: "How to Use Regex Tester",
                steps: [
                    "Switch to the Tester tab to test an existing pattern",
                    "Enter your regex pattern (without slashes) and set flags",
                    "Paste test text — matches highlight in real time",
                    "Or switch to the Generator tab",
                    "Type a plain-English description of the pattern you need",
                    "Click 'Use in Tester' to transfer the generated pattern for further testing"
                ]
            },
            {
                heading: "Example Use Case",
                body: "Writing a validation regex for email addresses. Switch to Generator, type 'email address', copy the generated pattern, then switch to Tester and paste a list of test emails (valid and invalid). The highlighter shows which ones match — adjust the pattern until only valid emails highlight."
            },
            {
                heading: "Tips",
                list: [
                    "Use ^ and $ anchors to match full string, not just a substring",
                    "The g flag finds all matches, not just the first",
                    "Use (?:...) for non-capturing groups",
                    "Escape special characters like . * + ? with backslash",
                    "Use the Generator for common patterns (UUID, ISO date, phone, email) instead of writing from scratch"
                ]
            }
        ],
        cta: { label: "Try Regex Tester →", toolRoute: "/regex-tester" },
        relatedSlugs: ["text-diff-checker", "json-viewer", "text-case-converter"],
        faq: [
            { q: "Is Regex Tester free?", a: "Yes, completely free." },
            {
                q: "Which regex flavor does it use?",
                a: "JavaScript regex (ECMAScript). Most patterns are compatible with other languages with minor adjustments."
            },
            {
                q: "Does it support lookahead and lookbehind?",
                a: "Yes. JavaScript regex supports (?=...) lookahead and (?<=...) lookbehind in modern browsers."
            }
        ]
    },

    "text-case-converter": {
        slug: "text-case-converter",
        title: "Text Case Converter — UPPER, lower, camelCase",
        metaDescription:
            "Transform text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, PascalCase, and kebab-case. Free on DevDeck.",
        metaKeywords: "text case converter, camelcase converter, snake case, uppercase lowercase, title case, kebab case, pascal case",
        intro: "Different coding conventions demand different text cases: API fields use camelCase, Python uses snake_case, CSS uses kebab-case, constants use UPPER_CASE. Text Case Converter transforms any text between all these formats instantly.",
        sections: [
            {
                heading: "What is Text Case Conversion?",
                body: "Text case conversion changes the capitalization format of a string. The same phrase 'hello world' becomes HELLO WORLD, Hello World, helloWorld, hello_world, or hello-world depending on the target convention."
            },
            {
                heading: "Why Use a Text Case Converter?",
                body: "Renaming variables, formatting database column names, preparing API field names, or transforming user input — case conversion is a constant developer task. Doing it manually is error-prone especially for multi-word identifiers. The converter handles it instantly."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Converts to UPPER, lower, Title, camelCase, PascalCase, snake_case, kebab-case",
                    "Processes multi-word strings correctly",
                    "Copy each format independently",
                    "Handles special characters and numbers",
                    "Instant — no page reload"
                ]
            },
            {
                heading: "How to Use Text Case Converter",
                steps: [
                    "Paste or type your text",
                    "All case variants appear immediately",
                    "Click to copy the format you need",
                    "Use for variable names, column names, labels, etc."
                ]
            },
            {
                heading: "Example Use Case",
                body: "You have a CSV column named `First Name` and need to map it to a JavaScript object key. Enter `First Name` → camelCase gives `firstName`, snake_case gives `first_name`, PascalCase gives `FirstName`. Pick the one matching your codebase convention."
            },
            {
                heading: "Tips",
                list: [
                    "camelCase: JavaScript object keys, JSON fields",
                    "PascalCase: React components, class names",
                    "snake_case: Python variables, SQL columns",
                    "kebab-case: CSS class names, URL slugs, HTML attributes",
                    "UPPER_CASE: constants in most languages"
                ]
            }
        ],
        cta: { label: "Try Text Case Converter →", toolRoute: "/text-case" },
        relatedSlugs: ["word-counter", "text-diff-checker", "lorem-ipsum-generator"],
        faq: [
            { q: "Is Text Case Converter free?", a: "Yes, completely free." },
            {
                q: "Does it handle numbers and special characters?",
                a: "Yes. Numbers are kept in place. Special characters are handled per each format's rules."
            },
            {
                q: "What is the difference between camelCase and PascalCase?",
                a: "camelCase starts lowercase (helloWorld), PascalCase starts uppercase (HelloWorld)."
            }
        ]
    },

    "text-diff-checker": {
        slug: "text-diff-checker",
        title: "Diffchecker Online — Compare Two Files with Split, Unified & Merge",
        metaDescription: "Free diffchecker that compares two text files side-by-side or unified. Highlights added, removed, and changed lines. Merge changes hunk by hunk. Works for JSON, code, configs, and documents.",
        metaKeywords: "text diff, diffchecker, diff checker, compare two files, json diff, compare text online, diff tool, unified diff, split diff, merge changes, online diff checker, code diff",
        intro: "Spotting differences between two versions of text — code, JSON, config files, or documents — is tedious without the right tool. DevDeck's diffchecker shows exactly what changed, line by line, with split view alignment, merge controls, and inline word-level highlighting.",
        sections: [
            {
                heading: "What Is a Diffchecker?",
                body: "A diffchecker compares two text inputs and highlights every addition, deletion, and unchanged line. Added lines appear in green, removed lines in red. Unlike reading two files side by side manually, a diff tool makes changes impossible to miss — even a single character difference is immediately visible."
            },
            {
                heading: "Three View Modes",
                list: [
                    "Split view: two panels side by side with aligned blank rows so every change sits at the same vertical position",
                    "Unified view: a single panel showing both sides with dual line number columns (original left, modified right) — supports hunk merge just like split view",
                    "Inline view: a single block with word-level or character-level highlights directly inside the text"
                ]
            },
            {
                heading: "Hunk-Based Merge (Cherry-Pick Changes)",
                body: "Unlike basic diff tools that only show differences, DevDeck lets you merge changes one hunk at a time."
                    + " Click any highlighted line in Split or Unified view to activate that hunk. A merge bar appears showing"
                    + " a preview of the removed and added content, 'Change N of M' navigation, and merge buttons."
                    + " Use 'Use original ←' to push the left side into the modified panel, or 'Use modified →' to accept the right side."
                    + " After merging, the bar automatically advances to the next hunk."
            },
            {
                heading: "Auto-Prettify for JSON",
                body: "Paste minified or unformatted JSON and click Prettify — the tool detects JSON automatically and formats both panels with 2-space indentation before running the diff. This makes JSON diffs far more readable since structural changes align at the property level rather than being buried in a single-line blob."
            },
            {
                heading: "How to Use the Diffchecker",
                steps: [
                    "Paste the original text in the left (Original) panel",
                    "Paste the modified text in the right (Modified) panel",
                    "Differences highlight automatically — green = added, red = removed",
                    "Switch between Split, Unified, or Inline view using the toggle",
                    "In Split or Unified view, click any highlighted line to open the merge bar",
                    "Use Prettify to auto-format JSON before comparing",
                    "Copy Diff exports changed lines as +/- prefixed text; Copy Patch exports unified diff format"
                ]
            },
            {
                heading: "Common Use Cases",
                list: [
                    "JSON API response comparison — spot added or removed fields between versions",
                    "Config file auditing — compare .env, YAML, or TOML files across environments",
                    "Code review — paste two versions of a function to see what changed",
                    "Document revision — compare draft vs final to catch edits",
                    "AI output comparison — diff two LLM responses to see how prompts affect output",
                    "Log file analysis — compare log snapshots to find new errors"
                ]
            },
            {
                heading: "Diff Tool vs Git Diff",
                body: "Git diff is the right tool for comparing file history tracked in a repository. DevDeck's diffchecker is better for ad-hoc comparisons: when you don't have Git history, when comparing clipboard content, when reviewing AI outputs, or when you need to merge individual changes interactively. The Copy Patch button exports a standard unified diff patch that can be applied with `git apply` or `patch`."
            },
            {
                heading: "Tips for Better Diffs",
                list: [
                    "Run Prettify before diffing JSON — structural diffs are much cleaner on formatted text",
                    "Use Swap to quickly reverse which side is original and which is modified",
                    "Switch to Inline + Words mode for prose documents where word-level changes matter more than line breaks",
                    "Use Inline + Chars mode for single-line changes like URL or variable name diffs",
                    "The similarity percentage in the stats bar tells you at a glance how much changed"
                ]
            }
        ],
        cta: { label: "Open Diffchecker →", toolRoute: "/text-diff" },
        relatedSlugs: ["json-viewer", "text-case-converter", "regex-tester"],
        faq: [
            { q: "Is this diffchecker free?", a: "Yes, completely free and runs 100% in your browser — nothing is sent to a server." },
            { q: "Does it support JSON diff?", a: "Yes. Paste any JSON and use the Prettify button to format it before diffing. The diff then shows structural changes cleanly at the property level." },
            { q: "What is the difference between split view and unified diff?", a: "Split view shows original and modified side by side in two panels with aligned blank rows so changes sit at the same vertical position. Unified diff shows both versions in a single panel with +/- prefixed lines and dual line number columns." },
            { q: "What does the merge feature do?", a: "Clicking a changed line in Split or Unified view activates that hunk (contiguous block of changes). A merge bar appears showing a preview of the removed and added content, plus buttons to cherry-pick that hunk — accept the modified version into the original, or push the original version into the modified panel. Other hunks are unaffected. After each merge the bar advances to the next hunk automatically." },
            { q: "Can I use this for code comparison?", a: "Yes for snippets and small files. For large codebases with Git history, use Git diff. For ad-hoc code comparisons without Git, this tool works well." },
            { q: "What is Copy Patch?", a: "Copy Patch exports the diff in unified diff format — the same format as `git diff` output. You can apply it with `git apply` or the Unix `patch` command." }
        ]
    },

    "timestamp-converter": {
        slug: "timestamp-converter",
        title: "Unix Timestamp Converter — Epoch to Date & Time",
        metaDescription:
            "Convert Unix timestamps to human-readable dates and dates back to Unix epoch time. Supports seconds and milliseconds. Free on DevDeck.",
        metaKeywords: "unix timestamp converter, epoch to date, timestamp to date, date to unix timestamp, epoch time, unix time",
        intro: "Unix timestamps are the number of seconds (or milliseconds) since January 1, 1970 UTC. They appear in logs, databases, and APIs everywhere — but `1714492800` is unreadable to humans. Timestamp Converter translates instantly.",
        sections: [
            {
                heading: "What is a Unix Timestamp?",
                body: "A Unix timestamp (epoch time) is the number of seconds elapsed since 00:00:00 UTC on January 1, 1970 (the Unix epoch). It's a universal, timezone-independent way to represent a moment in time used across databases, APIs, file systems, and logs."
            },
            {
                heading: "Why Convert Timestamps?",
                body: "Debugging logs, validating JWT expiry times (the `exp` claim is a Unix timestamp), reading database records with datetime columns stored as integers, or working with APIs that return epoch time — all require converting back to human-readable dates."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Convert epoch timestamp → UTC date and local time",
                    "Convert date/time → Unix timestamp",
                    "Supports seconds and milliseconds",
                    "Shows both UTC and local timezone",
                    "Current timestamp displayed in real time"
                ]
            },
            {
                heading: "How to Use Timestamp Converter",
                steps: [
                    "Enter a Unix timestamp (seconds or milliseconds)",
                    "See the human-readable date and time instantly",
                    "Or enter a date to get the Unix timestamp",
                    "Copy the result"
                ]
            },
            {
                heading: "Example Use Case",
                body: "A JWT's `exp` field shows `1714492800`. Is the token still valid? Enter the value into Timestamp Converter → it shows April 30, 2024, 16:00:00 UTC. Compare with now — if past, the token is expired."
            },
            {
                heading: "Tips",
                list: [
                    "JavaScript Date.now() returns milliseconds since epoch",
                    "Most Unix tools use seconds",
                    "MySQL UNIX_TIMESTAMP() returns seconds",
                    "Year 2038 problem: 32-bit signed timestamps overflow on Jan 19, 2038"
                ]
            }
        ],
        cta: { label: "Try Timestamp Converter →", toolRoute: "/timestamp" },
        relatedSlugs: ["number-base-converter", "hash-generator", "uuid-generator"],
        faq: [
            { q: "Is Timestamp Converter free?", a: "Yes, completely free." },
            { q: "What is the Unix epoch?", a: "January 1, 1970, 00:00:00 UTC. All Unix timestamps count from this moment." },
            {
                q: "How do I get the current Unix timestamp in JavaScript?",
                a: "Use Math.floor(Date.now() / 1000) for seconds, or Date.now() for milliseconds."
            }
        ]
    },

    "url-parser": {
        slug: "url-parser",
        title: "URL Validator & Parser — Check URL Structure Online",
        metaDescription: "Validate URL structure, check HTTP status codes, strip UTM parameters, and inspect URL components. Free on DevDeck.",
        metaKeywords: "url validator, url parser, http status checker, check url, url structure, url components, utm stripper",
        intro: "A URL contains protocol, domain, path, query parameters, and fragments — each with its own rules. URL Validator breaks any URL into its components and checks whether it's well-formed and reachable.",
        sections: [
            {
                heading: "What is a URL Validator?",
                body: "A URL validator checks whether a URL is syntactically correct and optionally tests whether the server responds. It also parses the URL into its parts: protocol (https), host (example.com), path (/blog/post), query (?id=1), and fragment (#section)."
            },
            {
                heading: "Why Validate and Parse URLs?",
                body: "Broken links, malformed URLs with encoding issues, URLs with UTM parameters that need stripping, or redirect chains — these are everyday problems. Parsing lets you inspect each URL component, strip tracking parameters, or validate user-submitted links before storing them."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Parse any URL into its components",
                    "Validate URL structure",
                    "Check HTTP status code",
                    "Strip UTM and tracking parameters",
                    "Detect redirects"
                ]
            },
            {
                heading: "How to Use URL Validator",
                steps: [
                    "Paste the URL",
                    "View parsed components (protocol, host, path, params, fragment)",
                    "Optionally check HTTP status",
                    "Copy cleaned URL with tracking params removed"
                ]
            },
            {
                heading: "Example Use Case",
                body: "An affiliate link has 15 query parameters including UTM tags. You want the clean URL for documentation. Paste into URL Validator → view all parameters → copy the base URL without UTM parameters."
            },
            {
                heading: "Tips",
                list: [
                    "Always encode special characters in URLs (%20 for spaces)",
                    "Fragment (#section) is client-side only — not sent to server",
                    "UTM parameters are for analytics tracking — safe to strip for clean links",
                    "HTTPS is required for modern web security (HSTS)"
                ]
            }
        ],
        cta: { label: "Try URL Validator →", toolRoute: "/url-validator" },
        relatedSlugs: ["url-shortener", "regex-tester", "json-viewer"],
        faq: [
            { q: "Is URL Validator free?", a: "Yes, completely free." },
            { q: "Does it make HTTP requests?", a: "Status checking makes an HTTP request to the URL. URL parsing is purely client-side." },
            {
                q: "What are UTM parameters?",
                a: "UTM parameters (utm_source, utm_medium, utm_campaign, etc.) are tracking tags added to URLs for analytics. They don't affect the destination page."
            }
        ]
    },

    "url-shortener": {
        slug: "url-shortener",
        title: "URL Shortener — Shorten Long Links Free",
        metaDescription: "Shorten any long URL into a compact shareable link. Powered by Short.io. Free on DevDeck.",
        metaKeywords: "url shortener, shorten url, short link, short.io, link shortener, compact url",
        intro: "Long URLs are awkward in messages, tweets, and printed materials. URL Shortener converts any URL into a short, shareable link instantly — useful for social media, SMS, QR codes, and anywhere character count matters.",
        sections: [
            {
                heading: "What is a URL Shortener?",
                body: "A URL shortener takes a long URL and maps it to a short redirect URL. When someone visits the short URL, they're immediately redirected to the original destination. The short URL takes up less space and is easier to share."
            },
            {
                heading: "Why Shorten URLs?",
                body: "Twitter has a character limit. SMS messages cost per character segment. QR codes become harder to scan as content gets longer. Printed URLs in brochures need to be memorable. Short links solve all these problems and can also be tracked for click analytics."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Shorten any URL to a compact link",
                    "Powered by Short.io for reliability",
                    "Copy short link with one click",
                    "Works for any public URL",
                    "Free to use"
                ]
            },
            {
                heading: "How to Use URL Shortener",
                steps: ["Paste your long URL", "Click Shorten", "Get the short link instantly", "Copy and share"]
            },
            {
                heading: "Example Use Case",
                body: "Sharing a GitHub PR review link in a Slack message. The URL is 180 characters. Shorten it → get a compact link → paste in Slack. Cleaner message, same destination."
            },
            {
                heading: "Tips",
                list: [
                    "Combine with QR Generator to create a scannable short link",
                    "Short links can be used in print where long URLs are impractical",
                    "Use URL Validator to clean UTM params from the long URL before shortening",
                    "Short links from third-party services depend on the service staying up"
                ]
            }
        ],
        cta: { label: "Try URL Shortener →", toolRoute: "/url-shortener" },
        relatedSlugs: ["url-parser", "qr-code-generator", "hash-generator"],
        faq: [
            { q: "Is URL Shortener free?", a: "Yes, completely free." },
            { q: "What service powers the shortening?", a: "DevDeck uses Short.io for URL shortening." },
            { q: "Do shortened links expire?", a: "Link expiry depends on the Short.io service configuration." }
        ]
    },

    "uuid-generator": {
        slug: "uuid-generator",
        title: "UUID Generator — Generate UUID v4 Online",
        metaDescription: "Generate one or multiple UUID v4 values with a single click. Copy to clipboard instantly. Free on DevDeck.",
        metaKeywords: "uuid generator, guid generator, uuid v4, random uuid, unique id generator online, universally unique identifier",
        intro: "UUIDs are the standard way to generate unique identifiers without a central authority. DevDeck's UUID Generator has two modes: a Generator tab to create one or many UUID v4 values instantly, and an Inspect tab to validate and parse any UUID you already have — showing its version, variant, and format.",
        sections: [
            {
                heading: "What is a UUID?",
                body: "A UUID (Universally Unique Identifier) is a 128-bit number represented as a 32-character hexadecimal string in the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. UUID v4 is generated using random or pseudo-random numbers. There are 5.3 × 10³⁶ possible UUIDs — making collisions astronomically unlikely."
            },
            {
                heading: "Why Use UUIDs?",
                body: "Sequential integer IDs expose information (how many records exist, the order they were created). They also create challenges in distributed systems where multiple nodes insert records simultaneously. UUIDs solve both: they're opaque and can be generated independently on any client without coordination."
            },
            {
                heading: "Two Tabs: Generator and Inspect",
                body: "The Generator tab creates UUID v4 values in bulk using the browser's native crypto.randomUUID() — cryptographically secure and RFC 4122 compliant. The Inspect tab accepts an existing UUID and tells you its version (v1–v5), variant, and whether the format is valid — useful for debugging IDs that came from an external system or an unfamiliar library."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Generate single or bulk UUIDs (up to 100 at once)",
                    "RFC 4122 compliant UUID v4",
                    "Uses browser's native crypto.randomUUID()",
                    "Inspect tab validates any UUID and shows version and variant",
                    "Copy individually or all at once",
                    "Works with tool chaining — paste a UUID from another tool directly"
                ]
            },
            {
                heading: "How to Use UUID Generator",
                steps: [
                    "Generator tab: click Generate for one UUID, or set a count for bulk",
                    "Copy individual UUIDs or click Copy All",
                    "Paste into your code, database, or config",
                    "Inspect tab: paste any UUID string",
                    "The tool shows version, variant, and whether the format is valid"
                ]
            },
            {
                heading: "Example Use Case",
                body: "Seeding a database with test records. Each record needs a unique ID before insert (so foreign keys can be set up ahead of time). Generate 50 UUIDs at once, copy all, paste into the seed script. Later, use the Inspect tab to verify that IDs returned by an external API are valid v4 UUIDs."
            },
            {
                heading: "Tips",
                list: [
                    "UUID v4 is the most common — use it unless you have a specific reason for v1 or v5",
                    "UUIDs are case-insensitive — both uppercase and lowercase are valid",
                    "Storing UUIDs in databases: use a UUID type column or CHAR(36)",
                    "UUID v1 includes timestamp and MAC address — UUID v4 is preferable for privacy",
                    "Use the Inspect tab to debug IDs that fail validation in your backend — it shows exactly why"
                ]
            }
        ],
        cta: { label: "Try UUID Generator →", toolRoute: "/uuid-generator" },
        relatedSlugs: ["hash-generator", "password-generator", "timestamp-converter"],
        faq: [
            { q: "Is UUID Generator free?", a: "Yes, completely free." },
            {
                q: "Are generated UUIDs truly unique?",
                a: "UUID v4 collision probability is negligible (1 in 2¹²² for any two UUIDs). For practical purposes, they are unique."
            },
            {
                q: "What is the difference between UUID and GUID?",
                a: "They are the same thing. GUID (Globally Unique Identifier) is Microsoft's term for UUID."
            }
        ]
    },

    "word-counter": {
        slug: "word-counter",
        title: "Word Counter & Character Counter — Online Tool",
        metaDescription: "Count words, characters, lines, sentences, and paragraphs. Get reading time estimate. Free browser-based tool on DevDeck.",
        metaKeywords: "word counter, character counter, word count online, reading time calculator, text analyzer, character count",
        intro: "Whether you're writing a tweet (280 chars), a cover letter (400 words), or a blog post (800 words), knowing your word and character count is essential. Word Counter gives you complete text statistics in real time.",
        sections: [
            {
                heading: "What is a Word Counter?",
                body: "A word counter analyzes a text input and returns statistics: total words, characters (with and without spaces), sentences, paragraphs, lines, and estimated reading time. It updates in real time as you type or paste."
            },
            {
                heading: "Why Count Words and Characters?",
                body: "Platform limits require knowing character counts: Twitter (280), LinkedIn headline (220), SMS (160 per segment), meta descriptions (155). Editors set word count targets for articles. SEO requires hitting content length minimums. Reading time helps set reader expectations."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Real-time word, character, sentence, paragraph count",
                    "Reading time estimate",
                    "Character count with and without spaces",
                    "Instant — no typing submit button",
                    "Free with no account"
                ]
            },
            {
                heading: "How to Use Word Counter",
                steps: [
                    "Paste or type your text",
                    "All statistics update instantly",
                    "Check the count you need (words, chars, reading time)",
                    "Clear and paste new content anytime"
                ]
            },
            {
                heading: "Example Use Case",
                body: "Writing a meta description for an SEO page. It must be 150–160 characters. Paste your draft → character count shows 183 → trim to 158 → just right. No guessing."
            },
            {
                heading: "Tips",
                list: [
                    "Average reading speed is 200–250 words per minute",
                    "Blog posts perform well at 1,000–2,000 words for SEO",
                    "Twitter: 280 chars max (URLs count as 23 chars regardless of length)",
                    "Meta description: 150–160 chars for full display in Google search results"
                ]
            }
        ],
        cta: { label: "Try Word Counter →", toolRoute: "/word-counter" },
        relatedSlugs: ["text-case-converter", "text-diff-checker", "lorem-ipsum-generator"],
        faq: [
            { q: "Is Word Counter free?", a: "Yes, completely free." },
            { q: "Does it store my text?", a: "No. Everything runs locally in your browser." },
            { q: "How is reading time calculated?", a: "Based on average adult reading speed of 225 words per minute." }
        ]
    },

    "yaml-to-json-converter": {
        slug: "yaml-to-json-converter",
        title: "YAML to JSON Converter — Online YAML Parser",
        metaDescription: "Convert YAML to JSON and JSON to YAML with syntax error feedback. Handles nested structures. Free on DevDeck.",
        metaKeywords: "yaml to json, json to yaml, yaml converter, yaml parser online, yaml formatter, yaml json",
        intro: "YAML is the language of configuration files — Kubernetes, Docker Compose, GitHub Actions, Ansible all use it. But APIs speak JSON. Convert between both formats instantly with syntax validation and error highlighting.",
        sections: [
            {
                heading: "What is YAML?",
                body: "YAML (YAML Ain't Markup Language) is a human-readable data serialization format that uses indentation to represent structure. It's more readable than JSON — no braces, quotes are optional for strings, and comments are supported. It's the standard format for DevOps configuration files."
            },
            {
                heading: "Why Convert Between YAML and JSON?",
                body: "Tools like Kubernetes, Helm, and GitHub Actions use YAML. REST APIs and JavaScript apps use JSON. You often need to convert between them: turning a YAML config into JSON for an API call, or converting a JSON API response into YAML for a config template."
            },
            {
                heading: "Key Benefits",
                list: [
                    "Convert YAML → JSON and JSON → YAML",
                    "Live syntax error highlighting",
                    "Handles nested objects and arrays",
                    "Formatted output with proper indentation",
                    "100% client-side — nothing sent to server"
                ]
            },
            {
                heading: "How to Use YAML/JSON Converter",
                steps: [
                    "Paste your YAML or JSON in the input",
                    "Select conversion direction",
                    "Converted output appears instantly",
                    "Fix any syntax errors shown in the error panel",
                    "Copy the result"
                ]
            },
            {
                heading: "Example Use Case",
                body: "You have a Kubernetes deployment manifest in YAML. A tool you're using only accepts JSON input. Paste the YAML → convert to JSON → paste into the tool. Or reverse: take a JSON API schema and convert to YAML for a Helm chart values file."
            },
            {
                heading: "Tips",
                list: [
                    "YAML is indentation-sensitive — use consistent 2 or 4 spaces (not tabs)",
                    "YAML supports comments (#), JSON does not",
                    "YAML strings don't need quotes unless they contain special characters",
                    "Boolean values in YAML: true/false (lowercase) — not True or TRUE"
                ]
            }
        ],
        cta: { label: "Try YAML/JSON Converter →", toolRoute: "/yaml-json" },
        relatedSlugs: ["json-viewer", "csv-to-json-converter", "regex-tester"],
        faq: [
            { q: "Is YAML/JSON Converter free?", a: "Yes, completely free." },
            { q: "Does it store my data?", a: "No. All conversion happens locally in your browser." },
            { q: "Can YAML represent everything JSON can?", a: "Yes. YAML is a superset of JSON — valid JSON is also valid YAML." }
        ]
    },

    "api-request-builder": {
        slug: "api-request-builder",
        title: "API Request Builder — Test HTTP Endpoints in Your Browser",
        metaDescription:
            "Build and fire HTTP requests directly from your browser — no Postman, no curl. Test REST APIs with custom headers, JSON body, and real-time response inspection.",
        metaKeywords:
            "api request builder, http client online, test api online, rest client browser, api tester, http request tool, postman alternative",
        intro: "Testing an API endpoint usually means firing up Postman, writing a curl command, or switching to a terminal. DevDeck's API Request Builder lets you do it all in one tab — pick a method, enter a URL, add headers, send the request, and inspect the response without leaving your browser.",
        sections: [
            {
                heading: "What is an API Request Builder?",
                body: "An API request builder is a tool that lets you construct and send HTTP requests without writing code or installing a desktop app. You choose a method (GET, POST, PUT, DELETE, PATCH), enter a URL, optionally add request headers and a body, and then fire the request. The response — status code, timing, headers, and body — is displayed immediately."
            },
            {
                heading: "Why Use a Browser-Based API Tester?",
                body: "Desktop tools like Postman are powerful but heavy. curl is fast but requires a terminal and remembering flag syntax. A browser-based builder gives you a clean UI with zero installation. It's perfect for quick endpoint checks, debugging webhook payloads, exploring public APIs, or sharing a reproducible request with a colleague — just copy the URL."
            },
            {
                heading: "Key Features",
                list: [
                    "GET, POST, PUT, DELETE, and PATCH method support",
                    "Custom request headers with key/value editor",
                    "JSON and form-encoded request body",
                    "Real-time response with status code and timing",
                    "Colour-coded JSON response viewer with syntax highlighting",
                    "Response headers tab with all returned header values",
                    "Paste a cURL command directly into the URL field — it auto-parses",
                    "Code snippet export in 12 languages: cURL, fetch, axios, XHR, Node.js, Python, Go, PHP, Ruby, Swift, C#, and Java",
                    "Send response body directly to JSON Viewer for deeper inspection",
                    "No data leaves your device — requests are sent directly from your browser"
                ]
            },
            {
                heading: "How to Use the API Request Builder",
                steps: [
                    "Select an HTTP method (GET, POST, PUT, DELETE, or PATCH)",
                    "Enter the full URL of the endpoint you want to test",
                    "Add any required headers in the Headers tab (e.g. Authorization, Content-Type)",
                    "For POST/PUT/PATCH, switch to the Body tab and enter your JSON payload",
                    "Click SEND — the response appears instantly in the right panel",
                    "Use the Body / Headers tabs in the response panel to inspect the result",
                    "Click the </> button to export the request as runnable code in any language"
                ]
            },
            {
                heading: "Paste a cURL Command and It Just Works",
                body: "One of the most useful features: paste any curl command directly into the URL field and the builder automatically parses it — extracting the method, URL, headers, and body. This means you can copy a curl snippet from API documentation or a terminal and immediately have it loaded in the visual editor, ready to tweak and re-send."
            },
            {
                heading: "Export as Code Snippets",
                body: "Once you've built your request, click the </> icon next to the URL bar to open the Code Snippet panel. Choose from 12 languages and runtimes — cURL, JavaScript (fetch), JavaScript (axios), XHR, Node.js (http), Python (requests), Go, PHP, Ruby, Swift, C# (HttpClient), and Java (OkHttp). The snippet updates live as you change the method, URL, headers, or body, so you always have ready-to-paste code."
            },
            {
                heading: "Understanding CORS Limitations",
                body: "Because requests are sent from your browser rather than a server, you may encounter CORS (Cross-Origin Resource Sharing) errors when testing APIs that don't allow browser-based requests. This is a browser security restriction, not a bug in the tool. Public APIs and APIs you control will generally work fine. For restricted APIs, use the exported code snippet to run the request from a server-side environment like Node.js or Python instead."
            },
            {
                heading: "Tips",
                list: [
                    "Set Content-Type: application/json when sending a JSON body — many APIs require it",
                    "Use the Authorization header with Bearer <token> for protected endpoints",
                    "Paste a cURL command directly into the command palette to jump to the API Request Builder with it preloaded",
                    "Use the Prettify button in the response panel to auto-format minified JSON",
                    "Forward a JSON response to the JSON Viewer using the Send To button for tree browsing",
                    "The timing shown (e.g. 142ms) is round-trip time from your browser to the server",
                    "cURL snippets generated by the tool include all headers and body, ready to run in a terminal"
                ]
            }
        ],
        cta: { label: "Try API Request Builder →", toolRoute: "/api-builder" },
        relatedSlugs: ["json-viewer", "jwt-decoder", "url-parser"],
        faq: [
            { q: "Is the API Request Builder free?", a: "Yes, completely free with no signup required." },
            {
                q: "Does it store my requests or responses?",
                a: "No. All requests are sent directly from your browser and nothing is stored on any server."
            },
            {
                q: "Why am I getting a CORS error?",
                a: "Requests run from your browser, so APIs that don't set permissive CORS headers will block them. This is a browser security policy. Use the exported code snippet to make the same request from a server-side environment."
            },
            { q: "Can I test authenticated APIs?", a: "Yes. Add an Authorization header with your token (e.g. Bearer eyJ...) in the Headers tab." },
            {
                q: "What is the request timeout?",
                a: "Requests time out after 10 seconds. If a server doesn't respond within that window you'll see a timeout error."
            },
            {
                q: "How do I test a POST request with a JSON body?",
                a: "Select POST, enter the URL, add a Content-Type: application/json header, switch to the Body tab, enter your JSON, and click SEND."
            },
            {
                q: "Can I import a cURL command?",
                a: "Yes. Paste any curl command directly into the URL input and the builder will automatically parse the method, URL, headers, and body."
            }
        ]
    },

    "css-to-tailwind-converter": {
        slug: "css-to-tailwind-converter",
        title: "CSS to Tailwind Converter — Convert CSS Properties to Tailwind Classes",
        metaDescription:
            "Convert CSS to Tailwind utility classes instantly. Learn how CSS properties map to Tailwind equivalents, how to use arbitrary values, and how the converter works.",
        metaKeywords:
            "css to tailwind, tailwind converter, css to tailwind converter, tailwind classes, tailwind utility classes, convert css to tailwind online",
        intro: "Migrating a project from plain CSS to Tailwind CSS or converting a CSS snippet for use in a React component? DevDeck's CSS → Tailwind Converter parses your CSS rules and maps each property to the equivalent Tailwind utility class — with smart color handling, spacing scale conversion, and unmapped property annotations.",
        sections: [
            {
                heading: "What is the CSS → Tailwind Converter?",
                body: "It's a browser-based tool that takes standard CSS input and outputs equivalent Tailwind utility classes. It handles 120+ CSS properties across layout, typography, colors, spacing, borders, shadows, flexbox, grid, transforms, transitions, and more. Properties that have no direct Tailwind equivalent are annotated as comments so you know exactly what needs manual attention."
            },
            {
                heading: "Why Convert CSS to Tailwind?",
                body: "Tailwind's utility-first approach speeds up development by reducing context-switching between HTML and CSS files. Converting existing CSS to Tailwind lets you adopt this workflow incrementally — migrate one component at a time without rewriting everything from scratch. The converter also helps when you're prototyping with CSS and want to translate your work into clean Tailwind classes."
            },
            {
                heading: "Key Features",
                list: [
                    "Parses multi-rule CSS with selectors and inline declarations",
                    "Maps 120+ CSS properties to Tailwind equivalents",
                    "Colors: hex, rgba, and named colors → Tailwind named classes or JIT arbitrary syntax",
                    "Spacing: px values mapped to the Tailwind spacing scale (p-4, m-10, etc.)",
                    "Unmapped properties shown as comments — nothing is silently dropped",
                    "Stats badge shows 'X / Y properties mapped' for progress",
                    "'Copy Classes' for clean class names, 'Copy All' to include annotations",
                    "100% client-side — no data leaves your browser"
                ]
            },
            {
                heading: "How Mapping Works",
                body: "The converter uses a curated mapping table of ~120 CSS properties. Each property has a mapper function that receives the CSS value and returns one or more Tailwind class names. For example, display: flex → flex, justify-content: center → justify-center, padding: 8px 16px → px-4 py-8. Values that don't fit the Tailwind scale (like custom pixel values) use Tailwind's JIT arbitrary value syntax: w-[18px], text-[#ff6600]."
            },
            {
                heading: "Color Handling",
                body: "Colors are handled specially. The converter recognizes named colors (white, black, red, blue…), hex codes (#fff, #000000, #22cc99…), and RGB/RGBA values. Common hex colors are mapped to their closest Tailwind named class: #fff → text-white, #22cc99 → bg-emerald-400, #3b82f6 → text-blue-500. For unrecognized colors or exact shades, the tool falls back to Tailwind's arbitrary value JIT syntax: text-[#ff6600] or bg-[rgba(34,51,68,0.5)]."
            },
            {
                heading: "Spacing Scale Conversion",
                body: "Tailwind uses a predefined spacing scale (0.5, 1, 2, 4, 8, 16, 20, 24… rem-based units). The converter maps your px values to the closest scale match: 4px → 1 (p-1), 8px → 2 (m-2), 16px → 4 (gap-4). Values that don't have an exact match in the scale fall back to arbitrary value syntax: w-[18px]."
            },
            {
                heading: "CSS Shorthand Support",
                body: "The converter handles CSS shorthand properties intelligently. margin: 10px becomes m-10, but margin: 10px 20px expands to my-10 mx-20, and margin: 10px 20px 30px 40px becomes mt-10 mr-20 mb-30 ml-40. If values repeat, the output is deduplicated — margin: 10px 20px 10px 20px collapses to my-10 mx-20. The same logic applies to padding."
            },
            {
                heading: "How to Use the CSS → Tailwind Converter",
                steps: [
                    "Paste your CSS into the left panel (full rule blocks or just property: value pairs)",
                    "The converter processes input in real-time with a 300ms debounce",
                    "View the Tailwind class names in the right panel",
                    "Check the stats badge for the mapped/total property count",
                    "Review unmapped properties listed below the output",
                    "Click 'Copy Classes' to copy clean class names for your className attribute",
                    "Click 'Copy All' to copy classes plus unmapped annotations for review"
                ]
            },
            {
                heading: "Example Use Case",
                body: "You're migrating a legacy Bootstrap project to Tailwind. You copy a CSS block like .btn { display: inline-flex; align-items: center; padding: 8px 16px; border-radius: 6px; font-weight: 700; } and paste it. The converter returns inline-flex items-center px-4 py-2 rounded-md font-bold — ready to drop directly into your JSX className. The unmapped section shows any properties that need manual Tailwind equivalents."
            },
            {
                heading: "Tips",
                list: [
                    "Paste full CSS rule blocks with selectors — the parser extracts properties correctly",
                    "Use 'Copy Classes' for clean output that goes straight into className attributes",
                    "For custom pixel values not in the Tailwind scale, use arbitrary value syntax like w-[22px]",
                    "The unmapped comments section helps you identify which properties need manual Tailwind equivalents like custom animations or specific box-shadow values",
                    "Combine with the Smart Formatter to detect and format CSS pasted from other sources"
                ]
            }
        ],
        cta: { label: "Try CSS → Tailwind Converter →", toolRoute: "/css-tailwind" },
        relatedSlugs: ["smart-formatter", "color-converter", "json-viewer", "yaml-to-json-converter"],
        faq: [
            { q: "Is the CSS to Tailwind Converter free?", a: "Yes, completely free with no signup required." },
            { q: "Does it store my CSS?", a: "No. All conversion happens locally in your browser. Nothing is sent to any server." },
            {
                q: "What CSS properties are supported?",
                a: "Over 120 properties covering display, flexbox, grid, positioning, sizing, typography, colors, backgrounds, borders, shadows, opacity, transforms, transitions, and more."
            },
            {
                q: "What happens to properties that don't have a Tailwind equivalent?",
                a: "They are shown as comments below the output (e.g., /* gap: 12px — no Tailwind class */) so you know exactly what needs manual attention."
            },
            {
                q: "Can it convert responsive or pseudo-class variants?",
                a: "Not yet. The current version converts base CSS properties. Responsive variants (sm:, md:, lg:) and pseudo-classes (:hover, :focus) are on the roadmap."
            },
            {
                q: "How are colors handled?",
                a: "Common hex colors are mapped to Tailwind named classes (#fff → white, #22cc99 → emerald-400). Unrecognized hex values use Tailwind's JIT arbitrary value syntax (text-[#ff6600])."
            },
            {
                q: "Does it handle CSS shorthand values like margin: 10px 20px?",
                a: "Yes. Shorthand values are expanded to the correct Tailwind directional classes (margin: 10px 20px → my-10 mx-20). Duplicate values are collapsed automatically."
            }
        ]
    },

    "smart-formatter": {
        slug: "smart-formatter",
        title: "Smart Formatter — Auto-Detect & Format Any Data",
        metaDescription: "Paste any data and Smart Formatter auto-detects the type — JSON, JWT, URL, UUID, Base64, timestamp, CSV, HTML, and more — then formats it instantly. Free on DevDeck.",
        metaKeywords: "smart formatter, auto detect format, json formatter, jwt decoder, base64 decoder, url formatter, data formatter online, universal formatter",
        intro: "Smart Formatter is a universal data formatter that detects what you've pasted and formats it correctly — without you having to know which tool to reach for. JSON gets pretty-printed, JWTs get decoded, URLs get parsed, UUIDs get validated, timestamps get converted. One tool, every format.",
        sections: [
            {
                heading: "What is Smart Formatter?",
                body: "Smart Formatter analyzes any text you paste and identifies the data type automatically. It then applies the appropriate formatting or decoding operation and renders a clean, structured output. Think of it as a universal clipboard formatter — paste anything and it figures out the rest."
            },
            {
                heading: "Why Use Smart Formatter?",
                body: "Developers constantly switch between specialized tools: a JSON viewer here, a JWT decoder there, a Base64 decoder somewhere else. Smart Formatter eliminates that friction. Paste the data once and get the right output immediately — no mental overhead of selecting the right tool first."
            },
            {
                heading: "Supported Data Types",
                list: [
                    "JSON — pretty-printed with syntax highlighting",
                    "JWT — header, payload, and signature decoded",
                    "cURL — command parsed and formatted",
                    "URL — query params broken out into key/value pairs",
                    "UUID — validated with version and variant shown",
                    "Unix timestamp — converted to human-readable date",
                    "Base64 — decoded to plain text",
                    "Hash strings — identified (MD5, SHA-1, SHA-256, SHA-512)",
                    "CSV — parsed into a structured preview",
                    "HTML — indented and formatted",
                    "Hex color — shown as a color swatch",
                    "IP address — displayed with annotation"
                ]
            },
            {
                heading: "How to Use Smart Formatter",
                steps: [
                    "Paste any data into the input panel",
                    "Smart Formatter detects the type and formats it instantly",
                    "Review the formatted output",
                    "For complex types (JSON, JWT, CSV), use the 'Send to' button to open the dedicated tool with data pre-filled",
                    "Copy the formatted result to clipboard"
                ]
            },
            {
                heading: "Example Use Case",
                body: "You copy a JWT from an Authorization header in your browser DevTools. Paste it into Smart Formatter — it detects the JWT, decodes all three parts (header, payload, signature section), and shows the claims. You can then click 'Send to JWT Toolkit' to open the full JWT tool if you need to inspect signatures or generate a new token."
            },
            {
                heading: "Tips",
                list: [
                    "Works great as a first-pass formatter — paste anything you copy from logs, API responses, or DevTools",
                    "Use 'Send to' for deeper analysis — Smart Formatter routes you to the right specialized tool with data already loaded",
                    "Timestamps are detected for both 10-digit (seconds) and 13-digit (milliseconds) Unix values",
                    "Minified JSON is auto-pretty-printed — no need to manually format before pasting"
                ]
            }
        ],
        cta: { label: "Try Smart Formatter →", toolRoute: "/smart-formatter" },
        relatedSlugs: ["json-viewer", "jwt-decoder", "encoder-decoder", "command-playground"],
        faq: [
            { q: "Is Smart Formatter free?", a: "Yes, completely free with no signup required." },
            { q: "Does it send my data to a server?", a: "No. All detection and formatting runs locally in your browser. Nothing is transmitted." },
            {
                q: "What if it detects the wrong type?",
                a: "Detection is sequential and prioritized — JWT before Base64, for example. Edge cases can fool the detector. For ambiguous data, use the dedicated tool directly (e.g. JSON Viewer for large JSON)."
            },
            {
                q: "Can I use Smart Formatter for large payloads?",
                a: "Yes for most types. Very large JSON (many MB) is routed to the JSON Viewer which is optimized for large data browsing."
            }
        ]
    },

    "html-jsx": {
        slug: "html-jsx",
        title: "HTML to JSX Converter — Convert HTML for React",
        metaDescription: "Convert HTML markup to valid JSX instantly. Automatically handles className, htmlFor, event handlers, void element self-closing, and more. Free on DevDeck.",
        metaKeywords: "html to jsx converter, html jsx, class to classname, convert html react, jsx converter online, html react converter",
        intro: "Copying HTML into a React component always requires manual cleanup — class becomes className, for becomes htmlFor, onclick becomes onClick, and void elements need self-closing tags. HTML to JSX Converter handles all of that automatically, showing a transformation count so you know exactly what changed.",
        sections: [
            {
                heading: "What is HTML to JSX Conversion?",
                body: "JSX is React's HTML-like syntax, but it's not HTML. JSX uses JavaScript attribute names, camelCase event handlers, and strict XML rules for void elements. Converting HTML to JSX by hand is tedious and error-prone. HTML to JSX Converter automates every transformation so the output is valid JSX the moment you paste."
            },
            {
                heading: "What Gets Transformed?",
                list: [
                    "class → className (all occurrences)",
                    "for → htmlFor (on label elements)",
                    "tabindex → tabIndex",
                    "onclick → onClick, onchange → onChange, onsubmit → onSubmit, and all other HTML event attributes",
                    "Void elements (br, img, input, hr, meta, link) → self-closed with />",
                    "Style attribute values left in place — manual conversion to object syntax is noted"
                ]
            },
            {
                heading: "Why Use HTML to JSX Converter?",
                body: "Frontend developers frequently copy HTML from static sites, design handoffs, documentation, or UI libraries and need to drop it into React components. The converter eliminates all manual renaming and turns a multi-minute task into an instant paste-and-go."
            },
            {
                heading: "How to Use HTML to JSX",
                steps: [
                    "Paste your HTML markup into the left panel",
                    "The JSX output appears in the right panel instantly",
                    "A transformation count shows how many attributes and elements were changed",
                    "Click Copy to copy the JSX to clipboard",
                    "Paste directly into your React component"
                ]
            },
            {
                heading: "Example Use Case",
                body: "You're implementing a design from a Figma handoff that provided HTML. The snippet has class attributes, onclick handlers, and self-closing img tags without the slash. Paste into HTML to JSX Converter — all class attributes become className, onclick becomes onClick, and img tags are self-closed. The output is paste-ready JSX."
            },
            {
                heading: "Tips",
                list: [
                    "Paste full component trees, not just individual tags — the converter handles nested structures",
                    "style='...' inline styles are passed through — you'll still need to manually convert them to object syntax ({ style={{ color: 'red' }} })",
                    "Check the transformation count — a count of 0 means the HTML may already be valid JSX",
                    "Works well for Bootstrap, Tailwind, or any plain HTML snippets destined for React"
                ]
            }
        ],
        cta: { label: "Try HTML → JSX Converter →", toolRoute: "/html-jsx" },
        relatedSlugs: ["smart-formatter", "css-to-tailwind-converter", "text-case-converter", "json-viewer"],
        faq: [
            { q: "Is HTML to JSX Converter free?", a: "Yes, completely free with no signup required." },
            { q: "Does it store my HTML?", a: "No. All conversion runs in your browser. Nothing is sent to a server." },
            {
                q: "Does it handle inline styles?",
                a: "Inline style strings are preserved as-is. JSX requires style to be a JavaScript object ({ color: 'red' }) rather than a string — that conversion still needs to be done manually."
            },
            {
                q: "What about custom HTML attributes?",
                a: "Standard HTML attributes are transformed. Custom data-* attributes are passed through unchanged since they're valid in JSX."
            },
            {
                q: "Does it support SVG attributes?",
                a: "Common SVG attributes like viewBox and xmlns are passed through. Full SVG-to-JSX conversion with fill/stroke → className mapping is not currently supported."
            }
        ]
    },

    "encoder-decoder": {
        slug: "encoder-decoder",
        title: "Encoder / Decoder — Base64, URL, HTML Entities & More",
        metaDescription: "Encode and decode text using Base64, URL encoding, HTML entities, Unicode, hex, and binary. Switch between encode and decode mode instantly. Free on DevDeck.",
        metaKeywords: "base64 encoder decoder, url encoder decoder, html entity encoder, unicode encoder, hex encoder, binary encoder online, text encoder decoder",
        intro: "Encoder / Decoder is a multi-format encoding tool that covers every encoding scheme developers regularly encounter — Base64, URL percent-encoding, HTML entities, Unicode escape sequences, hexadecimal, and binary. Switch between encode and decode with a toggle, switch encoding formats with tabs, and get the result instantly.",
        sections: [
            {
                heading: "What is Encoder / Decoder?",
                body: "Many data formats require encoding to safely transmit text through systems that expect a restricted character set. URL encoding ensures query parameters don't break URLs. Base64 lets binary data travel through text-only channels. HTML entity encoding prevents XSS. Encoder / Decoder handles all of these in one unified interface."
            },
            {
                heading: "Supported Encoding Formats",
                list: [
                    "Base64 — encode/decode text to the Base64 alphabet (btoa/atob)",
                    "URL — percent-encode and decode special characters for safe use in URLs",
                    "HTML Entities — encode characters like <, >, &, \" to their HTML entity equivalents",
                    "Unicode — convert text to and from \\uXXXX Unicode escape sequences",
                    "Hex — encode text as hexadecimal byte sequences",
                    "Binary — convert text to and from binary (8-bit ASCII representation)"
                ]
            },
            {
                heading: "Encode vs Decode Mode",
                body: "The tool has a single Encode / Decode toggle at the top. Switch to Encode to transform plain text into the selected format; switch to Decode to reverse the operation. The active tab (Base64, URL, HTML Entities, etc.) determines which encoding is applied."
            },
            {
                heading: "How to Use Encoder / Decoder",
                steps: [
                    "Select the encoding format tab (Base64, URL, HTML Entities, Unicode, Hex, Binary)",
                    "Toggle between Encode and Decode mode",
                    "Type or paste text into the input panel",
                    "The output panel shows the result instantly",
                    "Click Copy to copy the encoded or decoded text"
                ]
            },
            {
                heading: "Example Use Cases",
                body: "Encoding an API key in Base64 for an Authorization header. Decoding a percent-encoded URL to read the query parameters. Encoding user-generated HTML content before inserting it into a database. Converting a Unicode string to escape sequences for a JSON config. All of these are handled by switching tabs."
            },
            {
                heading: "Tips",
                list: [
                    "Use URL encoding for query parameter values, not full URLs — encodeURIComponent is correct here",
                    "Base64 output contains +, /, and = characters — use URL-safe Base64 (replace + with - and / with _) if embedding in URLs",
                    "HTML entity encoding is the right choice for user-generated content going into HTML — it prevents XSS",
                    "Unicode escape sequences are useful for embedding special characters in JavaScript string literals",
                    "Hex encoding is useful for debugging binary data or generating predictable byte sequences"
                ]
            }
        ],
        cta: { label: "Try Encoder / Decoder →", toolRoute: "/encoder-decoder" },
        relatedSlugs: ["base64-text-encoder", "smart-formatter", "hash-generator", "url-shortener"],
        faq: [
            { q: "Is Encoder / Decoder free?", a: "Yes, completely free with no signup required." },
            { q: "Does it store my input?", a: "No. All encoding and decoding runs locally in your browser. Nothing is sent to a server." },
            {
                q: "What is the difference between Encoder/Decoder and Base64 Text?",
                a: "Base64 Text focuses specifically on Base64 with extra options (like URL-safe mode). Encoder/Decoder covers Base64 plus five other formats in a unified interface — choose whichever fits your workflow."
            },
            {
                q: "Why does Base64 decoding fail on some inputs?",
                a: "Base64 requires input length to be a multiple of 4. Inputs without padding (=) may fail. Also, URL-safe Base64 uses - and _ instead of + and / — replace them before decoding if you received a URL-safe encoded value."
            },
            {
                q: "Can I encode non-ASCII characters?",
                a: "Yes. The tool handles UTF-8 text. Non-ASCII characters are first UTF-8 encoded, then Base64/hex/binary encoded."
            }
        ]
    },

    "command-playground": {
        slug: "command-playground",
        title: "Command Playground — Smart Input Router for Developers",
        metaDescription: "Paste any developer data and Command Playground detects the type and routes you to the right tool — JSON, JWT, URL, UUID, Base64, timestamp, and more. Free on DevDeck.",
        metaKeywords: "command playground, developer tool router, smart paste tool, detect json jwt url uuid, developer toolbox, devdeck playground",
        intro: "Command Playground is DevDeck's smart routing layer. Paste any data — a JSON blob, a JWT token, a URL, a UUID, a Base64 string, a Unix timestamp — and it instantly detects what you've pasted and surfaces the best matching tool, ranked by confidence. No more guessing which tool to open.",
        sections: [
            {
                heading: "What is Command Playground?",
                body: "Command Playground is a universal entry point for the DevDeck toolbox. Instead of manually navigating to the right tool, you paste data and the playground identifies what it is. It shows the best-matched tool at the top (ranked #1) followed by other possible matches. A single click opens the matched tool with your data pre-loaded."
            },
            {
                heading: "How Detection Works",
                body: "Command Playground runs a sequential set of pattern checks against your input: JWT (three dot-separated Base64 segments), cURL commands, URLs (http/https), JSON objects or arrays, UUIDs (RFC 4122 format), Unix timestamps (10 or 13-digit integers), known hash lengths (MD5/SHA-1/SHA-256/SHA-512), and Base64 strings. The first check that matches becomes the top suggestion."
            },
            {
                heading: "Supported Data Types",
                list: [
                    "JSON — routes to JSON Viewer",
                    "JWT — routes to JWT Toolkit",
                    "URL — routes to URL Validator",
                    "UUID — routes to UUID Generator (Inspect tab)",
                    "Base64 — routes to Encoder/Decoder",
                    "Unix timestamp — routes to Timestamp Converter",
                    "Hash (MD5/SHA-1/SHA-256/SHA-512) — routes to Hash Generator",
                    "cURL command — routes to API Request Builder"
                ]
            },
            {
                heading: "Example Chips",
                body: "The input panel includes six pre-fill chips (JSON, JWT, URL, UUID, Base64, Timestamp) that load a real sample of each data type. This lets you test detection without having sample data at hand — click a chip, see the result, then open the matched tool."
            },
            {
                heading: "How to Use Command Playground",
                steps: [
                    "Paste any data into the input box",
                    "The top suggestion shows the best-matched tool with a 'Best match' badge",
                    "Secondary suggestions show alternative tools in ranked order",
                    "Click 'Open →' to launch the matched tool with your data pre-filled",
                    "Or click an example chip to try it with sample data first"
                ]
            },
            {
                heading: "Tips",
                list: [
                    "The playground shows recently used tools when the input is empty — quick access without typing",
                    "Use example chips to verify detection behavior for each supported type",
                    "If detection suggests the wrong tool, the secondary suggestions often contain the right one",
                    "Works best with clean data — extra whitespace and surrounding text may affect detection"
                ]
            }
        ],
        cta: { label: "Try Command Playground →", toolRoute: "/command-playground" },
        relatedSlugs: ["smart-formatter", "json-viewer", "jwt-decoder", "encoder-decoder"],
        faq: [
            { q: "Is Command Playground free?", a: "Yes, completely free with no signup required." },
            { q: "Does it store my input?", a: "No. All detection runs locally in your browser. Nothing is sent to a server." },
            {
                q: "What happens when I click 'Open →'?",
                a: "The matched tool opens and your pasted data is automatically pre-filled into the relevant input field. For JSON Viewer this means the editor is populated; for UUID Generator the Inspect tab opens with your UUID; for JWT Toolkit the token is decoded immediately."
            },
            {
                q: "What if my data matches multiple types?",
                a: "Detection is ordered by specificity — JWT is checked before Base64 because a JWT is also valid Base64. The ranking reflects confidence. If the top match isn't what you expected, check the secondary suggestions."
            },
            {
                q: "Can I use Command Playground as my default starting point?",
                a: "Yes. Bookmark /command-playground and start every session by pasting whatever data you have. It eliminates the step of deciding which DevDeck tool to open."
            }
        ]
    },
    "cron-expression-builder": {
        slug: "cron-expression-builder",
        title: "Cron Expression Builder — Write and Understand Cron Syntax",
        metaDescription: "Build cron expressions visually, get plain-English descriptions, and preview the next 5 scheduled runs — all in the browser with no backend needed.",
        metaKeywords: "cron expression builder, cron job syntax, cron schedule, cron generator, cron tester, unix cron, online cron builder, cron parser",
        intro: "Cron expressions power scheduled jobs on Linux servers, cloud functions, CI pipelines, and almost every backend system. They're terse, easy to get wrong, and notoriously hard to read at a glance. DevDeck's Cron Expression Builder gives you a visual editor, instant plain-English translation, and next-run preview — so you can write and verify a schedule in seconds.",
        sections: [
            {
                heading: "What Is a Cron Expression?",
                body: "A cron expression is a five-field string that defines when a job should run. Each field represents a unit of time — minute, hour, day-of-month, month, and day-of-week — and they're separated by spaces. The scheduler checks the expression every minute and runs the job when all five fields match the current time. The asterisk (*) means 'any value', so '* * * * *' runs every minute, and '0 9 * * 1-5' runs at 9:00 AM on weekdays."
            },
            {
                heading: "Cron Syntax Field Reference",
                list: [
                    "Minute (0–59) — position 1, controls the minute of the hour",
                    "Hour (0–23) — position 2, controls the hour of the day",
                    "Day of Month (1–31) — position 3, controls the specific day within a month",
                    "Month (1–12) — position 4, controls which months the job runs",
                    "Day of Week (0–7) — position 5, where 0 and 7 both mean Sunday"
                ]
            },
            {
                heading: "Special Characters",
                list: [
                    "* — every value in the field (e.g. * in minute = every minute)",
                    "*/n — every nth value (e.g. */15 in minute = every 15 minutes)",
                    "n,m — list of specific values (e.g. 1,15 in day = 1st and 15th)",
                    "n-m — range (e.g. 1-5 in day-of-week = Monday through Friday)",
                    "n-m/s — range with step (e.g. 0-23/6 in hour = every 6 hours)"
                ]
            },
            {
                heading: "Common Cron Patterns",
                list: [
                    "'* * * * *' — every minute",
                    "'0 * * * *' — at the top of every hour",
                    "'0 0 * * *' — every day at midnight",
                    "'0 9 * * 1-5' — weekdays at 9:00 AM",
                    "'*/15 * * * *' — every 15 minutes",
                    "'0 0 1 * *' — first of every month at midnight",
                    "'0 0 * * 0' — every Sunday at midnight",
                    "'0 12 * * 1,3,5' — Mon, Wed, Fri at noon"
                ]
            },
            {
                heading: "Day-of-Month vs Day-of-Week Interaction",
                body: "When both day-of-month and day-of-week are set to anything other than *, most schedulers use OR logic — the job runs if either condition is met. For example, '0 0 1 * 1' runs on the 1st of every month AND every Monday. To restrict to a specific day of the month within a specific weekday, you need application-level logic rather than cron alone. DevDeck's builder surfaces this in the plain-English description so you can spot unexpected behavior before deploying."
            },
            {
                heading: "How to Use the Cron Expression Builder",
                steps: [
                    "Type a cron expression directly into the expression input at the top — the builder validates it as you type with a green/red indicator",
                    "Or use the Quick Presets chips (Every minute, Hourly, Daily midnight, etc.) to start from a known-good base",
                    "Fine-tune each field using the preset chips per field or by editing the raw value in the field's input box",
                    "The right panel shows a plain-English description of your schedule and the next 5 upcoming run times",
                    "Click 'Copy Expression' to copy the final cron string to your clipboard"
                ]
            },
            {
                heading: "Cron in the Cloud",
                body: "Cloud schedulers use cron syntax with minor variations. AWS EventBridge uses a six-field format with an added seconds field at position 0. Google Cloud Scheduler follows standard 5-field POSIX cron. GitHub Actions workflows use the standard 5-field format inside 'cron:' under 'schedule:'. Kubernetes CronJobs also use standard 5-field cron. Always verify behavior in your specific runtime — DevDeck's builder follows the standard 5-field POSIX format used by Linux cron and most cloud platforms."  // eslint-disable-line max-len
            },
            {
                heading: "Validating Cron Expressions",
                list: [
                    "Check the validity dot next to the expression input — green means parseable, red means invalid syntax",
                    "Read the plain-English description — if it doesn't match your intent, the expression needs adjustment",
                    "Check the next 5 run times — verify the dates and times align with your expected schedule",
                    "Watch for OR-logic surprises when both day-of-month and day-of-week are non-wildcard",
                    "Test edge cases: February for monthly jobs, year-end dates, and DST transitions if your scheduler respects timezones"
                ]
            }
        ],
        cta: { label: "Build a Cron Expression →", toolRoute: "/cron-builder" },
        relatedSlugs: ["timestamp-converter", "command-playground", "regex-tester", "uuid-generator"],
        faq: [
            { q: "Is the builder free?", a: "Yes, fully free with no account needed." },
            { q: "Does it store my cron expressions?", a: "No. Everything runs locally in your browser — nothing is sent to a server." },
            {
                q: "Why does my schedule run more often than expected?",
                a: "The most common cause is having both day-of-month and day-of-week set to non-wildcard values. Standard cron uses OR logic in this case — the job runs when either condition matches, not only when both match. Set one of the two to '*' if you want stricter control."
            },
            {
                q: "What's the difference between 0 and 7 in day-of-week?",
                a: "Both represent Sunday. Standard POSIX cron uses 0 for Sunday, but some implementations also accept 7. DevDeck normalizes both to Sunday when parsing and generating the plain-English description."
            },
            {
                q: "Can I use named months and days?",
                a: "Standard cron accepts named values (JAN, FEB, MON, TUE, etc.) in some implementations, but numeric values are universally supported. DevDeck's builder uses numeric values to ensure maximum compatibility."
            },
            {
                q: "How accurate is the 'next 5 runs' preview?",
                a: "The preview computes run times from the current moment in your local timezone. It does not account for DST transitions or leap seconds. For production systems, always validate in the scheduler's own timezone settings."
            }
        ]
    },

    "what-is-base64-encoding": {
        slug: "what-is-base64-encoding",
        title: "What Is Base64 Encoding? A Developer's Guide",
        metaDescription:
            "Base64 encoding converts binary data into a safe ASCII string. Learn how it works, where it's used in web development, and when to use it.",
        metaKeywords: "what is base64, base64 encoding explained, base64 how it works, base64 character set, base64 padding",
        intro: "Base64 encoding turns binary data into a string of printable ASCII characters. It's used everywhere in web development — HTTP authentication, JWTs, data URIs, email attachments — and understanding how it works helps you use it correctly.",
        sections: [
            {
                heading: "Why Base64 Exists",
                body: "Many protocols — HTTP headers, SMTP email, XML, JSON — were designed to carry text, not raw binary. Binary data contains bytes that look like control characters and can corrupt transmission. Base64 solves this by representing any byte sequence using only 64 safe ASCII characters: A–Z, a–z, 0–9, +, and /."
            },
            {
                heading: "How Base64 Encoding Works",
                body: "The encoder reads 3 bytes (24 bits) of input at a time and splits them into four 6-bit groups. Each group maps to one of 64 characters. Because 3 input bytes produce 4 output characters, Base64 expands data by exactly 33%. If the input length isn't divisible by 3, = padding characters are added to complete the final group."
            },
            {
                heading: "The Base64 Character Set",
                list: [
                    "A–Z → values 0–25",
                    "a–z → values 26–51",
                    "0–9 → values 52–61",
                    "+ → value 62",
                    "/ → value 63",
                    "= → padding (not a data character)"
                ]
            },
            {
                heading: "Base64URL — The URL-Safe Variant",
                body: "Standard Base64 uses + and / which are special characters in URLs. Base64URL replaces + with - and / with _ to produce strings safe in query parameters and HTTP headers without percent-encoding. JWT tokens use Base64URL for their header and payload sections."
            },
            {
                heading: "Where Base64 Is Used in Web Development",
                list: [
                    "HTTP Basic Authentication — credentials are Base64-encoded before being sent in the Authorization header",
                    "JWT tokens — header and payload are Base64URL-encoded JSON",
                    "Data URIs — images and fonts embedded directly in HTML or CSS",
                    "Email attachments — MIME encodes binary attachments as Base64 for SMTP transport",
                    "API payloads — binary data (certificates, keys, images) transmitted in JSON"
                ]
            },
            {
                heading: "What Base64 Is Not",
                body: "Base64 is encoding, not encryption. It is trivially reversible — anyone can decode it with a single function call. Never use Base64 to 'hide' credentials or sensitive data. HTTP Basic Auth encodes credentials in Base64 but requires HTTPS for actual security."
            },
            {
                heading: "Base64 in JavaScript",
                body: "Browsers provide two built-in functions: `btoa(string)` encodes to Base64, and `atob(base64string)` decodes it. For binary data like ArrayBuffers, you need to convert bytes manually before passing to btoa. Node.js uses `Buffer.from(data).toString('base64')` for encoding and `Buffer.from(str, 'base64')` for decoding."
            }
        ],
        cta: { label: "Try Base64 Image Converter →", toolRoute: "/base64-image" },
        relatedSlugs: ["base64-image-converter", "base64-text-encoder", "how-to-decode-base64-image", "base64-data-urls-explained"],
        faq: [
            {
                q: "Is Base64 the same as encryption?",
                a: "No. Base64 is encoding — it transforms binary into text using a fixed, public algorithm. Anyone can decode it instantly. Encryption uses a secret key and is designed to be irreversible without that key."
            },
            {
                q: "Why does Base64 output end with = or ==?",
                a: "The = characters are padding. Base64 processes input in 3-byte chunks. If the input doesn't divide evenly by 3, one or two = characters pad the final output group to a multiple of 4 characters."
            },
            {
                q: "What is the size overhead of Base64?",
                a: "Base64 increases data size by approximately 33%. Three bytes of input become four Base64 characters. For a 100KB image, the Base64 output will be around 133KB."
            },
            {
                q: "What is the difference between Base64 and Base64URL?",
                a: "Base64URL replaces + with - and / with _ to produce output safe in URLs and HTTP headers. JWT tokens use Base64URL. Standard Base64 uses + and / which need percent-encoding in URLs."
            },
            {
                q: "Can browsers decode Base64 natively?",
                a: "Yes. `atob()` decodes a Base64 string and `btoa()` encodes one. These are available in all modern browsers and in Node.js environments."
            }
        ]
    },

    "how-to-decode-base64-image": {
        slug: "how-to-decode-base64-image",
        title: "How to Decode a Base64 Image — Step-by-Step Guide",
        metaDescription:
            "Learn how to decode a Base64-encoded image back to a viewable file. Covers data URI structure, browser tools, JavaScript decoding, and common errors.",
        metaKeywords: "decode base64 image, base64 image decode, base64 to image, convert base64 to image, base64 image decoder",
        intro: "A Base64-encoded image is a text string that represents image binary data. Decoding it reveals the original image. This guide explains what a Base64 image looks like, how to decode it using a browser tool or JavaScript, and how to fix common decoding errors.",
        sections: [
            {
                heading: "What a Base64 Image Looks Like",
                body: "A Base64 image is typically a data URI — a long string that starts with `data:image/png;base64,` followed by the encoded image data. The prefix tells the browser the media type and encoding. The actual image data begins after the comma and looks like a stream of letters, numbers, and symbols: `iVBORw0KGgoAAAANSUhEUgAA...`"
            },
            {
                heading: "Anatomy of a Base64 Data URI",
                list: [
                    "`data:` — the URI scheme",
                    "`image/png` — the MIME type (could also be image/jpeg, image/webp, image/gif, image/svg+xml)",
                    "`;base64,` — declares that the data is Base64-encoded",
                    "everything after the comma — the actual Base64-encoded image bytes"
                ]
            },
            {
                heading: "How to Decode Using DevDeck",
                steps: [
                    "Open the Base64 Image Converter tool",
                    "Switch to the Decode tab",
                    "Paste the full Base64 string (with or without the `data:image/...;base64,` prefix)",
                    "The decoded image appears instantly in the preview panel",
                    "Download the image file if needed"
                ]
            },
            {
                heading: "How to Decode in JavaScript",
                body: "To decode a Base64 image in the browser, strip the data URI prefix, then use `atob()` to convert to a binary string, then convert to a Uint8Array and create a Blob. Example: strip the prefix with `str.split(',')[1]`, then `atob(base64str)` gives you the raw bytes. To display it, create a Blob with the correct MIME type and use `URL.createObjectURL()`. In Node.js, `Buffer.from(base64str, 'base64')` gives you the raw bytes directly."
            },
            {
                heading: "Supported Image Formats",
                list: [
                    "PNG — `data:image/png;base64,`",
                    "JPEG — `data:image/jpeg;base64,`",
                    "WebP — `data:image/webp;base64,`",
                    "GIF — `data:image/gif;base64,`",
                    "SVG — `data:image/svg+xml;base64,`"
                ]
            },
            {
                heading: "Common Decoding Errors",
                list: [
                    "Invalid Base64 string — check for whitespace or line breaks in the middle of the string; Base64 must be a continuous string",
                    "Missing MIME type prefix — if your decoder requires a data URI, make sure the `data:image/...;base64,` prefix is present",
                    "Truncated string — a Base64 string must have a length divisible by 4 (padded with =); truncated strings will fail",
                    "Wrong MIME type — if the image doesn't display correctly, try changing the MIME type in the prefix to match the actual format",
                    "Extra characters — copy-pasting from some tools adds unwanted quotes or newlines; strip these before decoding"
                ]
            },
            {
                heading: "Using a Decoded Image in HTML or CSS",
                body: "Once you have the data URI, use it anywhere a URL is accepted. In HTML: `<img src=\"data:image/png;base64,...\">`. In CSS: `background-image: url('data:image/png;base64,...')`. The browser renders it without making an HTTP request. For large images this is inefficient — prefer external URLs for images over a few KB."
            }
        ],
        cta: { label: "Decode a Base64 Image →", toolRoute: "/base64-image" },
        relatedSlugs: ["base64-image-converter", "what-is-base64-encoding", "base64-data-urls-explained", "base64-text-encoder"],
        faq: [
            {
                q: "Can I decode a Base64 image without software?",
                a: "Yes. Paste the Base64 string into DevDeck's Base64 Image Converter — no installation needed. It decodes entirely in your browser."
            },
            {
                q: "Do I need the data:image/...;base64, prefix to decode?",
                a: "Not always. Many tools accept the raw Base64 string without the prefix. DevDeck's converter handles both formats."
            },
            {
                q: "Why does my decoded image appear corrupted?",
                a: "The most common causes are a truncated string, whitespace in the middle, or a mismatched MIME type in the data URI prefix. Check that the full string was copied and try stripping any line breaks."
            },
            {
                q: "How do I get a Base64 string from an existing image file?",
                a: "Use DevDeck's Base64 Image Converter in encode mode — drop the image file and it produces the full data URI instantly."
            }
        ]
    },

    "base64-data-urls-explained": {
        slug: "base64-data-urls-explained",
        title: "Base64 Data URLs Explained — How They Work and When to Use Them",
        metaDescription:
            "Data URLs embed files directly into HTML or CSS using Base64. Learn the syntax, browser support, performance trade-offs, and the right situations to use them.",
        metaKeywords: "base64 data url, data uri, data url image, base64 data uri, embed image base64 html css",
        intro: "A data URL is a URI scheme that lets you embed file content directly inside an HTML document or CSS stylesheet. Instead of a path to an external file, the file's content — encoded as Base64 — is written inline. This eliminates one HTTP request but comes with trade-offs worth understanding.",
        sections: [
            {
                heading: "Data URL Syntax",
                body: "The format is: `data:[<mediatype>][;base64],<data>`. The media type is a MIME type like `image/png` or `font/woff2`. The `;base64` flag tells the browser the data is Base64-encoded. Everything after the comma is the encoded content. Example: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0...`"
            },
            {
                heading: "Where Data URLs Are Used",
                list: [
                    "HTML `<img src>` — embed images without a separate file request",
                    "CSS `background-image: url(...)` — inline background images in stylesheets",
                    "CSS `@font-face src` — embed web fonts directly in CSS",
                    "HTML `<a href download>` — generate downloadable files purely in JavaScript",
                    "Email templates — many email clients block external images; data URLs are sometimes used for small inline images",
                    "Canvas toDataURL() — export canvas drawings as Base64 images"
                ]
            },
            {
                heading: "Browser Support",
                body: "Data URLs are supported in all modern browsers and have been since IE8 (with a 32KB size limit at the time). There are no meaningful browser compatibility concerns for standard use cases today. However, some environments restrict data URL navigation for security reasons — for example, clicking a link with `href='data:text/html,...'` is blocked in some browsers to prevent phishing."
            },
            {
                heading: "Performance Trade-offs",
                list: [
                    "Eliminates one HTTP request — beneficial for small assets where the request overhead exceeds the data size",
                    "Increases HTML/CSS file size by ~33% — the Base64 overhead travels in the document instead of a cached file",
                    "Cannot be cached independently — external image files are cached by the browser; a data URL is part of the document and cannot be cached separately",
                    "Blocks rendering — large inline data URLs in the HTML increase initial parse time",
                    "Not shared across pages — an external image file cached once is reused everywhere; a data URL is re-parsed on every page load"
                ]
            },
            {
                heading: "When Data URLs Make Sense",
                list: [
                    "Small icons under 2–3KB where the HTTP request overhead is comparable to the data size",
                    "SVG icons that are already text (though inline SVG is often more maintainable)",
                    "Email templates where external images are blocked",
                    "Single-file HTML deliverables (dashboards, reports) with no external dependencies",
                    "Generated download links in browser-based tools (no server needed)"
                ]
            },
            {
                heading: "When to Use External URLs Instead",
                list: [
                    "Images larger than 5KB — the caching benefit of an external file outweighs the request overhead",
                    "Images used on multiple pages — external files are cached once and reused",
                    "Performance-critical pages — inline data increases document parse time",
                    "CDN-served assets — CDNs compress and cache files more efficiently than inline data"
                ]
            },
            {
                heading: "Generating Data URLs in JavaScript",
                body: "The canvas API's `toDataURL()` method returns a data URL for the canvas content. For arbitrary files, use FileReader: `reader.readAsDataURL(file)` produces a data URL for any File or Blob. This is how DevDeck's Base64 Image Converter encodes dropped image files — the browser converts the file locally and produces the data URI with no server involved."
            }
        ],
        cta: { label: "Create a Base64 Data URL →", toolRoute: "/base64-image" },
        relatedSlugs: ["base64-image-converter", "what-is-base64-encoding", "how-to-decode-base64-image", "base64-vs-binary-images"],
        faq: [
            {
                q: "Is a data URL the same as a data URI?",
                a: "The terms are used interchangeably. URI (Uniform Resource Identifier) is the technically correct term; URL (Uniform Resource Locator) is widely used in practice. Both refer to the same `data:...` scheme."
            },
            {
                q: "Do data URLs work in all browsers?",
                a: "Yes, all modern browsers support data URLs for images, CSS, and fonts. There are no significant compatibility issues for standard use cases."
            },
            {
                q: "Why shouldn't I use data URLs for large images?",
                a: "Large data URLs increase HTML or CSS file size by ~33%, cannot be cached by the browser independently, and block rendering. External images served via CDN are almost always faster for anything over a few KB."
            },
            {
                q: "Can I use a data URL in a CSS file?",
                a: "Yes. You can use data URLs in CSS `background-image: url('data:image/png;base64,...')` and in `@font-face src` declarations. The same performance trade-offs apply."
            },
            {
                q: "How do I convert an image to a data URL?",
                a: "Use DevDeck's Base64 Image Converter — drop your image and it produces the complete data URI instantly. Or in JavaScript, use `FileReader.readAsDataURL(file)` or `canvas.toDataURL()`."
            }
        ]
    },

    "how-to-format-json": {
        slug: "how-to-format-json",
        title: "How to Format JSON — Pretty Print and Structure JSON Data",
        metaDescription:
            "Learn how to format and pretty-print JSON data for readability. Covers indentation, structure, online tools, and formatting in JavaScript, Python, and command line.",
        metaKeywords: "how to format json, pretty print json, json formatter, json beautify, format json online",
        intro: "Raw JSON from an API or log file is often a single compressed line with no whitespace. Formatting it — adding indentation and line breaks — makes it readable and easier to debug. This guide covers how to format JSON using an online tool, JavaScript, Python, and the command line.",
        sections: [
            {
                heading: "What JSON Formatting Does",
                body: "Formatting JSON adds consistent indentation and line breaks to make the structure visible. The data is identical before and after formatting — only whitespace changes. A formatter takes `{\"name\":\"Alice\",\"age\":30}` and produces the same data spread across multiple lines with two or four spaces of indentation per nesting level."
            },
            {
                heading: "Format JSON Online",
                steps: [
                    "Open DevDeck's JSON Viewer & Formatter",
                    "Paste your JSON into the input panel",
                    "The formatter validates and pretty-prints the JSON instantly",
                    "Copy the formatted output or download it"
                ]
            },
            {
                heading: "Format JSON in JavaScript",
                body: "Use `JSON.stringify()` with the third argument to control indentation. `JSON.stringify(data, null, 2)` formats with 2-space indentation. `JSON.stringify(data, null, 4)` uses 4 spaces. The second argument is a replacer (null means include everything). To format a JSON string you've received: `JSON.stringify(JSON.parse(jsonString), null, 2)` — parse first, then re-stringify with formatting."
            },
            {
                heading: "Format JSON in Python",
                body: "Use the `json` module: `import json; print(json.dumps(data, indent=2))`. To format a JSON file: `python3 -m json.tool input.json`. This reads the file, validates it, and prints formatted JSON to stdout. Pipe to a file to save: `python3 -m json.tool input.json > formatted.json`."
            },
            {
                heading: "Format JSON from the Command Line",
                list: [
                    "`cat file.json | python3 -m json.tool` — built-in Python formatter",
                    "`cat file.json | jq '.'` — jq is the standard JSON command-line processor",
                    "`echo '{\"a\":1}' | jq '.'` — format an inline JSON string",
                    "`jq '.' file.json > formatted.json` — format and save to a new file"
                ]
            },
            {
                heading: "Compact vs Pretty-Printed JSON",
                body: "Compact JSON (`{\"a\":1,\"b\":2}`) is smaller and faster to transmit over a network. Pretty-printed JSON is larger but human-readable. APIs typically return compact JSON for efficiency. When debugging, use a formatter to expand it. When writing JSON configuration files that humans edit, pretty-printed is standard. Most JSON parsers accept both formats equally — the choice is purely about readability vs. size."
            },
            {
                heading: "Sorting Keys When Formatting",
                body: "Some formatters can sort object keys alphabetically. This is useful for comparing two JSON objects or for keeping configuration files consistent. In Python: `json.dumps(data, indent=2, sort_keys=True)`. In jq: `jq -S '.' file.json` (the -S flag sorts keys). Sorted keys make diff output cleaner when JSON files are version-controlled."
            }
        ],
        cta: { label: "Format JSON Online →", toolRoute: "/json-viewer" },
        relatedSlugs: ["json-viewer", "how-to-validate-json", "json-syntax-guide", "common-json-errors"],
        faq: [
            {
                q: "Does formatting change JSON data?",
                a: "No. Formatting only adds whitespace — indentation and line breaks. The data values, keys, and structure are identical before and after formatting."
            },
            {
                q: "What indentation should I use for JSON?",
                a: "Two spaces is the most common convention. Four spaces is also common. Tabs work but can cause inconsistency across editors. Pick one and be consistent within a project."
            },
            {
                q: "Why does my JSON fail to format?",
                a: "Formatting fails if the JSON is invalid — usually a missing comma, extra comma, unquoted key, or mismatched bracket. A JSON validator will show you the exact error and line."
            },
            {
                q: "Can I format JSON with comments?",
                a: "Standard JSON does not support comments. If your file has comments (like in a tsconfig.json or VS Code settings file), it's technically JSONC (JSON with Comments), not valid JSON. A standard formatter will reject it."
            }
        ]
    },

    "how-to-validate-json": {
        slug: "how-to-validate-json",
        title: "How to Validate JSON — Find and Fix JSON Errors",
        metaDescription:
            "Learn how to validate JSON and find syntax errors. Covers common JSON mistakes, online validators, JavaScript validation, and JSON Schema validation.",
        metaKeywords: "validate json, json validator, json syntax error, json validation, check json valid",
        intro: "Invalid JSON is one of the most common causes of broken API integrations and configuration errors. A single missing comma or unquoted key makes the entire document unparseable. This guide explains how to validate JSON, find errors quickly, and understand what went wrong.",
        sections: [
            {
                heading: "What Makes JSON Invalid",
                list: [
                    "Trailing comma after the last item in an object or array — `{\"a\": 1,}` is invalid",
                    "Single quotes instead of double quotes — `{'a': 1}` is invalid; keys and strings must use double quotes",
                    "Unquoted keys — `{a: 1}` is invalid; all keys must be quoted strings",
                    "Missing comma between items — `{\"a\": 1 \"b\": 2}` is invalid",
                    "Comments — `// comment` and `/* comment */` are not valid JSON",
                    "Undefined or NaN values — JSON supports only null, not JavaScript's undefined or NaN",
                    "Mismatched brackets — every `{` needs a `}`, every `[` needs a `]`",
                    "Unescaped special characters in strings — newlines, tabs, and backslashes must be escaped"
                ]
            },
            {
                heading: "Validate JSON Online",
                steps: [
                    "Open DevDeck's JSON Viewer & Formatter",
                    "Paste your JSON into the input panel",
                    "Invalid JSON shows an error immediately with the line and character position",
                    "Fix the error and re-paste — or use the formatter's error highlighting to locate the issue"
                ]
            },
            {
                heading: "Validate JSON in JavaScript",
                body: "The simplest approach is a try/catch around `JSON.parse()`: wrap the parse call in try/catch, and if it throws, the JSON is invalid. The error message usually includes the position of the problem. For production code that needs structured validation (checking that the right fields exist with the right types), use a JSON Schema validator like Ajv or Zod."
            },
            {
                heading: "Validate JSON from the Command Line",
                list: [
                    "`cat file.json | python3 -m json.tool` — prints the error with line number if invalid",
                    "`jq '.' file.json` — jq exits with an error and message if the JSON is invalid",
                    "`node -e \"require('./file.json')\"` — Node.js throws a SyntaxError on invalid JSON"
                ]
            },
            {
                heading: "JSON Schema Validation",
                body: "Basic JSON validation only checks syntax. JSON Schema validation checks structure — required fields, data types, value ranges, allowed values. A schema defines what valid data looks like: `{ \"type\": \"object\", \"required\": [\"name\"], \"properties\": { \"name\": { \"type\": \"string\" }, \"age\": { \"type\": \"integer\" } } }`. Libraries like Ajv (JavaScript) or jsonschema (Python) validate data against a schema and report which fields are missing or wrong."
            },
            {
                heading: "Reading JSON Error Messages",
                body: "Most parsers report the position of the first error they encounter. A message like `Unexpected token } at position 42` means the parser hit a `}` where it didn't expect one — usually a missing comma or value before it. Count characters from the start (or use an editor with character position display) to find line 42. Fix the error, re-validate — subsequent errors may disappear once the first is resolved."
            }
        ],
        cta: { label: "Validate JSON Online →", toolRoute: "/json-viewer" },
        relatedSlugs: ["json-viewer", "how-to-format-json", "json-syntax-guide", "common-json-errors"],
        faq: [
            {
                q: "Is JSON5 valid JSON?",
                a: "No. JSON5 is a superset of JSON that adds comments, trailing commas, and unquoted keys. A standard JSON parser will reject JSON5. Use a JSON5-specific parser if you're working with JSON5 files."
            },
            {
                q: "Why does my JSON look valid but still fail to parse?",
                a: "Common causes: invisible Unicode characters copied from a document editor, a BOM (byte order mark) at the start of the file, or encoding issues in special characters. Paste into a validator that shows character codes to inspect."
            },
            {
                q: "Can I have comments in JSON?",
                a: "No. Standard JSON does not support comments. If you need comments in a JSON-like config file, use JSONC (supported by VS Code settings), JSON5, or YAML. Some tools (like TypeScript's tsconfig.json) accept JSONC silently."
            },
            {
                q: "What is the difference between JSON validation and JSON Schema validation?",
                a: "JSON validation checks syntax — is this a parseable JSON document? JSON Schema validation checks content — does this JSON have the right fields, types, and values? Both are useful; schema validation is needed when you want to enforce a data contract."
            }
        ]
    },

    "json-syntax-guide": {
        slug: "json-syntax-guide",
        title: "JSON Syntax Guide — Complete Reference for Developers",
        metaDescription:
            "A complete JSON syntax reference. Covers data types, objects, arrays, strings, numbers, booleans, null, nesting, and escaping rules with examples.",
        metaKeywords: "json syntax, json reference, json data types, json object, json array, json string, json number",
        intro: "JSON (JavaScript Object Notation) has a small, strict syntax. Six data types, two container structures, and a handful of escaping rules — that's the entire specification. This guide is a complete reference you can bookmark and return to whenever you need to remember an exact rule.",
        sections: [
            {
                heading: "JSON Data Types",
                list: [
                    "String — `\"hello\"` — must use double quotes",
                    "Number — `42`, `3.14`, `-7`, `1.5e10` — no NaN or Infinity",
                    "Boolean — `true` or `false` — lowercase only",
                    "Null — `null` — lowercase only",
                    "Object — `{\"key\": value}` — unordered key-value pairs",
                    "Array — `[value, value]` — ordered list of values"
                ]
            },
            {
                heading: "Objects",
                body: "An object is an unordered collection of key-value pairs wrapped in curly braces. Keys must be strings in double quotes. A colon separates each key from its value. Pairs are separated by commas. There must be no trailing comma after the last pair. Example: `{\"name\": \"Alice\", \"age\": 30, \"active\": true}`. Values can be any JSON type including another object or array."
            },
            {
                heading: "Arrays",
                body: "An array is an ordered list of values wrapped in square brackets. Values are separated by commas. No trailing comma after the last value. Values in an array can be any JSON type and can be mixed: `[1, \"two\", true, null, {\"key\": \"value\"}, [3, 4]]`. Arrays are zero-indexed when accessed in code."
            },
            {
                heading: "Strings",
                body: "JSON strings must be wrapped in double quotes (not single quotes). Special characters inside strings must be escaped with a backslash: `\\\"` for a literal quote, `\\\\` for a backslash, `\\/` for a forward slash, `\\n` for newline, `\\r` for carriage return, `\\t` for tab, `\\uXXXX` for a Unicode code point. Control characters (bytes 0x00–0x1F) must be escaped — you cannot include a literal newline inside a JSON string."
            },
            {
                heading: "Numbers",
                body: "JSON numbers can be integers (`42`), decimals (`3.14`), or use scientific notation (`1.5e10`, `2.5E-3`). Negative numbers use a leading minus: `-42`. JSON does not support: leading zeros (`042`), hexadecimal (`0xFF`), Infinity, or NaN. If your data has these values, encode them as strings or use a different format."
            },
            {
                heading: "Nesting",
                body: "JSON supports unlimited nesting of objects and arrays. An object value can be another object, an array value can be an object, and so on. Deep nesting is valid but can make data harder to work with. Most JSON parsers handle arbitrary nesting depth, though extremely deep nesting may hit stack limits in some environments."
            },
            {
                heading: "Whitespace",
                body: "Whitespace — spaces, tabs, newlines, carriage returns — is allowed between any JSON tokens. It has no semantic meaning. `{\"a\":1}` and `{ \"a\" : 1 }` are equivalent. JSON parsers skip whitespace between tokens. Inside strings, whitespace is part of the string value and is not ignored."
            },
            {
                heading: "Complete Example",
                body: "A realistic JSON document: an object with string, number, boolean, null, nested object, and array values: `{\"id\": 1, \"name\": \"Alice\", \"email\": \"alice@example.com\", \"age\": 30, \"active\": true, \"address\": null, \"scores\": [95, 87, 92], \"profile\": {\"bio\": \"Developer\", \"public\": false}}`."
            }
        ],
        cta: { label: "View and Format JSON →", toolRoute: "/json-viewer" },
        relatedSlugs: ["json-viewer", "how-to-format-json", "how-to-validate-json", "common-json-errors"],
        faq: [
            {
                q: "Does JSON support comments?",
                a: "No. Standard JSON has no comment syntax. JSONC and JSON5 are supersets that add comment support, but standard JSON parsers reject them."
            },
            {
                q: "Can JSON keys be duplicated?",
                a: "The JSON specification does not prohibit duplicate keys, but behavior is undefined — parsers may use the first value, the last value, or throw an error. In practice, avoid duplicate keys."
            },
            {
                q: "What is the difference between null and undefined in JSON?",
                a: "JSON only has `null`. JavaScript's `undefined` has no JSON equivalent — if you try to serialize `undefined`, `JSON.stringify()` either omits the key (in objects) or converts it to `null` (in arrays)."
            },
            {
                q: "Is JSON case-sensitive?",
                a: "Yes. Keys are case-sensitive strings: `\"Name\"` and `\"name\"` are different keys. The literal values `true`, `false`, and `null` must be lowercase — `True` and `NULL` are invalid JSON."
            },
            {
                q: "What encoding does JSON use?",
                a: "JSON text is defined as Unicode. UTF-8 is by far the most common encoding in practice. The JSON specification (RFC 8259) mandates UTF-8 for JSON transmitted over a network."
            }
        ]
    },

    "common-json-errors": {
        slug: "common-json-errors",
        title: "Common JSON Errors and How to Fix Them",
        metaDescription:
            "The most frequent JSON syntax errors — trailing commas, single quotes, unquoted keys, and more — with exact fixes and how to avoid them.",
        metaKeywords: "json errors, json syntax errors, json parsing error, json unexpected token, json trailing comma, json single quotes",
        intro: "Most JSON errors are caused by a small set of syntax mistakes. The parser message tells you where the error is, but not always what to fix. This guide covers the most common JSON errors, what causes them, and the exact change needed to fix each one.",
        sections: [
            {
                heading: "Trailing Comma",
                body: "One of the most common errors: a comma after the last item in an object or array. `{\"a\": 1, \"b\": 2,}` — the comma after `2` is invalid. Arrays: `[1, 2, 3,]` — the comma after `3` is invalid. JavaScript allows trailing commas; JSON does not. Fix: remove the last comma before the closing `}` or `]`."
            },
            {
                heading: "Single Quotes Instead of Double Quotes",
                body: "JSON requires double quotes for strings and keys. Single quotes are not valid. `{'name': 'Alice'}` is invalid JSON. Fix: replace all single quotes with double quotes: `{\"name\": \"Alice\"}`. This is common when JSON is hand-written or copied from JavaScript object literals."
            },
            {
                heading: "Unquoted Keys",
                body: "JavaScript object literals allow unquoted keys: `{name: 'Alice'}`. JSON does not — all keys must be double-quoted strings: `{\"name\": \"Alice\"}`. Copying a JS object literal into a JSON file is a frequent source of this error."
            },
            {
                heading: "Comments",
                body: "Standard JSON does not support comments. `// line comment` and `/* block comment */` both cause a parse error. Fix: remove all comments. If you need to annotate a JSON file, consider using JSONC (JSON with Comments, supported by VS Code and some parsers), JSON5, or YAML instead."
            },
            {
                heading: "Undefined, NaN, and Infinity",
                body: "JSON's number type does not include NaN or Infinity. `undefined` has no JSON equivalent. If your data contains these values, `JSON.stringify()` converts `undefined` to nothing (in objects) or `null` (in arrays), and converts `NaN` and `Infinity` to `null`. If you need to represent these in JSON, use a string: `\"NaN\"`, `\"Infinity\"`, or `\"undefined\"`."
            },
            {
                heading: "Mismatched or Missing Brackets",
                body: "Every `{` needs a matching `}`, and every `[` needs a matching `]`. A missing closing bracket causes an error at the end of the document: `Unexpected end of JSON input`. A mismatched bracket causes an error at the mismatch point. Use a formatter or editor with bracket matching to find these visually."
            },
            {
                heading: "Unescaped Special Characters in Strings",
                body: "Literal newlines and control characters inside JSON strings are invalid. If a string value contains a line break, it must be escaped as `\\n`. A literal tab must be `\\t`. A literal double quote must be `\\\"`. A literal backslash must be `\\\\`. Copy-pasting multi-line text into a JSON string is a common source of this error."
            },
            {
                heading: "Leading Zeros on Numbers",
                body: "JSON does not allow leading zeros on numbers: `042` is invalid. Use `42`. This also applies to zero itself: `0` is valid, but `00` is not. Hexadecimal numbers (`0xFF`) are also not valid JSON — convert to decimal."
            }
        ],
        cta: { label: "Validate and Fix JSON →", toolRoute: "/json-viewer" },
        relatedSlugs: ["json-viewer", "json-syntax-guide", "how-to-validate-json", "how-to-format-json"],
        faq: [
            {
                q: "What does 'Unexpected token' mean in a JSON error?",
                a: "It means the parser encountered a character it didn't expect at that position. Common causes: a missing comma before it, a trailing comma before a bracket, or an invalid value like `undefined` or `NaN`."
            },
            {
                q: "What does 'Unexpected end of JSON input' mean?",
                a: "The document ended before the JSON structure was complete — usually a missing closing bracket or brace. Check that every `{` has a `}` and every `[` has a `]`."
            },
            {
                q: "Can I use a linter to catch JSON errors automatically?",
                a: "Yes. Most editors (VS Code, JetBrains) validate `.json` files automatically and highlight errors inline. ESLint with the json plugin can validate JSON files in a CI pipeline."
            },
            {
                q: "Why does JSON.parse() succeed in one environment but fail in another?",
                a: "Some environments are more lenient than others — for example, Node.js's `require()` for `.json` files and some JSON5 parsers accept trailing commas. Use a strict validator (or `JSON.parse()` itself) to check true JSON compliance."
            }
        ]
    },

    "json-vs-json5": {
        slug: "json-vs-json5",
        title: "JSON vs JSON5 — What's the Difference?",
        metaDescription:
            "Compare JSON and JSON5. JSON5 adds comments, trailing commas, unquoted keys, and single quotes to standard JSON. Learn when each format is appropriate.",
        metaKeywords: "json vs json5, json5 vs json, json5 explained, json5 features, json5 support",
        intro: "JSON5 is a superset of JSON that adds several features developers often wish standard JSON had: comments, trailing commas, unquoted keys, single quotes, and more. Understanding the difference helps you choose the right format and know when standard JSON parsers will reject your files.",
        sections: [
            {
                heading: "What JSON5 Adds to Standard JSON",
                list: [
                    "Comments — both `//` line comments and `/* */` block comments",
                    "Trailing commas — allowed after the last item in objects and arrays",
                    "Unquoted keys — object keys don't need quotes if they're valid identifiers",
                    "Single-quoted strings — in addition to double-quoted strings",
                    "Multi-line strings — strings can span multiple lines using backslash continuation",
                    "Hexadecimal numbers — `0xFF` is valid",
                    "Leading and trailing decimal points — `.5` and `5.` are valid numbers",
                    "Infinity and NaN — `Infinity`, `-Infinity`, and `NaN` are valid number values",
                    "Plus sign on numbers — `+1` is valid"
                ]
            },
            {
                heading: "Where JSON5 Is Used",
                body: "JSON5 is used in configuration files where human editing is common and strict JSON parsing is unnecessary. Notable examples: Babel configuration (`babel.config.json5`), Rollup, and various developer tooling configs. VS Code's `settings.json` and TypeScript's `tsconfig.json` use JSONC (JSON with Comments) — similar to JSON5 but only adds comment support, not the other features."
            },
            {
                heading: "Standard JSON — When to Use It",
                list: [
                    "API request and response bodies — parsers on both ends expect strict JSON",
                    "Data interchange between systems — JSON is the universal standard",
                    "Database storage — most databases store and query strict JSON",
                    "Any context where you don't control the parser",
                    "REST APIs, GraphQL responses, webhook payloads"
                ]
            },
            {
                heading: "JSON5 — When to Use It",
                list: [
                    "Human-edited configuration files where comments are helpful",
                    "Build tool configs where trailing commas reduce diff noise",
                    "Internal tooling where you control both the writer and reader",
                    "Development-only files that won't cross a network boundary"
                ]
            },
            {
                heading: "Compatibility Warning",
                body: "Standard JSON parsers (`JSON.parse()` in JavaScript, Python's `json.loads()`, most API clients) will reject JSON5. If you write JSON5 and send it to an API or parse it with a standard library, you'll get a parse error. Always use strict JSON for data that crosses a system boundary. Use JSON5 only when you control the parser and have explicitly installed a JSON5 library."
            },
            {
                heading: "Parsing JSON5 in JavaScript",
                body: "Install the `json5` npm package: `npm install json5`. Then: `import JSON5 from 'json5'; const data = JSON5.parse(text);`. The API mirrors the built-in `JSON` object — `JSON5.parse()` and `JSON5.stringify()` work the same way. For configuration files in Node.js tooling, many tools have built-in JSON5 support and handle parsing automatically."
            }
        ],
        cta: { label: "View and Format JSON →", toolRoute: "/json-viewer" },
        relatedSlugs: ["json-viewer", "json-syntax-guide", "how-to-validate-json", "common-json-errors"],
        faq: [
            {
                q: "Is JSON5 backward compatible with JSON?",
                a: "Yes. Every valid JSON document is also valid JSON5. JSON5 only adds new features on top of JSON — it does not change existing JSON syntax."
            },
            {
                q: "Can I use JSON5 in a REST API?",
                a: "You shouldn't. API clients expect standard JSON. The `Content-Type: application/json` header signals strict JSON. Use JSON5 only for configuration files where you control both sides of the parser."
            },
            {
                q: "Does Node.js support JSON5 natively?",
                a: "No. Node.js's built-in `JSON.parse()` and `require()` for `.json` files use standard JSON parsing. Install the `json5` npm package to parse JSON5 in Node.js."
            },
            {
                q: "What is JSONC?",
                a: "JSONC (JSON with Comments) is a variant used by VS Code and TypeScript that adds comment support to standard JSON. It's a smaller extension than JSON5 — comments only, no trailing commas or other features."
            }
        ]
    },

    "what-is-a-rest-api": {
        slug: "what-is-a-rest-api",
        title: "What Is a REST API? A Developer's Guide",
        metaDescription:
            "Learn what a REST API is, how it works, and the key concepts — HTTP methods, resources, endpoints, status codes, and request/response structure.",
        metaKeywords: "what is a rest api, rest api explained, rest api guide, rest api http, rest api endpoints",
        intro: "A REST API is the most common way for web services to communicate. When your app fetches user data, submits a form, or loads a product catalog, it's almost certainly talking to a REST API. This guide explains what REST is, how requests and responses work, and the key concepts every developer needs to know.",
        sections: [
            {
                heading: "What REST Means",
                body: "REST stands for Representational State Transfer. It's an architectural style for designing network APIs, defined by Roy Fielding in 2000. A REST API exposes resources — users, orders, products — at URLs called endpoints. Clients interact with resources using standard HTTP methods. REST is not a protocol or a standard — it's a set of constraints that, when followed, produce predictable, scalable APIs."
            },
            {
                heading: "Resources and Endpoints",
                body: "In REST, everything is a resource. A user is a resource, a product is a resource, an order is a resource. Each resource has a URL called an endpoint. Endpoints are nouns, not verbs: `/users`, `/products/42`, `/orders/7/items`. The action is expressed by the HTTP method, not the URL. A well-designed REST API makes the resource structure intuitive from the URL alone."
            },
            {
                heading: "HTTP Methods",
                list: [
                    "GET — retrieve a resource or list of resources. No body. Safe and idempotent.",
                    "POST — create a new resource. Body contains the new resource data.",
                    "PUT — replace a resource entirely. Body contains the complete updated resource.",
                    "PATCH — partially update a resource. Body contains only the changed fields.",
                    "DELETE — remove a resource. Usually no body.",
                    "HEAD — like GET but returns only headers, no body. Used to check existence or metadata.",
                    "OPTIONS — returns allowed methods for a URL. Used in CORS preflight requests."
                ]
            },
            {
                heading: "HTTP Status Codes",
                list: [
                    "200 OK — request succeeded",
                    "201 Created — resource created (response to POST)",
                    "204 No Content — succeeded but no body (common for DELETE)",
                    "400 Bad Request — client sent invalid data",
                    "401 Unauthorized — authentication required",
                    "403 Forbidden — authenticated but not allowed",
                    "404 Not Found — resource does not exist",
                    "409 Conflict — state conflict (e.g. duplicate resource)",
                    "422 Unprocessable Entity — valid JSON but fails validation",
                    "429 Too Many Requests — rate limit exceeded",
                    "500 Internal Server Error — server-side failure"
                ]
            },
            {
                heading: "Request and Response Structure",
                body: "A REST request has four parts: the method (GET, POST, etc.), the URL (the endpoint), headers (Content-Type, Authorization, etc.), and optionally a body (JSON for POST/PUT/PATCH). The response has a status code, headers, and a body — typically JSON. Most REST APIs use `Content-Type: application/json` for both requests and responses."
            },
            {
                heading: "Authentication",
                body: "REST APIs use several authentication patterns. API keys are passed in a header (`X-API-Key: ...`) or query parameter. Bearer tokens (including JWTs) go in the Authorization header: `Authorization: Bearer <token>`. Basic Auth sends `Authorization: Basic <base64(user:pass)>`. OAuth 2.0 uses temporary access tokens obtained through an authorization flow. Always use HTTPS — credentials in headers are visible to anyone who can intercept the request without it."
            },
            {
                heading: "Testing REST API Requests",
                body: "Before writing code, test your API requests manually to understand the request format and response structure. DevDeck's API Request Builder lets you send HTTP requests directly in the browser — set the method, URL, headers, and body, then inspect the response. This is faster than writing code and helps you debug authentication and payload issues before integrating into your application."
            }
        ],
        cta: { label: "Test REST API Requests →", toolRoute: "/api-builder" },
        relatedSlugs: ["api-request-builder", "http-methods-explained", "how-to-test-api-endpoints"],
        faq: [
            {
                q: "What is the difference between REST and SOAP?",
                a: "SOAP is an older protocol that uses XML and has strict standards for message format, error handling, and security. REST is an architectural style that uses HTTP and typically JSON. REST is simpler, more flexible, and now far more widely used for new APIs."
            },
            {
                q: "What is the difference between REST and GraphQL?",
                a: "REST uses multiple endpoints, one per resource type. GraphQL uses a single endpoint where the client specifies exactly which fields it needs. GraphQL reduces over-fetching and under-fetching but adds complexity. Most public APIs are REST; GraphQL is common in internal APIs with complex, nested data requirements."
            },
            {
                q: "Does a REST API have to use JSON?",
                a: "No. REST can use any data format — XML, YAML, plain text. But JSON has become the de facto standard because it's lightweight, human-readable, and natively supported in JavaScript."
            },
            {
                q: "What makes an API RESTful?",
                a: "A RESTful API follows the REST constraints: stateless communication, resource-based URLs, standard HTTP methods for actions, and a uniform interface. Many APIs called 'REST' are technically REST-like but not fully RESTful — for practical purposes, the term means HTTP APIs with JSON."
            }
        ]
    },

    "http-methods-explained": {
        slug: "http-methods-explained",
        title: "HTTP Request Methods Explained — GET, POST, PUT, PATCH, DELETE",
        metaDescription:
            "Understand HTTP methods — GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS. Learn when to use each method and what to expect in the response.",
        metaKeywords: "http methods, get post put patch delete, http request methods, rest api methods, http verbs",
        intro: "HTTP methods tell a server what action to take on a resource. Every REST API request uses one of a handful of methods — GET, POST, PUT, PATCH, DELETE — and choosing the right one is fundamental to building and consuming APIs correctly.",
        sections: [
            {
                heading: "GET — Retrieve Data",
                body: "GET requests a resource from the server. It should not modify data. GET requests have no body — all parameters go in the URL (path or query string). Responses are cached by browsers and CDNs. GET is idempotent — calling it multiple times has the same result as calling it once. Use GET to fetch a list of items (`GET /users`), a single item (`GET /users/42`), or search results (`GET /users?role=admin`)."
            },
            {
                heading: "POST — Create a Resource",
                body: "POST sends data to create a new resource. The body contains the new resource data as JSON (or form data). The server assigns the resource's ID and returns it in the response. POST is not idempotent — calling it twice creates two resources. A successful POST typically returns 201 Created with the created resource in the body and a Location header pointing to the new resource's URL."
            },
            {
                heading: "PUT — Replace a Resource",
                body: "PUT replaces an existing resource entirely with the data in the request body. The client must send the complete resource — any fields omitted in the body are removed from the resource. PUT is idempotent — calling it multiple times produces the same result. Use PUT when you're replacing the entire state of a resource. A successful PUT typically returns 200 OK or 204 No Content."
            },
            {
                heading: "PATCH — Partially Update a Resource",
                body: "PATCH applies a partial update — only the fields in the request body are changed. Fields not included remain unchanged. PATCH is more efficient than PUT when updating one or two fields of a large resource. PATCH should be idempotent by design, though the spec does not strictly require it. A successful PATCH returns 200 OK (with the updated resource) or 204 No Content."
            },
            {
                heading: "DELETE — Remove a Resource",
                body: "DELETE removes the specified resource. It typically has no request body. A successful DELETE usually returns 204 No Content (no body) or 200 OK (with a success message). DELETE is idempotent — deleting an already-deleted resource should return 404, but the server state is the same whether you called it once or ten times."
            },
            {
                heading: "HEAD and OPTIONS",
                body: "HEAD is identical to GET but returns only the response headers, no body. Use it to check if a resource exists, get its metadata, or check the Content-Length before downloading. OPTIONS returns the HTTP methods the server supports for a given URL. Browsers send an OPTIONS preflight request before cross-origin requests to check CORS permissions."
            },
            {
                heading: "Idempotency and Safety",
                body: "A safe method doesn't modify server state: GET, HEAD, OPTIONS. An idempotent method produces the same server state regardless of how many times it's called: GET, HEAD, OPTIONS, PUT, DELETE. POST and PATCH are neither safe nor idempotent by default. These properties matter for retry logic — if a network request fails, you can safely retry an idempotent method. Retrying a non-idempotent POST may create duplicate resources."
            }
        ],
        cta: { label: "Test HTTP Requests →", toolRoute: "/api-builder" },
        relatedSlugs: ["api-request-builder", "what-is-a-rest-api", "how-to-test-api-endpoints"],
        faq: [
            {
                q: "When should I use PUT vs PATCH?",
                a: "Use PUT to replace an entire resource. Use PATCH to update specific fields. If you only need to change one field of a large object, PATCH is more efficient and less error-prone — you won't accidentally clear fields you forgot to include."
            },
            {
                q: "Can a GET request have a body?",
                a: "Technically yes, but it's bad practice and many servers and proxies ignore it. GET parameters should go in the URL query string. If you need to send a complex query body, consider using POST to a search endpoint."
            },
            {
                q: "What's the difference between 401 and 403?",
                a: "401 Unauthorized means the request lacks valid authentication — the server doesn't know who you are. 403 Forbidden means the server knows who you are but you're not allowed to access that resource."
            },
            {
                q: "Why does my browser send an OPTIONS request before POST?",
                a: "That's a CORS preflight request. The browser checks with the server that the cross-origin POST is allowed before actually sending it. The server's response to OPTIONS tells the browser which origins, methods, and headers are permitted."
            }
        ]
    },

    "how-to-test-api-endpoints": {
        slug: "how-to-test-api-endpoints",
        title: "How to Test API Endpoints Online — Without Writing Code",
        metaDescription:
            "Learn how to test REST API endpoints directly in your browser. Covers sending GET, POST, PUT, DELETE requests, setting headers, authentication, and inspecting responses.",
        metaKeywords: "test api endpoints, api testing online, test rest api, api request tester, http request builder online",
        intro: "Testing API endpoints before writing code saves significant debugging time. Sending a raw HTTP request lets you see exactly what the server expects and returns — before wiring it into your application. This guide covers how to test API endpoints online without any tools to install.",
        sections: [
            {
                heading: "Why Test API Endpoints Manually",
                list: [
                    "Understand the exact request format an API expects before coding",
                    "Debug authentication errors without runtime context obscuring the issue",
                    "Verify what a response looks like before writing deserialization code",
                    "Reproduce a bug with a minimal request independent of your application code",
                    "Explore an undocumented API by inspecting its actual behavior"
                ]
            },
            {
                heading: "Send a GET Request",
                steps: [
                    "Open DevDeck's API Request Builder",
                    "Select GET from the method dropdown",
                    "Enter the endpoint URL — e.g. `https://api.example.com/users`",
                    "Add any required headers (Authorization, API-Key, etc.)",
                    "Click Send and inspect the response body, status code, and headers"
                ]
            },
            {
                heading: "Send a POST Request with JSON Body",
                steps: [
                    "Select POST from the method dropdown",
                    "Enter the endpoint URL",
                    "Add a Content-Type header: `application/json`",
                    "Add your Authorization header if required",
                    "Paste your JSON body in the request body panel",
                    "Click Send — check for 201 Created and the response body"
                ]
            },
            {
                heading: "Setting Authentication Headers",
                list: [
                    "Bearer token (JWT) — add header `Authorization` with value `Bearer <your-token>`",
                    "API key in header — add the header name specified in the API docs (e.g. `X-API-Key`) with your key as the value",
                    "Basic Auth — add header `Authorization` with value `Basic <base64(username:password)>`",
                    "API key in query param — append `?api_key=your-key` to the URL"
                ]
            },
            {
                heading: "Reading the Response",
                body: "The response has three parts to check: the status code, the headers, and the body. Status 200–299 means success. 400 means you sent a bad request — read the body for details. 401/403 means authentication failed. 404 means the resource doesn't exist. 500 means the server crashed. The response body usually contains the resource data (on success) or an error message (on failure) as JSON."
            },
            {
                heading: "Debugging Common API Errors",
                list: [
                    "400 Bad Request — check your JSON body for syntax errors; check required fields",
                    "401 Unauthorized — your token is missing, expired, or malformed; check the Authorization header format",
                    "403 Forbidden — you're authenticated but lack permission; check API key scopes or token claims",
                    "404 Not Found — check the URL path; resource ID may not exist",
                    "415 Unsupported Media Type — missing or wrong Content-Type header; add `Content-Type: application/json`",
                    "429 Too Many Requests — you've hit the rate limit; wait before retrying",
                    "CORS error — the API may not support browser-based requests; check the API docs for CORS policy"
                ]
            },
            {
                heading: "A Note on CORS",
                body: "CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests to a different domain than the current page. If an API doesn't explicitly allow your origin, browser-based tools will show a CORS error — even if the API works fine from a server or mobile app. This is a browser restriction, not an API bug. If you encounter CORS errors, the API may need to be tested from a server-side tool or a CORS proxy."
            }
        ],
        cta: { label: "Test API Endpoints →", toolRoute: "/api-builder" },
        relatedSlugs: ["api-request-builder", "what-is-a-rest-api", "http-methods-explained"],
        faq: [
            {
                q: "Do I need to install anything to test APIs with DevDeck?",
                a: "No. DevDeck's API Request Builder runs entirely in the browser — no installation, no account required."
            },
            {
                q: "Why do I get a CORS error when testing an API?",
                a: "CORS errors are browser security restrictions that block requests to different domains unless the server explicitly allows it. Some APIs are only designed to be called from servers, not browsers. Try the API from a server-side environment if you consistently hit CORS errors."
            },
            {
                q: "Can I send requests with a custom JSON body?",
                a: "Yes. Select POST, PUT, or PATCH, add a Content-Type: application/json header, and paste or type your JSON body. DevDeck sends the body exactly as entered."
            },
            {
                q: "How do I test a DELETE endpoint?",
                a: "Select DELETE from the method dropdown, enter the resource URL (e.g. `/users/42`), add your authorization header, and send. A successful DELETE typically returns 204 No Content with an empty body."
            }
        ]
    },

    "how-to-convert-css-to-tailwind": {
        slug: "how-to-convert-css-to-tailwind",
        title: "How to Convert CSS to Tailwind — Complete Guide",
        metaDescription:
            "Learn how to convert custom CSS properties to Tailwind utility classes. Covers spacing, typography, colors, flexbox, grid, borders, shadows, and arbitrary values.",
        metaKeywords: "convert css to tailwind, css to tailwind guide, tailwind classes from css, tailwind utility classes, css tailwind conversion",
        intro: "Migrating from custom CSS to Tailwind means replacing property-value pairs with utility classes. Most CSS properties map directly to a Tailwind class — once you know the naming pattern, conversions become fast and predictable. This guide covers the full conversion process and the patterns that come up most often.",
        sections: [
            {
                heading: "How Tailwind's Naming Pattern Works",
                body: "Tailwind class names follow a consistent formula: `property-value`. For spacing, `p-4` means `padding: 1rem` (4 × 0.25rem). For colors, `text-blue-500` means the blue color at shade 500. For layout, `flex` means `display: flex`. Once you internalize the scale and naming convention, you can predict most class names without looking them up."
            },
            {
                heading: "Spacing — Margin and Padding",
                list: [
                    "`margin: 1rem` → `m-4`",
                    "`margin-top: 0.5rem` → `mt-2`",
                    "`margin-left: auto` → `ml-auto`",
                    "`padding: 1.5rem` → `p-6`",
                    "`padding-left: 1rem; padding-right: 1rem` → `px-4`",
                    "`padding-top: 0.75rem; padding-bottom: 0.75rem` → `py-3`",
                    "Tailwind's default scale: 1 = 0.25rem, 2 = 0.5rem, 4 = 1rem, 8 = 2rem"
                ]
            },
            {
                heading: "Typography",
                list: [
                    "`font-size: 0.875rem` → `text-sm`",
                    "`font-size: 1rem` → `text-base`",
                    "`font-size: 1.25rem` → `text-xl`",
                    "`font-weight: 600` → `font-semibold`",
                    "`font-weight: 700` → `font-bold`",
                    "`line-height: 1.5` → `leading-normal`",
                    "`text-align: center` → `text-center`",
                    "`color: #6b7280` → `text-gray-500`",
                    "`text-transform: uppercase` → `uppercase`",
                    "`letter-spacing: 0.05em` → `tracking-wide`"
                ]
            },
            {
                heading: "Display and Flexbox",
                list: [
                    "`display: flex` → `flex`",
                    "`display: inline-flex` → `inline-flex`",
                    "`flex-direction: column` → `flex-col`",
                    "`justify-content: center` → `justify-center`",
                    "`justify-content: space-between` → `justify-between`",
                    "`align-items: center` → `items-center`",
                    "`align-items: flex-start` → `items-start`",
                    "`flex-wrap: wrap` → `flex-wrap`",
                    "`gap: 1rem` → `gap-4`",
                    "`flex: 1` → `flex-1`"
                ]
            },
            {
                heading: "Width, Height, and Sizing",
                list: [
                    "`width: 100%` → `w-full`",
                    "`width: 100vw` → `w-screen`",
                    "`max-width: 1280px` → `max-w-7xl`",
                    "`height: 100vh` → `h-screen`",
                    "`min-height: 100vh` → `min-h-screen`",
                    "`width: 2rem` → `w-8`",
                    "`height: 2rem` → `h-8`"
                ]
            },
            {
                heading: "Borders and Shadows",
                list: [
                    "`border: 1px solid` → `border`",
                    "`border-radius: 0.25rem` → `rounded`",
                    "`border-radius: 0.5rem` → `rounded-lg`",
                    "`border-radius: 9999px` → `rounded-full`",
                    "`border-color: #e5e7eb` → `border-gray-200`",
                    "`box-shadow: 0 1px 3px rgba(0,0,0,0.1)` → `shadow`",
                    "`box-shadow: 0 10px 25px rgba(0,0,0,0.1)` → `shadow-xl`"
                ]
            },
            {
                heading: "Arbitrary Values for Non-Standard CSS",
                body: "When your CSS value doesn't match a Tailwind scale value exactly, use arbitrary values with square bracket notation: `width: 347px` → `w-[347px]`, `color: #1a2b3c` → `text-[#1a2b3c]`, `padding: 13px` → `p-[13px]`. Arbitrary values work for any property and let you use Tailwind's other utilities alongside one-off custom values without writing separate CSS."
            }
        ],
        cta: { label: "Convert CSS to Tailwind →", toolRoute: "/css-tailwind" },
        relatedSlugs: ["css-to-tailwind-converter", "css-to-tailwind-examples", "common-css-to-tailwind-patterns", "tailwind-responsive-design"],
        faq: [
            {
                q: "Does every CSS property have a Tailwind equivalent?",
                a: "Most common properties do. For anything without a direct class, use Tailwind's arbitrary value syntax: `property-[value]`, like `w-[347px]` or `text-[#abc123]`."
            },
            {
                q: "What is Tailwind's spacing scale?",
                a: "Tailwind's default spacing scale is based on 0.25rem increments. `1` = 0.25rem, `2` = 0.5rem, `4` = 1rem, `8` = 2rem, `16` = 4rem. So `p-4` means `padding: 1rem`."
            },
            {
                q: "Can I use a tool to convert CSS to Tailwind automatically?",
                a: "Yes. DevDeck's CSS → Tailwind Converter maps 120+ CSS properties to their Tailwind equivalents. Paste your CSS and get Tailwind classes instantly."
            },
            {
                q: "What about CSS custom properties (variables)?",
                a: "CSS custom properties (`--color: red`) don't have direct Tailwind equivalents. You can reference them using arbitrary values: `text-[var(--color)]`. Or configure them in your Tailwind theme in `tailwind.config.js`."
            },
            {
                q: "How do I handle CSS that uses media queries?",
                a: "Tailwind handles responsive design with breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`. A CSS rule like `@media (min-width: 768px) { font-size: 1.25rem }` becomes `md:text-xl` in Tailwind."
            }
        ]
    },

    "css-to-tailwind-examples": {
        slug: "css-to-tailwind-examples",
        title: "CSS to Tailwind Examples — Real-World Conversions",
        metaDescription:
            "Practical CSS to Tailwind conversion examples for cards, buttons, navbars, forms, and more. See the exact Tailwind classes for common CSS patterns.",
        metaKeywords: "css to tailwind examples, tailwind class examples, tailwind conversion examples, css tailwind cheatsheet, css to tailwind practical",
        intro: "The fastest way to learn CSS-to-Tailwind conversion is through real examples. This guide shows complete conversions for the UI patterns developers write most often — cards, buttons, navbars, form inputs, and layout containers.",
        sections: [
            {
                heading: "Card Component",
                body: "CSS: `background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 1.5rem; border: 1px solid #e5e7eb;`. Tailwind: `bg-white rounded-lg shadow border border-gray-200 p-6`. The combination `bg-white rounded-lg shadow border border-gray-200 p-6` is one of the most common card patterns in Tailwind projects."
            },
            {
                heading: "Primary Button",
                body: "CSS: `background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; font-weight: 600; cursor: pointer; border: none;`. Tailwind: `bg-blue-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer border-0`. Add `hover:bg-blue-600` for a hover state — which in vanilla CSS would require a separate `:hover` rule."
            },
            {
                heading: "Centered Layout Container",
                body: "CSS: `max-width: 1280px; margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem;`. Tailwind: `max-w-7xl mx-auto px-6`. This is the standard page container pattern. For responsive padding, use `px-4 sm:px-6 lg:px-8` to increase padding at larger breakpoints."
            },
            {
                heading: "Flexbox Navigation Bar",
                body: "CSS: `display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background-color: white; border-bottom: 1px solid #e5e7eb;`. Tailwind: `flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200`."
            },
            {
                heading: "Form Input",
                body: "CSS: `width: 100%; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.5rem 0.75rem; font-size: 0.875rem; outline: none;`. Tailwind: `w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`. The `focus:` prefix in Tailwind replaces the CSS `:focus` pseudo-class."
            },
            {
                heading: "Badge / Pill",
                body: "CSS: `display: inline-flex; align-items: center; background-color: #dbeafe; color: #1d4ed8; font-size: 0.75rem; font-weight: 600; padding: 0.125rem 0.625rem; border-radius: 9999px;`. Tailwind: `inline-flex items-center bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full`."
            },
            {
                heading: "Grid Layout",
                body: "CSS: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;`. Tailwind: `grid grid-cols-3 gap-6`. For responsive grids: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` — one column on mobile, two on tablet, three on desktop."
            },
            {
                heading: "Overlay / Modal Backdrop",
                body: "CSS: `position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 50;`. Tailwind: `fixed inset-0 bg-black/50 flex justify-center items-center z-50`. The `/50` opacity shorthand was introduced in Tailwind v3."
            }
        ],
        cta: { label: "Convert CSS to Tailwind →", toolRoute: "/css-tailwind" },
        relatedSlugs: ["css-to-tailwind-converter", "how-to-convert-css-to-tailwind", "common-css-to-tailwind-patterns", "tailwind-responsive-design"],
        faq: [
            {
                q: "How do I handle hover states in Tailwind?",
                a: "Use the `hover:` prefix: `hover:bg-blue-600`, `hover:text-white`, `hover:shadow-lg`. This replaces CSS `:hover` rules. Tailwind generates the hover styles automatically."
            },
            {
                q: "What replaces CSS :focus styles in Tailwind?",
                a: "The `focus:` prefix: `focus:ring-2 focus:ring-blue-500 focus:border-blue-500`. For keyboard focus only, use `focus-visible:`."
            },
            {
                q: "How do I do CSS transitions in Tailwind?",
                a: "Use `transition`, `transition-colors`, `transition-all`, or `transition-transform` for the transition property, combined with `duration-200` or `duration-300` for timing, and `ease-in-out` for easing."
            },
            {
                q: "Can I mix Tailwind classes with custom CSS?",
                a: "Yes. You can use Tailwind utilities alongside a custom CSS class, or use Tailwind's `@apply` directive to apply utilities inside a CSS rule. Most teams gradually migrate to Tailwind while keeping some existing CSS."
            }
        ]
    },

    "common-css-to-tailwind-patterns": {
        slug: "common-css-to-tailwind-patterns",
        title: "Common CSS-to-Tailwind Patterns — Quick Reference",
        metaDescription:
            "A quick-reference guide to the most common CSS patterns and their Tailwind equivalents. Covers pseudo-classes, transitions, dark mode, arbitrary values, and more.",
        metaKeywords: "css tailwind patterns, tailwind cheatsheet, tailwind pseudo classes, tailwind dark mode, tailwind transitions, arbitrary values tailwind",
        intro: "Beyond basic property mapping, Tailwind has patterns for pseudo-classes, responsive breakpoints, dark mode, transitions, and custom values. This quick-reference covers the patterns that come up repeatedly when migrating CSS to Tailwind.",
        sections: [
            {
                heading: "Pseudo-Class Patterns",
                list: [
                    "`:hover` → `hover:` prefix — `hover:bg-blue-600`",
                    "`:focus` → `focus:` prefix — `focus:ring-2`",
                    "`:focus-visible` → `focus-visible:` prefix — `focus-visible:outline-none`",
                    "`:active` → `active:` prefix — `active:scale-95`",
                    "`:disabled` → `disabled:` prefix — `disabled:opacity-50`",
                    "`:first-child` → `first:` prefix — `first:border-t-0`",
                    "`:last-child` → `last:` prefix — `last:border-b-0`",
                    "`:odd` / `:even` → `odd:` / `even:` — `even:bg-gray-50`",
                    "`:placeholder` → `placeholder:` — `placeholder:text-gray-400`"
                ]
            },
            {
                heading: "Group and Peer Patterns",
                body: "CSS can style a child when a parent is hovered: `parent:hover .child { color: blue }`. Tailwind handles this with the `group` and `group-hover:` pattern. Add `group` to the parent element and `group-hover:text-blue-500` to the child. The `peer` pattern is similar but works for sibling elements — mark one element as `peer` and style the next sibling with `peer-hover:`, `peer-checked:`, etc."
            },
            {
                heading: "Transition and Animation",
                list: [
                    "`transition: all 150ms ease-in-out` → `transition-all duration-150 ease-in-out`",
                    "`transition: color 200ms` → `transition-colors duration-200`",
                    "`transition: transform 300ms` → `transition-transform duration-300`",
                    "`transform: scale(1.05)` → `scale-105`",
                    "`transform: translateY(-4px)` → `-translate-y-1`",
                    "`transform: rotate(45deg)` → `rotate-45`",
                    "Combine: `hover:scale-105 transition-transform duration-200`"
                ]
            },
            {
                heading: "Dark Mode",
                body: "CSS dark mode uses a media query: `@media (prefers-color-scheme: dark)`. Tailwind uses the `dark:` prefix: `bg-white dark:bg-gray-900`, `text-gray-900 dark:text-white`. With `darkMode: 'class'` in your Tailwind config, dark mode is toggled by adding the `dark` class to the `<html>` element — useful for user-controlled theme switching. With `darkMode: 'media'` (the default), it follows the system preference."
            },
            {
                heading: "Position and Z-Index",
                list: [
                    "`position: relative` → `relative`",
                    "`position: absolute` → `absolute`",
                    "`position: fixed` → `fixed`",
                    "`position: sticky` → `sticky`",
                    "`top: 0` → `top-0`",
                    "`right: 0` → `right-0`",
                    "`inset: 0` (all sides 0) → `inset-0`",
                    "`z-index: 10` → `z-10`",
                    "`z-index: 50` → `z-50`"
                ]
            },
            {
                heading: "Overflow and Visibility",
                list: [
                    "`overflow: hidden` → `overflow-hidden`",
                    "`overflow: auto` → `overflow-auto`",
                    "`overflow-x: auto; overflow-y: hidden` → `overflow-x-auto overflow-y-hidden`",
                    "`text-overflow: ellipsis; overflow: hidden; white-space: nowrap` → `truncate`",
                    "`visibility: hidden` → `invisible` (takes up space)",
                    "`display: none` → `hidden` (removes from layout)",
                    "`opacity: 0` → `opacity-0`",
                    "`pointer-events: none` → `pointer-events-none`"
                ]
            },
            {
                heading: "Arbitrary Values and CSS Variables",
                body: "For values outside Tailwind's default scale, use square bracket notation: `w-[347px]`, `text-[#1a2b3c]`, `bg-[rgba(0,0,0,0.4)]`, `mt-[13px]`. CSS variables work too: `text-[var(--brand-color)]`, `bg-[var(--surface)]`. This pattern works for any Tailwind utility — spacing, sizing, colors, typography."
            },
            {
                heading: "Applying Tailwind in CSS with @apply",
                body: "When you can't use utility classes directly (third-party component styles, generated markup), use `@apply` in a CSS file: `.btn { @apply px-4 py-2 bg-blue-500 text-white rounded-md font-semibold; }`. `@apply` extracts the CSS from Tailwind's generated output at build time. Use it sparingly — overusing `@apply` recreates the same specificity and maintenance problems that Tailwind's utility approach is designed to avoid."
            }
        ],
        cta: { label: "Convert CSS to Tailwind →", toolRoute: "/css-tailwind" },
        relatedSlugs: ["css-to-tailwind-converter", "how-to-convert-css-to-tailwind", "css-to-tailwind-examples", "tailwind-responsive-design"],
        faq: [
            {
                q: "How do I handle CSS :nth-child in Tailwind?",
                a: "Tailwind has `first:`, `last:`, `odd:`, and `even:` variants. For arbitrary nth-child selectors, you need a custom CSS rule — Tailwind doesn't have arbitrary pseudo-class selectors."
            },
            {
                q: "What is the Tailwind equivalent of CSS calc()?",
                a: "Use arbitrary values with calc inside brackets: `w-[calc(100%-2rem)]`, `h-[calc(100vh-4rem)]`. Tailwind passes the value through as-is."
            },
            {
                q: "How do I write CSS animations in Tailwind?",
                a: "Tailwind includes `animate-spin`, `animate-ping`, `animate-bounce`, and `animate-pulse` out of the box. For custom animations, define them in `tailwind.config.js` under `theme.extend.keyframes` and `theme.extend.animation`, then use the class in your markup."
            },
            {
                q: "Is @apply bad practice?",
                a: "Not inherently, but it should be used sparingly. Overusing @apply recreates the CSS specificity and naming problems that Tailwind's utility approach avoids. Use it for third-party component overrides or generated markup where you can't add utility classes directly."
            }
        ]
    },

    "tailwind-responsive-design": {
        slug: "tailwind-responsive-design",
        title: "Tailwind Responsive Design — Breakpoints and Mobile-First Layout",
        metaDescription:
            "Learn how Tailwind's responsive breakpoint system works. Covers mobile-first design, breakpoint prefixes, responsive typography, grids, flexbox, and hiding elements.",
        metaKeywords: "tailwind responsive design, tailwind breakpoints, tailwind mobile first, tailwind sm md lg xl, tailwind responsive grid",
        intro: "Tailwind's responsive system replaces CSS media queries with breakpoint prefixes on utility classes. It's mobile-first — a class without a prefix applies at all sizes, and prefixed classes apply from that breakpoint upward. Understanding this model is the key to writing clean responsive layouts without a single media query.",
        sections: [
            {
                heading: "Default Breakpoints",
                list: [
                    "`sm:` — min-width: 640px (small screens and up)",
                    "`md:` — min-width: 768px (medium screens and up)",
                    "`lg:` — min-width: 1024px (large screens and up)",
                    "`xl:` — min-width: 1280px (extra large screens and up)",
                    "`2xl:` — min-width: 1536px (2x extra large and up)"
                ]
            },
            {
                heading: "Mobile-First Means No-Prefix = Smallest Screen",
                body: "A class without a prefix applies to all screen sizes. A prefixed class overrides at that breakpoint and above. So `text-sm md:text-base lg:text-lg` means: small text on mobile, base on tablet, large on desktop. You don't need `sm:text-sm` — the unprefixed `text-sm` already covers everything below `md:`."
            },
            {
                heading: "Responsive Typography",
                list: [
                    "`text-sm md:text-base lg:text-lg` — scale font size with screen",
                    "`text-center md:text-left` — centered on mobile, left-aligned on tablet+",
                    "`font-normal md:font-semibold` — change weight at breakpoint",
                    "`hidden md:block` — hide on mobile, show on tablet+"
                ]
            },
            {
                heading: "Responsive Grid",
                body: "The most common responsive pattern: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`. This renders one column on mobile, two columns from 640px, and three from 1024px. Compare this to the equivalent CSS: three separate `@media` rules and a `grid-template-columns` property in each. Tailwind collapses all of that into a single class string on the element."
            },
            {
                heading: "Responsive Flexbox",
                list: [
                    "`flex-col md:flex-row` — stack vertically on mobile, row on desktop",
                    "`items-start md:items-center` — change alignment at breakpoint",
                    "`gap-4 lg:gap-8` — larger gaps on wide screens",
                    "`flex-wrap xl:flex-nowrap` — prevent wrapping on very wide screens"
                ]
            },
            {
                heading: "Responsive Spacing",
                list: [
                    "`p-4 md:p-6 lg:p-8` — increase padding on larger screens",
                    "`px-4 sm:px-6 lg:px-8` — standard responsive container padding",
                    "`mt-8 lg:mt-16` — larger top margin on desktop",
                    "`max-w-sm md:max-w-2xl lg:max-w-4xl` — wider container on larger screens"
                ]
            },
            {
                heading: "Show and Hide Elements",
                list: [
                    "`hidden md:block` — hidden on mobile, visible from tablet+",
                    "`block md:hidden` — visible on mobile, hidden from tablet+",
                    "`flex md:hidden` — flex on mobile, hidden on tablet+",
                    "`hidden lg:flex` — hidden until desktop, then flex"
                ]
            },
            {
                heading: "Converting CSS Media Queries to Tailwind",
                body: "CSS media query: `@media (min-width: 768px) { .card { flex-direction: row; padding: 2rem; } }`. Tailwind equivalent: add `md:flex-row md:p-8` to the element's class list. Each CSS property inside the media query becomes a prefixed utility on the element. No separate CSS file or rule needed — all responsive logic lives inline on the element."
            }
        ],
        cta: { label: "Convert CSS to Tailwind →", toolRoute: "/css-tailwind" },
        relatedSlugs: ["css-to-tailwind-converter", "how-to-convert-css-to-tailwind", "css-to-tailwind-examples", "common-css-to-tailwind-patterns"],
        faq: [
            {
                q: "Is Tailwind mobile-first or desktop-first?",
                a: "Mobile-first. Unprefixed classes apply to all screen sizes. Breakpoint prefixes like `md:` apply from that breakpoint upward. Design for mobile first, then add prefixed classes to adjust for larger screens."
            },
            {
                q: "How do I target only a specific screen size range in Tailwind?",
                a: "By default, Tailwind breakpoints are min-width (apply at that size and above). To target a range, use the `max-` variant: `md:max-lg:text-center` applies only between md and lg. You can also add custom breakpoints in `tailwind.config.js`."
            },
            {
                q: "Can I add custom breakpoints to Tailwind?",
                a: "Yes. Define them in `tailwind.config.js` under `theme.extend.screens`: `screens: { '3xl': '1920px' }`. Then use the `3xl:` prefix in your classes."
            },
            {
                q: "What is the equivalent of CSS @media (max-width) in Tailwind?",
                a: "Tailwind v3.2+ includes `max-` variants: `max-md:text-sm` applies below the md breakpoint. In older Tailwind, you'd work around this by designing mobile-first — apply the mobile style unprefixed and override at larger breakpoints."
            },
            {
                q: "Does responsive design in Tailwind affect performance?",
                a: "No. Tailwind generates a single CSS file with all the responsive utilities. The browser only applies the classes that match the current viewport. Unused classes are purged at build time, so the output file is small regardless of how many responsive classes you use."
            }
        ]
    },

    "how-to-convert-html-to-jsx": {
        slug: "how-to-convert-html-to-jsx",
        title: "How to Convert HTML to JSX — Complete Developer Guide",
        metaDescription:
            "Learn every rule for converting HTML to valid JSX. Covers className, event handlers, self-closing tags, inline styles, boolean attributes, and common pitfalls.",
        metaKeywords: "html to jsx, convert html to jsx, html jsx conversion, jsx from html, html to react component",
        intro: "Converting HTML to JSX looks straightforward until you hit the subtle differences — class becomes className, onclick becomes onClick, and style takes an object instead of a string. This guide covers every transformation you need to turn raw HTML into valid JSX ready to paste into a React or Next.js component.",
        sections: [
            {
                heading: "class → className",
                body: "HTML uses `class` to assign CSS classes. In JSX, `class` is a reserved JavaScript keyword, so React uses `className` instead. Every `class=\"...\"` in your HTML becomes `className=\"...\"` in JSX. This is the most common conversion error and the one ESLint catches immediately."
            },
            {
                heading: "for → htmlFor",
                body: "Similarly, the HTML `for` attribute on `<label>` elements conflicts with JavaScript's `for` loop keyword. In JSX, use `htmlFor` instead. Example: `<label for=\"email\">` becomes `<label htmlFor=\"email\">`."
            },
            {
                heading: "Event Handlers",
                body: "HTML event attributes use lowercase strings: `onclick`, `onchange`, `onsubmit`. JSX uses camelCase and takes a function reference, not a string. `onclick=\"handleClick()\"` becomes `onClick={handleClick}`. Notice no quotes and no parentheses — you pass the function itself, not a call to it. If you need to pass arguments, use an arrow function: `onClick={() => handleClick(id)}`."
            },
            {
                heading: "Self-Closing Tags",
                body: "HTML allows void elements like `<br>`, `<img>`, and `<input>` to be left unclosed. JSX requires every element to be explicitly closed. Add a slash before the closing bracket: `<br>` → `<br />`, `<img src=\"...\">` → `<img src=\"...\" />`, `<input type=\"text\">` → `<input type=\"text\" />`."
            },
            {
                heading: "Inline Styles",
                body: "HTML inline styles are strings: `style=\"color: red; font-size: 16px\"`. JSX inline styles are JavaScript objects with camelCase property names: `style={{ color: 'red', fontSize: '16px' }}`. Note the double braces — the outer braces are JSX expression syntax, the inner braces are the object literal. Pixel values can omit the `px` unit: `fontSize: 16` works the same as `fontSize: '16px'`."
            },
            {
                heading: "Boolean Attributes",
                body: "In HTML, boolean attributes are written as bare words: `<input disabled>` or `<input disabled=\"disabled\">`. In JSX, pass the boolean value explicitly: `<input disabled={true} />` or simply `<input disabled />` (a bare attribute in JSX defaults to `true`). Avoid `disabled=\"true\"` — that passes a string, not a boolean, and may cause unexpected behavior."
            },
            {
                heading: "HTML Comments",
                body: "HTML comments (`<!-- comment -->`) are not valid inside JSX. To write a comment inside JSX markup, use a JavaScript expression with a block comment: `{/* this is a comment */}`. Regular `// line comments` work in the JavaScript parts of your component but not inside JSX markup."
            },
            {
                heading: "Single Root Element / Fragments",
                body: "JSX expressions must have a single root element. If your HTML snippet has multiple sibling elements at the top level, wrap them in a `<div>` or use a Fragment: `<>...</>` or `<React.Fragment>...</React.Fragment>`. Fragments don't add an extra DOM node, making them preferable when you don't need a wrapper element."
            }
        ],
        cta: { label: "Convert HTML to JSX →", toolRoute: "/html-jsx" },
        relatedSlugs: ["html-jsx", "html-vs-jsx", "common-html-to-jsx-errors", "jsx-syntax-explained"],
        faq: [
            {
                q: "What is the most common mistake when converting HTML to JSX?",
                a: "Forgetting to change `class` to `className`. It's the most frequent error and usually the first thing ESLint flags."
            },
            {
                q: "Do I need to change all HTML attributes in JSX?",
                a: "Most attributes stay the same. The main changes are: `class` → `className`, `for` → `htmlFor`, event handlers from lowercase strings to camelCase function references, and inline `style` from a string to an object."
            },
            {
                q: "Why does JSX use onClick instead of onclick?",
                a: "JSX is JavaScript syntax. JavaScript conventions use camelCase for identifiers. React chose camelCase event names to stay consistent with JavaScript naming conventions."
            },
            {
                q: "Can I use a tool to convert HTML to JSX automatically?",
                a: "Yes. DevDeck's HTML → JSX Converter handles all these transformations automatically — paste your HTML and get valid JSX back instantly."
            },
            {
                q: "Does the HTML → JSX converter handle nested elements?",
                a: "Yes. The converter recursively processes all child elements, applying every rule — className, event handlers, self-closing tags, style objects — at every nesting level."
            }
        ]
    },

    "html-vs-jsx": {
        slug: "html-vs-jsx",
        title: "HTML vs JSX — Key Differences Every React Developer Should Know",
        metaDescription:
            "HTML and JSX look similar but have important differences. Learn the exact rules that change when you move from HTML to JSX in React and Next.js.",
        metaKeywords: "html vs jsx, jsx vs html, difference html jsx, jsx syntax differences, html jsx react",
        intro: "JSX looks like HTML, but it's actually a JavaScript syntax extension. The two share the same tag names and most attribute names, but the differences matter when you're building React components. Understanding where they diverge prevents runtime errors and confusing ESLint warnings.",
        sections: [
            {
                heading: "What JSX Actually Is",
                body: "JSX is not HTML. It's a syntax extension to JavaScript — a way to write tree-like markup inside JavaScript code. Babel (or the Next.js compiler) transforms JSX into `React.createElement()` calls before it runs in the browser. The browser never sees JSX; it sees JavaScript. This is why JSX follows JavaScript rules in places where HTML is more permissive."
            },
            {
                heading: "Attribute Name Differences",
                list: [
                    "`class` → `className` (class is a reserved JS keyword)",
                    "`for` → `htmlFor` (for is a reserved JS keyword)",
                    "`tabindex` → `tabIndex` (camelCase DOM property name)",
                    "`readonly` → `readOnly`",
                    "`maxlength` → `maxLength`",
                    "`colspan` → `colSpan`",
                    "`rowspan` → `rowSpan`",
                    "`crossorigin` → `crossOrigin`",
                    "Custom `data-*` and `aria-*` attributes stay as-is — they're hyphenated in both HTML and JSX"
                ]
            },
            {
                heading: "Expression Syntax",
                body: "HTML is static markup — values must be string literals. JSX lets you embed any JavaScript expression using curly braces `{}`. This is one of the biggest practical differences: `<h1>{user.name}</h1>`, `<img src={avatarUrl} />`, `<button disabled={isLoading}>Submit</button>`. Curly braces tell JSX to evaluate the contents as JavaScript."
            },
            {
                heading: "Self-Closing Elements",
                body: "In HTML5, void elements like `<br>`, `<hr>`, `<img>`, `<input>`, `<link>`, and `<meta>` are self-closing by spec — you don't need a closing tag. JSX requires all elements to be explicitly closed. Non-void elements need a matching closing tag: `<div></div>`. Void elements need a self-closing slash: `<br />`."
            },
            {
                heading: "Inline Styles",
                body: "HTML style attributes are strings: `style=\"color: red; font-size: 16px\"`. JSX style attributes are JavaScript objects: `style={{ color: 'red', fontSize: '16px' }}`. All multi-word CSS property names become camelCase in JSX (`backgroundColor`, `borderRadius`, `fontWeight`). Values are strings or numbers — pixel values can be numbers without the `px` suffix."
            },
            {
                heading: "Event Handling",
                body: "HTML events are attributes with string values pointing to global function names: `onclick=\"doSomething()\"`. JSX events are camelCase props that accept function references: `onClick={doSomething}`. You never pass strings to event handlers in JSX. Inline handlers use arrow functions: `onClick={() => doSomething(id)}`. This lets React handle event delegation efficiently under the hood."
            },
            {
                heading: "Conditional Rendering",
                body: "HTML has no built-in conditional rendering — you either include an element or you don't. JSX can conditionally render using JavaScript: `{isLoggedIn && <Dashboard />}` or ternary expressions: `{isLoggedIn ? <Dashboard /> : <Login />}`. This is one of JSX's biggest advantages over plain HTML templates."
            },
            {
                heading: "Root Element Requirement",
                body: "In HTML, a document body can have multiple sibling elements with no wrapper. In JSX, a component's return value must be a single root element. Wrapping in `<div>` works but adds a DOM node. React Fragments (`<>...</>`) let you return multiple siblings without a wrapper DOM element."
            }
        ],
        cta: { label: "Convert HTML to JSX →", toolRoute: "/html-jsx" },
        relatedSlugs: ["html-jsx", "how-to-convert-html-to-jsx", "jsx-syntax-explained", "common-html-to-jsx-errors"],
        faq: [
            {
                q: "Is JSX a superset of HTML?",
                a: "No. JSX is a JavaScript syntax extension that resembles HTML. They share tag names and most attribute names, but JSX follows JavaScript rules in places where HTML is more permissive. JSX is compiled to JavaScript — HTML is not."
            },
            {
                q: "Can I use HTML directly inside a React component?",
                a: "Not directly. React components return JSX, not HTML. The JSX gets compiled to JavaScript before the browser renders it. The output is HTML in the DOM, but what you write in your component files is JSX."
            },
            {
                q: "Why does JSX use camelCase for event names?",
                a: "JSX is JavaScript, and JavaScript identifiers use camelCase by convention. React adopted camelCase event names to stay consistent with JavaScript naming rather than HTML's lowercase attribute style."
            },
            {
                q: "What happens if I write class instead of className in JSX?",
                a: "React will render the element and show a warning in the console. The class attribute will be ignored in most cases, meaning your CSS classes won't apply. ESLint with the React plugin will flag this as an error."
            }
        ]
    },

    "common-html-to-jsx-errors": {
        slug: "common-html-to-jsx-errors",
        title: "Common HTML-to-JSX Conversion Errors and How to Fix Them",
        metaDescription:
            "The most frequent errors when converting HTML to JSX — class vs className, unclosed tags, style strings, and more — with exact fixes for each.",
        metaKeywords: "html to jsx errors, jsx conversion errors, jsx class classname error, jsx self closing tag error, jsx inline style error",
        intro: "Pasting HTML into a React component almost always produces errors. The differences between HTML and JSX are small but strict — JSX is compiled JavaScript, not a browser-parsed markup language. Here are the most common errors you'll encounter and exactly how to fix them.",
        sections: [
            {
                heading: "Error: Unknown prop `class` on a DOM element",
                body: "`class` is a JavaScript reserved keyword. JSX uses `className` for CSS class assignments. Every `class=\"...\"` in your HTML must become `className=\"...\"` in JSX. This is the single most common HTML-to-JSX error. ESLint's React plugin flags it immediately with: `Invalid DOM property 'class'. Did you mean 'className'?`"
            },
            {
                heading: "Error: Adjacent JSX elements must be wrapped in an enclosing tag",
                body: "JSX returns must have a single root element. If your HTML has multiple siblings at the top level, wrapping them in a `<div>` works but adds an extra DOM node. Use a Fragment instead: wrap with `<>` and `</>`. Fragments render no DOM element. If you need to pass a key prop (in a list), use `<React.Fragment key={id}>` instead of the shorthand `<>`."
            },
            {
                heading: "Error: Self-closing tag for void element",
                body: "Void HTML elements (`<br>`, `<hr>`, `<img>`, `<input>`, `<link>`, `<meta>`) must be explicitly closed in JSX: `<br />`, `<img src=\"...\" />`, `<input type=\"text\" />`. Missing the closing slash causes a parser error. Non-void elements like `<div>` and `<span>` need a matching closing tag."
            },
            {
                heading: "Error: The `style` prop expects a mapping from style properties to values",
                body: "HTML inline styles are strings: `style=\"color: red\"`. JSX style props are JavaScript objects: `style={{ color: 'red' }}`. Passing a string to `style` in JSX throws: `The style prop expects a mapping from style properties to values, not a string`. Multi-word CSS properties use camelCase: `font-size` → `fontSize`, `background-color` → `backgroundColor`."
            },
            {
                heading: "Error: `for` is not a valid prop — use `htmlFor`",
                body: "`for` is a JavaScript reserved keyword (used in `for` loops). Label elements that associate with inputs use `htmlFor` in JSX: `<label htmlFor=\"email\">Email</label>`. Using `for` instead of `htmlFor` causes a warning and the label association won't work correctly."
            },
            {
                heading: "Error: Event handler passed as a string",
                body: "HTML uses string values for event handlers: `onclick=\"handleClick()\"`. JSX takes function references: `onClick={handleClick}`. Passing a string like `onClick=\"handleClick()\"` is silently ignored in modern React and fires a warning. Always pass a function reference or arrow function."
            },
            {
                heading: "Error: Unterminated JSX contents / unexpected token",
                body: "HTML comments (`<!-- ... -->`) are not valid JSX syntax. Inside JSX markup, use `{/* comment */}` for comments. An HTML comment left in JSX markup causes a parse error. Also watch for unescaped `<` and `>` characters in text content — if you need a literal `<` in JSX text, use the HTML entity `&lt;` or wrap it in a string expression: `{'<'}`."
            },
            {
                heading: "Warning: Each child in a list should have a unique key prop",
                body: "When rendering arrays of elements in JSX (typically with `.map()`), each element needs a unique `key` prop: `items.map(item => <li key={item.id}>{item.name}</li>)`. Keys help React efficiently update the DOM when the list changes. Avoid using array index as the key if items can be reordered or removed."
            }
        ],
        cta: { label: "Convert HTML to JSX Automatically →", toolRoute: "/html-jsx" },
        relatedSlugs: ["html-jsx", "how-to-convert-html-to-jsx", "html-vs-jsx", "jsx-syntax-explained"],
        faq: [
            {
                q: "Why does JSX require className instead of class?",
                a: "Because `class` is a reserved keyword in JavaScript. JSX is a JavaScript extension and must avoid reserved keywords in expressions. React chose `className` to match the DOM property name used in JavaScript."
            },
            {
                q: "What does 'Adjacent JSX elements must be wrapped' mean?",
                a: "JSX can only return one root element from a component or expression. If you have two sibling elements, wrap them in a Fragment (`<>...</>`) or a `<div>`. Fragments add no DOM node and are usually preferable."
            },
            {
                q: "Can I use a tool to automatically fix HTML-to-JSX errors?",
                a: "Yes. DevDeck's HTML → JSX Converter applies all transformations automatically — className, event handlers, self-closing tags, style objects, and more. Paste your HTML and get valid JSX instantly."
            },
            {
                q: "Are HTML-to-JSX errors caught at compile time or runtime?",
                a: "Most are caught at compile time by the JSX parser or by ESLint. Some, like passing a string to the style prop, produce runtime warnings in the browser console. Using ESLint with the eslint-plugin-react catches most issues before the code runs."
            }
        ]
    },

    "jsx-syntax-explained": {
        slug: "jsx-syntax-explained",
        title: "JSX Syntax Explained — A Practical Guide for Developers",
        metaDescription:
            "Understand JSX syntax from the ground up. Covers expressions, props, children, fragments, conditional rendering, lists, and how JSX compiles to JavaScript.",
        metaKeywords: "jsx syntax, jsx explained, jsx guide, jsx expressions, jsx props, jsx children, how jsx works",
        intro: "JSX is the syntax extension that lets you write markup inside JavaScript. It looks like HTML but compiles to JavaScript function calls. Understanding how JSX works — not just the rules, but why they exist — makes you a faster React developer.",
        sections: [
            {
                heading: "How JSX Compiles",
                body: "When Babel or the Next.js compiler sees JSX, it transforms it into `React.createElement()` calls. `<h1 className=\"title\">Hello</h1>` becomes `React.createElement('h1', { className: 'title' }, 'Hello')`. Modern React (17+) uses a new JSX transform that doesn't require importing React explicitly. Understanding this compilation explains why JSX follows JavaScript rules — it has to produce valid JavaScript."
            },
            {
                heading: "Embedding JavaScript Expressions",
                body: "Curly braces `{}` let you embed any JavaScript expression inside JSX. Variables, function calls, arithmetic, ternaries — anything that evaluates to a value. `<p>{user.name}</p>`, `<img src={getAvatarUrl(userId)} />`, `<span>{price * quantity}</span>`. Statements (if, for, while) are not expressions and can't go inside `{}` — use ternaries or move logic above the return."
            },
            {
                heading: "Props",
                body: "JSX props are passed like HTML attributes but follow JavaScript syntax. String literals use quotes: `<Button variant=\"primary\" />`. Expressions use curly braces: `<Button disabled={isLoading} count={items.length} />`. Boolean props default to true: `<Input required />` is the same as `<Input required={true} />`. You can spread an object as props: `<Component {...props} />`."
            },
            {
                heading: "Children",
                body: "Everything between an element's opening and closing tags is its children. Children can be strings, other JSX elements, or JavaScript expressions. `<Button>Click me</Button>` — string child. `<Card><Header /><Body /></Card>` — element children. `<ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>` — expression children. The children can also be passed explicitly as a prop: `<Component children={<span>text</span>} />`."
            },
            {
                heading: "Conditional Rendering",
                body: "Use short-circuit evaluation for show/hide: `{isLoggedIn && <Dashboard />}`. Use ternary for if/else: `{isLoggedIn ? <Dashboard /> : <Login />}`. For complex conditions, extract the logic above the return statement into a variable: `const content = isLoggedIn ? <Dashboard /> : <Login />`, then use `{content}` in JSX. Avoid deeply nested ternaries — they're hard to read and maintain."
            },
            {
                heading: "Rendering Lists",
                body: "Arrays of JSX elements can be rendered directly. Typically generated with `.map()`: `{items.map(item => <Item key={item.id} {...item} />)}`. Each element needs a unique `key` prop so React can track identity across re-renders. Keys should be stable, unique IDs from your data — not array indexes if the list can be reordered."
            },
            {
                heading: "Fragments",
                body: "Components must return a single root element. When you don't want an extra wrapper `<div>` in the DOM, use a Fragment: `<>...</>` or `<React.Fragment>...</React.Fragment>`. The shorthand `<>` doesn't accept props. If you need to pass a `key` prop (in a list), use `<React.Fragment key={id}>`. Fragments are especially useful inside table rows, where adding a `<div>` would produce invalid HTML."
            },
            {
                heading: "JSX Is Not HTML — Key Rules to Remember",
                list: [
                    "Use `className` not `class`",
                    "Use `htmlFor` not `for`",
                    "All tags must be closed — `<br />` not `<br>`",
                    "Style is an object — `{{ fontSize: 16 }}` not a string",
                    "Event handlers are camelCase functions — `onClick={fn}` not `onclick=\"fn()\"`",
                    "Comments inside JSX use `{/* */}` not `<!-- -->`",
                    "One root element per expression — wrap siblings in a Fragment"
                ]
            }
        ],
        cta: { label: "Convert HTML to JSX →", toolRoute: "/html-jsx" },
        relatedSlugs: ["html-jsx", "html-vs-jsx", "how-to-convert-html-to-jsx", "common-html-to-jsx-errors"],
        faq: [
            {
                q: "Do I need to import React to use JSX?",
                a: "Not with React 17+ and the new JSX transform. Older React projects required `import React from 'react'` in every file using JSX because JSX compiled to `React.createElement()` calls. The new transform handles this automatically."
            },
            {
                q: "Can I write JSX without a build step?",
                a: "Not recommended for production. Babel or the Next.js compiler is required to transform JSX to JavaScript. In very simple cases, you can use a CDN script for Babel to transpile JSX in the browser, but this is only suitable for demos."
            },
            {
                q: "Why can't I use if statements inside JSX?",
                a: "JSX expressions (inside `{}`) must be expressions that evaluate to a value. `if` statements are not expressions — they don't produce a value. Use ternary (`condition ? a : b`) or short-circuit (`condition && element`) for conditional logic inside JSX markup."
            },
            {
                q: "What is the difference between JSX and TSX?",
                a: "TSX is JSX with TypeScript. The rules are the same, but TSX files can include TypeScript type annotations on props and variables. React components in TypeScript projects use `.tsx` file extensions."
            },
            {
                q: "Is JSX specific to React?",
                a: "JSX originated with React but other libraries use it too — Preact, Solid.js, and others support JSX with their own compilers. The syntax is the same; the compilation target differs depending on the library."
            }
        ]
    },

    "base64-vs-binary-images": {
        slug: "base64-vs-binary-images",
        title: "Base64 vs Binary Images — Which Should You Use?",
        metaDescription:
            "Compare Base64-encoded images with external binary image files. Understand the size overhead, caching behavior, HTTP requests, and when each approach is the right choice.",
        metaKeywords: "base64 vs binary image, base64 image performance, base64 overhead, inline image vs external image, data uri vs image file",
        intro: "Should you embed an image as Base64 or serve it as a regular file? The answer depends on image size, how many pages use it, and your performance priorities. This guide covers the key differences so you can make the right call.",
        sections: [
            {
                heading: "The Core Trade-off",
                body: "Base64 encodes binary image bytes as ASCII text, increasing file size by ~33%. In exchange, the image is embedded directly in your HTML or CSS — no separate HTTP request. Whether that trade is worth it depends entirely on the image's size and how often it's reused across pages."
            },
            {
                heading: "File Size Comparison",
                list: [
                    "A 1KB PNG icon → ~1.37KB as Base64 (37% larger)",
                    "A 10KB JPG thumbnail → ~13.7KB as Base64",
                    "A 100KB photo → ~137KB as Base64",
                    "A 500KB hero image → ~685KB as Base64 — almost certainly the wrong choice"
                ]
            },
            {
                heading: "HTTP Requests",
                body: "Each external image file requires a separate HTTP request. HTTP/2 multiplexes requests over a single connection, making individual request overhead much smaller than it was under HTTP/1.1. The old rule of thumb — 'inline everything to save requests' — matters less on modern HTTP/2 servers. On HTTP/1.1 connections (still common in some environments) saving a request has more impact."
            },
            {
                heading: "Browser Caching",
                body: "External image files are cached by the browser and reused across page loads and across pages. A Base64-encoded image embedded in HTML or CSS cannot be cached independently — it's parsed fresh with every document load. For a logo that appears on every page, an external file cached once is far more efficient than a data URI repeated in every HTML response."
            },
            {
                heading: "When Base64 Wins",
                list: [
                    "Small icons under 2–3KB — the request overhead is significant relative to the file size",
                    "Images used on only one page and never cached independently anyway",
                    "Email templates — many email clients block external images; Base64 ensures reliable delivery",
                    "Single-file HTML deliverables with no external dependencies",
                    "Favicons or loading spinners that must appear before any external resources load"
                ]
            },
            {
                heading: "When Binary/External Wins",
                list: [
                    "Images larger than 5KB — the caching benefit outweighs the request cost",
                    "Images shared across multiple pages — cached once, reused everywhere",
                    "Images served from a CDN — CDNs apply compression and edge caching that data URIs can't match",
                    "Performance-critical pages — large data URIs block HTML parsing",
                    "Images that change independently from the page content — external files can be versioned and cache-busted separately"
                ]
            },
            {
                heading: "SVG Is a Special Case",
                body: "SVG is already a text format. You can embed SVG directly in HTML using the `<svg>` tag without Base64 encoding at all — and this is usually preferable to Base64-encoding it. Inline SVG can be styled with CSS, animated, and manipulated with JavaScript. If you Base64-encode an SVG, you lose all of that. Reserve Base64 for raster formats (PNG, JPG, WebP) or SVGs that must be embedded in a CSS `url()` value."
            },
            {
                heading: "Practical Recommendation",
                list: [
                    "Use external image files as the default",
                    "Consider Base64 only for icons under 2KB that appear on every page load",
                    "Always use external images for anything over 5KB",
                    "Use inline SVG (not Base64 SVG) for vector icons in HTML",
                    "For email templates, Base64 is often the right call for small images"
                ]
            }
        ],
        cta: { label: "Convert Images to Base64 →", toolRoute: "/base64-image" },
        relatedSlugs: ["base64-image-converter", "base64-data-urls-explained", "what-is-base64-encoding", "image-resizer"],
        faq: [
            {
                q: "Does Base64 make images load faster?",
                a: "Not usually. It saves one HTTP request but increases document size by 33% and prevents browser caching. For most images, external files served from a CDN load faster than Base64."
            },
            {
                q: "How much larger is a Base64 image compared to the original?",
                a: "Approximately 33% larger. Base64 represents every 3 bytes of binary data as 4 ASCII characters."
            },
            {
                q: "Can I use Base64 for large hero images?",
                a: "You shouldn't. A 500KB hero image becomes ~685KB as Base64, bloats your HTML, prevents caching, and slows initial page rendering. Use an external image file or a CDN-served format like WebP."
            },
            {
                q: "Is Base64 still useful with HTTP/2?",
                a: "Less so. HTTP/2 multiplexing makes individual request overhead much smaller. The main remaining use cases for Base64 images are email templates, very small icons, and single-file HTML documents."
            },
            {
                q: "Should I Base64-encode SVG images?",
                a: "Generally no. SVG is already text — embed it directly with an `<svg>` tag in HTML or use it as a regular `.svg` file. Inline SVG supports CSS styling and JavaScript interaction; Base64-encoded SVG loses those capabilities."
            }
        ]
    }
};

export default blogData;

// Ordered list for the blog index page
export const blogList = [
    blogData["what-is-a-rest-api"],
    blogData["http-methods-explained"],
    blogData["how-to-test-api-endpoints"],
    blogData["api-request-builder"],
    blogData["how-to-format-json"],
    blogData["how-to-validate-json"],
    blogData["json-syntax-guide"],
    blogData["common-json-errors"],
    blogData["json-vs-json5"],
    blogData["how-to-convert-css-to-tailwind"],
    blogData["css-to-tailwind-examples"],
    blogData["common-css-to-tailwind-patterns"],
    blogData["tailwind-responsive-design"],
    blogData["css-to-tailwind-converter"],
    blogData["json-viewer"],
    blogData["jwt-decoder"],
    blogData["what-is-base64-encoding"],
    blogData["how-to-decode-base64-image"],
    blogData["base64-data-urls-explained"],
    blogData["base64-vs-binary-images"],
    blogData["base64-text-encoder"],
    blogData["base64-image-converter"],
    blogData["hash-generator"],
    blogData["password-generator"],
    blogData["uuid-generator"],
    blogData["regex-tester"],
    blogData["timestamp-converter"],
    blogData["number-base-converter"],
    blogData["csv-to-json-converter"],
    blogData["yaml-to-json-converter"],
    blogData["text-diff-checker"],
    blogData["text-case-converter"],
    blogData["word-counter"],
    blogData["lorem-ipsum-generator"],
    blogData["qr-code-generator"],
    blogData["url-shortener"],
    blogData["url-parser"],
    blogData["image-resizer"],
    blogData["color-converter"],
    blogData["aspect-ratio-calculator"],
    blogData["smart-formatter"],
    blogData["html-vs-jsx"],
    blogData["how-to-convert-html-to-jsx"],
    blogData["common-html-to-jsx-errors"],
    blogData["jsx-syntax-explained"],
    blogData["html-jsx"],
    blogData["encoder-decoder"],
    blogData["command-playground"],
    blogData["cron-expression-builder"]
];
