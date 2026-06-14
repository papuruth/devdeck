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
    }
};

export default blogData;

// Ordered list for the blog index page
export const blogList = [
    blogData["api-request-builder"],
    blogData["css-to-tailwind-converter"],
    blogData["json-viewer"],
    blogData["jwt-decoder"],
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
    blogData["html-jsx"],
    blogData["encoder-decoder"],
    blogData["command-playground"],
    blogData["cron-expression-builder"]
];
