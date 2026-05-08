"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

function ProgressInner(): null {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.done();
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement).closest("a");
            if (!a) return;
            const href = a.getAttribute("href");
            if (href && href.startsWith("/") && !a.hasAttribute("download") && a.getAttribute("target") !== "_blank") {
                NProgress.start();
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return null;
}

export default function NavigationProgress() {
    return (
        <Suspense>
            <ProgressInner />
        </Suspense>
    );
}
