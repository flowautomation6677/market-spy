export const GTA_CONVERSION_ID = 'AW-11403461866/sWcRCMmYsvYYEOqJzL0q';

// Helper to safely access global object
const getGlobal = () => {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof window !== 'undefined') return window;
    return undefined;
};

/**
 * Pushes a custom event to the DataLayer.
 * Safe to call even if GTM is not loaded yet (window.dataLayer will be initialized).
 */
export const pushDataLayer = (eventName: string, data: Record<string, any> = {}) => {
    const glob = getGlobal();
    if (glob) {
        const dataLayer = (glob as any).dataLayer || [];
        dataLayer.push({
            event: eventName,
            ...data
        });
        (glob as any).dataLayer = dataLayer;

        // Dev log
        console.log(`[GTM] Event: ${eventName}`, data);
    }
};

/**
 * Reports a conversion to Google Ads (via GTM) and then navigates to the URL.
 * Now it triggers a 'conversion_click' event which GTM listens to.
 */
export const reportConversion = (url: string) => {
    // Check if url is valid
    if (!url) return false;

    // Define navigation callback
    const navigate = () => {
        const glob = getGlobal();
        if (glob) {
            (glob as any).location.href = url;
        }
    };

    // Push event to DataLayer
    pushDataLayer('conversion_click', {
        destination_url: url,
        event_callback: navigate,
        event_timeout: 2000 // Fallback if GTM takes too long
    });

    // Fallback safety: if GTM doesn't trigger the callback within 500ms, go anyway
    setTimeout(() => {
        navigate();
    }, 500);

    return true; // Changed to match typical success pattern, though previously false
};
