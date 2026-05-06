import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "nprogress/nprogress.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(<App />, rootElement);
} else {
    ReactDOM.render(<App />, rootElement);
}

// Skip service worker during react-snap pre-rendering
if (navigator.userAgent !== "ReactSnap") {
    serviceWorkerRegistration.register();
}
