import { NextResponse } from "next/server";

export const runtime = "edge";

type ShortenRequest = { url: string };

export async function POST(request: Request) {
    const apiKey = process.env.SHORT_URL_API_PK;
    const domain = process.env.SHORT_URL_DOMAIN;

    if (!apiKey || !domain) {
        return NextResponse.json({ error: "Server misconfigured: missing SHORT_URL_API_PK or SHORT_URL_DOMAIN" }, { status: 500 });
    }

    let body: ShortenRequest;
    try {
        body = (await request.json()) as ShortenRequest;
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { url } = body ?? {};
    if (!url || typeof url !== "string") {
        return NextResponse.json({ error: "Missing 'url' string in body" }, { status: 400 });
    }

    if (!URL.canParse(url)) {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    try {
        const res = await fetch("https://api.short.io/links/public", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: apiKey
            },
            body: JSON.stringify({ originalURL: url, domain })
        });

        const data = await res.json();
        if (!res.ok) {
            return NextResponse.json({ error: data?.error ?? "Failed to shorten URL" }, { status: res.status });
        }
        return NextResponse.json({ shortURL: data.shortURL, originalURL: data.originalURL });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
