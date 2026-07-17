const UMAMI_SRC = "https://cloud.umami.is/script.js";

export function initAnalytics() {
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;

    // No ID in local dev, so visits while developing never reach the dashboard.
    if (!websiteId) return;
    if (document.querySelector(`script[src="${UMAMI_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = UMAMI_SRC;
    script.defer = true;
    script.dataset.websiteId = websiteId;
    document.head.appendChild(script);
}
