<script>
    import { slide } from "svelte/transition";
    import settingsIcon from "../../assets/settings.png";

    export let scale = 1;

    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
    }

    function updateScale(delta) {
        const newVal = Math.max(0.5, Math.min(2, scale + delta));
        scale = parseFloat(newVal.toFixed(1));
    }
</script>

<div class="settings-container">
    <button class="settings-btn" on:click={toggleMenu}>
        <img src={settingsIcon} alt="Settings" />
    </button>

    {#if isOpen}
        <div class="settings-menu" transition:slide={{ duration: 200 }}>
            <div class="setting-item">
                <span class="label">Size</span>
                <div class="controls">
                    <button
                        class="control-btn"
                        on:click={() => updateScale(-0.1)}>-</button
                    >
                    <span class="value">{scale}x</span>
                    <button
                        class="control-btn"
                        on:click={() => updateScale(0.1)}>+</button
                    >
                </div>
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
        pointer-events: auto; /* Enable clicks */
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
        min-width: 200px;
        color: white;
        font-family: "Coco Gothic", sans-serif;
        box-shadow: 0 0 20px rgba(65, 220, 204, 0.2); /* Cyan glow */
    }

    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0;
        gap: 1rem;
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
</style>
