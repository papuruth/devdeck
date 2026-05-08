import NProgress from "nprogress";

const apiInProgress: string[] = [];

class TopLoader {
    hideLoaderTimeout: NodeJS.Timeout | null = null;

    constructor() {
        NProgress.configure({ trickleSpeed: 150 });
    }

    show(showTopLoader: boolean, apiId: string): void {
        const noApiInProgress = !apiInProgress.length;
        if (showTopLoader) {
            apiInProgress.push(apiId);
            if (this.hideLoaderTimeout) {
                clearTimeout(this.hideLoaderTimeout);
            }
        }

        if (showTopLoader && noApiInProgress) {
            document.documentElement.classList.remove("nprogress-done");
            NProgress.start();
        }
    }

    hide(showTopLoader: boolean, apiId: string): void {
        const apiInProgressIndex = apiInProgress.findIndex((current: string) => current === apiId);

        if (apiInProgressIndex > -1) {
            apiInProgress.splice(apiInProgressIndex, 1);
        }

        const noApiInProgress = !apiInProgress.length;
        if (showTopLoader && noApiInProgress) {
            this.hideLoaderTimeout = setTimeout(() => {
                document.documentElement.classList.add("nprogress-done");
                NProgress.done();
            }, 250);
        }
    }
}

export default new TopLoader();
