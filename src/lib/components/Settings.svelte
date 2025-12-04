<script>
    import { textSize, zoom, language } from "../stores/settings";
    import { slide } from "svelte/transition";
    import settingsIcon from "../../assets/settings.png";

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function updateTextSize(delta) {
        textSize.update((n) => {
            const newVal = Math.max(0.5, Math.min(2, n + delta));
            return parseFloat(newVal.toFixed(1));
        });
    }

    function updateZoom(delta) {
        zoom.update((n) => {
            const newVal = Math.max(0.5, Math.min(2, n + delta));
            return parseFloat(newVal.toFixed(1));
        });
    }

    function toggleLanguage() {
        language.update((l) => (l === "ro" ? "en" : "ro"));
    }
</script>

<div class="settings-container">
    <button class="settings-btn" on:click={toggleMenu}>
        <img src={settingsIcon} alt="Settings" />
    </button>

    {#if isOpen}
        <div class="settings-menu" transition:slide={{ duration: 200 }}>
            <div class="setting-item">
                <span class="label">Text Size</span>
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
                <span class="label">Zoom</span>
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
                <span class="label">Language</span>
                <button class="lang-btn" on:click={toggleLanguage}>
                    {$language.toUpperCase()}
                </button>
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
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        backdrop-filter: blur(5px);
    }

    .settings-btn:hover {
        transform: rotate(90deg);
        background: rgba(65, 220, 204, 0.2);
    }

    .settings-btn img {
        width: 1.5rem;
        height: 1.5rem;
        filter: invert(
            1
        ); /* Make white if icon is black, or adjust based on icon */
    }

    .settings-menu {
        margin-top: 1rem;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid #41dccc;
        border-radius: 1rem;
        padding: 1rem;
        min-width: 200px;
        color: white;
        font-family: "Coco Gothic", sans-serif;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        gap: 1rem;
    }

    .setting-item:last-child {
        margin-bottom: 0;
    }

    .label {
        font-size: 0.9rem;
        color: #ccc;
    }

    .controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.5rem;
        padding: 0.2rem;
    }

    .control-btn {
        background: none;
        border: none;
        color: #41dccc;
        font-size: 1.2rem;
        cursor: pointer;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s;
    }

    .control-btn:hover {
        color: white;
    }

    .value {
        font-family: "Pirulen", sans-serif;
        font-size: 0.8rem;
        min-width: 2.5rem;
        text-align: center;
    }

    .lang-btn {
        background: rgba(65, 220, 204, 0.2);
        border: 1px solid #41dccc;
        color: #41dccc;
        padding: 0.3rem 0.8rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-family: "Pirulen", sans-serif;
        font-size: 0.8rem;
        transition: all 0.3s;
    }

    .lang-btn:hover {
        background: #41dccc;
        color: black;
    }
</style>
