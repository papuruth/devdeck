import { NextResponse } from "next/server";

export const runtime = "edge";

type ProxyRequest = {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: string;
};

export async function POST(request: Request) {
    try {
        const body: ProxyRequest = await request.json();

        const { method, url, headers = {}, body: requestBody } = body;

        if (!method || !url) {
            return NextResponse.json({ error: "Missing method or url" }, { status: 400 });
        }

        // Validate URL
        if (!URL.canParse(url)) {
            return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
        }

        // Prepare fetch options
        const fetchOptions: RequestInit = {
            method: method.toUpperCase()
        };

        // Set headers, excluding host to avoid conflicts
        const filteredHeaders = { ...headers };
        delete filteredHeaders.host;
        delete filteredHeaders.Host; // Also check for capitalized version

        if (Object.keys(filteredHeaders).length > 0) {
            fetchOptions.headers = filteredHeaders;
        }

        // Add body for non-GET requests
        if (requestBody && method.toUpperCase() !== "GET") {
            fetchOptions.body = requestBody;
        }

        // Make the request
        const response = await fetch(url, fetchOptions);

        // Get response data
        const responseHeaders: Record<string, string> = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });

        // Get response body as text
        const responseBody = await response.text();

        // Return the proxied response
        return NextResponse.json({
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
            body: responseBody
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
