import { writable } from "svelte/store";
import { browser } from "$app/environment";

const DEFAULT_TEXT_SIZE = 1;
const DEFAULT_ZOOM = 1;
const DEFAULT_LANGUAGE = "ro";

export type Language = "ro" | "en";
export const textSize = writable(DEFAULT_TEXT_SIZE);
export const zoom = writable(DEFAULT_ZOOM);
export const language = writable<Language>(DEFAULT_LANGUAGE as Language);

if (browser) {
  textSize.subscribe((value) => {
    localStorage.setItem("textSize", value.toString());
    document.documentElement.style.setProperty(
      "--text-scale",
      value.toString(),
    );
  });

  zoom.subscribe((value) => {
    localStorage.setItem("zoom", value.toString());
    document.body.style.zoom = value.toString();
  });

  language.subscribe((value) => {
    localStorage.setItem("language", value);
  });
}

export function loadSettingsFromStorage() {
  if (!browser) return;

  const storedTextSize = localStorage.getItem("textSize");
  const storedZoom = localStorage.getItem("zoom");
  const storedLanguage = localStorage.getItem("language");

  if (storedTextSize) textSize.set(parseFloat(storedTextSize));
  if (storedZoom) zoom.set(parseFloat(storedZoom));
  if (storedLanguage) language.set(storedLanguage as Language);
}
