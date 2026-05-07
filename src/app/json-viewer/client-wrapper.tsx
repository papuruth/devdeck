"use client";

import dynamic from "next/dynamic";

const OperationsClient = dynamic(() => import("./client"), { ssr: false });

export default function ClientWrapper() {
    return <OperationsClient />;
}
