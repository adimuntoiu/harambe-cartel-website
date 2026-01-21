<script lang="ts">
    import {
        textSize,
        zoom,
        language,
        type Language,
    } from "$lib/stores/settings.js";
    import { slide } from "svelte/transition";

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function updateTextSize(delta: number) {
        textSize.update((n: number) => {
            const newVal = Math.max(0.5, Math.min(2, n + delta));
            return parseFloat(newVal.toFixed(1));
        });
    }

    function updateZoom(delta: number) {
        zoom.update((n: number) => {
            const newVal = Math.max(0.5, Math.min(2, n + delta));
            return parseFloat(newVal.toFixed(1));
        });
    }

    function toggleLanguage() {
        language.update((l: Language) => (l === "ro" ? "en" : "ro"));
    }

    const labels: Record<Language, any> = {
        ro: {
            textSize: "Mărime Text",
            zoom: "Zoom",
            language: "Limbă",
        },
        en: {
            textSize: "Text Size",
            zoom: "Zoom",
            language: "Language",
        },
    };
</script>

<div class="settings-container">
    <button class="settings-btn" on:click={toggleMenu}>
        <img src="/assets/settings.png" alt="Settings" />
    </button>

    {#if isOpen}
        <div class="settings-menu" transition:slide={{ duration: 200 }}>
            <div class="setting-item">
                <span class="label"
                    >{labels[$language as Language].textSize}</span
                >
                <div class="controls">
                    <button
                        class="control-btn"
                        on:click={() => updateTextSize(-0.1)}>-</button
                    >
                    <span class="value">{$textSize}x</span>
                    <button
                        class="control-btn"
                        on:click={() => updateTextSize(0.1)}>+</button
                    >
                </div>
            </div>

            <div class="setting-item">
                <span class="label">{labels[$language as Language].zoom}</span>
                <div class="controls">
                    <button
                        class="control-btn"
                        on:click={() => updateZoom(-0.1)}>-</button
                    >
                    <span class="value">{$zoom}x</span>
                    <button class="control-btn" on:click={() => updateZoom(0.1)}
                        >+</button
                    >
                </div>
            </div>

            <div class="setting-item">
                <span class="label"
                    >{labels[$language as Language].language}</span
                >
                <button class="lang-btn" on:click={toggleLanguage}>
                    {$language.toUpperCase()}
                </button>
            </div>

            <div class="settings-footer">
                made by <a href="https://github.com/adimuntoiu" target="_blank"
                    ><span style="font-family: 'Arial', sans-serif;">@</span
                    >adimuntoiu</a
                > on github
            </div>
        </div>
    {/if}
</div>

<style>
    .settings-container {
        position: absolute;
        top: 2rem;
        right: 2rem;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .settings-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: transform 0.3s ease;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.4); /* Slightly lighter */
        border-radius: 50%;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(65, 220, 204, 0.3); /* Subtle border */
    }

    .settings-btn:hover {
        transform: rotate(90deg);
        background: rgba(65, 220, 204, 0.2);
        box-shadow: 0 0 10px rgba(65, 220, 204, 0.3); /* Glow */
    }

    .settings-btn img {
        width: 1.5rem;
        height: 1.5rem;
        /* filter: invert(1); Removed as new icon is likely white */
    }

    .settings-menu {
        margin-top: 1rem;
        background: rgba(0, 0, 0, 0.6); /* Lighter glass */
        backdrop-filter: blur(15px);
        border: 1px solid #41dccc;
        border-radius: 1rem;
        padding: 1.5rem;
        min-width: 250px;
        color: white;
        font-family: "Coco Gothic", sans-serif;
        box-shadow: 0 0 20px rgba(65, 220, 204, 0.2); /* Cyan glow */
    }

    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        gap: 1rem;
    }

    .setting-item:last-child {
        margin-bottom: 0;
    }

    .label {
        font-family: "Pirulen", sans-serif; /* Update to brand font */
        font-size: 0.8rem;
        color: #41dccc; /* Cyan brand color */
        text-transform: uppercase;
    }

    .controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(0, 0, 0, 0.3); /* Darker track */
        border-radius: 0.5rem;
        padding: 0.2rem 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .control-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        font-family: "Arial", sans-serif; /* Safe font for symbols */
    }

    .control-btn:hover {
        color: #41dccc;
        transform: scale(1.1);
    }

    .value {
        font-family: "Pirulen", sans-serif;
        font-size: 0.9rem;
        min-width: 3rem;
        text-align: center;
        color: white;
    }

    .lang-btn {
        background: transparent;
        border: 1px solid #41dccc;
        color: white;
        padding: 0.4rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-family: "Pirulen", sans-serif;
        font-size: 0.9rem;
        transition: all 0.3s;
        box-shadow: 0 0 5px rgba(65, 220, 204, 0.2);
    }

    .lang-btn:hover {
        background: rgba(65, 220, 204, 0.2);
        color: #41dccc;
        box-shadow: 0 0 15px rgba(65, 220, 204, 0.4);
    }

    .settings-footer {
        margin-top: 1.5rem;
        font-family: "Coco Gothic", sans-serif;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        width: 100%;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 0.5rem;
    }

    .settings-footer a {
        color: #41dccc;
        text-decoration: none;
    }
</style>
