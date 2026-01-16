import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Default values
const DEFAULT_TEXT_SIZE = 1;
const DEFAULT_ZOOM = 1;
const DEFAULT_LANGUAGE = 'ro';

// Create stores
export type Language = 'ro' | 'en';
export const textSize = writable(DEFAULT_TEXT_SIZE);
export const zoom = writable(DEFAULT_ZOOM);
export const language = writable<Language>(DEFAULT_LANGUAGE as Language);

// Persistence and Application Logic
if (browser) {
    // Load from localStorage
    const storedTextSize = localStorage.getItem('textSize');
    const storedZoom = localStorage.getItem('zoom');
    const storedLanguage = localStorage.getItem('language');

    if (storedTextSize) textSize.set(parseFloat(storedTextSize));
    if (storedZoom) zoom.set(parseFloat(storedZoom));
    if (storedLanguage) language.set(storedLanguage as Language);

    // Subscribe to changes to save and apply
    textSize.subscribe(value => {
        localStorage.setItem('textSize', value.toString());
        document.documentElement.style.setProperty('--text-scale', value.toString());
    });

    zoom.subscribe(value => {
        localStorage.setItem('zoom', value.toString());
        // Apply zoom to body or a wrapper. Zoom property is non-standard but widely supported.
        // Alternatively use transform scale on a root container.
        // For simplicity and "browser zoom" feel, CSS zoom is often used, though 'transform: scale()' is more standard.
        // Let's try CSS zoom first as it reflows layout better than transform.
        document.body.style.zoom = value.toString();
    });

    language.subscribe(value => {
        localStorage.setItem('language', value);
        // Language logic would go here (e.g. switching text content)
        // For now, we just store the preference.
    });
}
