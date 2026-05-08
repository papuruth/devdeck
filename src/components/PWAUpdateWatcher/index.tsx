"use client";

import { useEffect, useState } from "react";
import UpdateBanner from "components/Shared/UpdateBanner";

export default function PWAUpdateWatcher() {
    const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
            return () => {};
        }

        navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
            // Registration failure is non-fatal; app still works without SW
        });

        navigator.serviceWorker.ready.then((reg) => {
            if (reg.waiting) {
                setWaitingSW(reg.waiting);
            }

            reg.addEventListener("updatefound", () => {
                const newSW = reg.installing;
                if (!newSW) return;
                newSW.addEventListener("statechange", () => {
                    if (newSW.state === "installed" && navigator.serviceWorker.controller) {
                        setWaitingSW(newSW);
                    }
                });
            });
        });

        // Add this inside the useEffect
        const checkInterval = setInterval(() => {
            navigator.serviceWorker.ready.then((reg) => {
                reg.update(); // Manually check for updates
            });
        }, 60000); // Check every 60 seconds

        return () => {
            clearInterval(checkInterval);
        };
    }, []);

    if (!waitingSW) return null;

    const handleUpdate = () => {
        waitingSW.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
    };

    return <UpdateBanner onUpdate={handleUpdate} />;
}
