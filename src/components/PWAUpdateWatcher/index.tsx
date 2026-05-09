"use client";

import { useEffect, useState } from "react";
import UpdateBanner from "components/Shared/UpdateBanner";

export default function PWAUpdateWatcher() {
    const [waitingSW, setWaitingSW] = useState<ServiceWorker | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
            return () => {};
        }

        const trackInstalling = (worker: ServiceWorker | null) => {
            if (!worker) return;
            worker.addEventListener("statechange", () => {
                if (worker.state === "installed" && navigator.serviceWorker.controller) {
                    setWaitingSW(worker);
                }
            });
        };

        navigator.serviceWorker
            .register("/sw.js", { scope: "/" })
            .then((reg) => {
                if (reg.waiting) {
                    setWaitingSW(reg.waiting);
                }

                if (reg.installing) {
                    trackInstalling(reg.installing);
                }

                reg.addEventListener("updatefound", () => {
                    trackInstalling(reg.installing);
                });

                reg.update();
            })
            .catch(() => {
                // Registration failure is non-fatal; app still works without SW
            });

        const checkInterval = setInterval(() => {
            navigator.serviceWorker.getRegistration("/sw.js").then((reg) => {
                reg?.update();
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
