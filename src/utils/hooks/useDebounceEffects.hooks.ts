import { noop } from "lodash";
import { useEffect, type DependencyList } from "react";

export function useDebounceEffect(fn: (...args: unknown[]) => void = noop, waitTime = 0, deps: DependencyList = []) {
    useEffect(() => {
        const t = setTimeout(() => {
            fn(...(deps as unknown[]));
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
    }, [fn, waitTime, deps]);
}
