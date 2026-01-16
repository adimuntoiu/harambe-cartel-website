<script lang="ts">
    import { onMount } from "svelte";
    import { language, type Language } from "$lib/stores/settings.js";
    import { fade, scale } from "svelte/transition";

    let show = false;

    onMount(() => {
        const hasSelected = localStorage.getItem("languageSelected");
        if (!hasSelected) {
            show = true;
        }
    });

    function selectLanguage(lang: Language) {
        language.set(lang);
        localStorage.setItem("languageSelected", "true");
        show = false;
    }
</script>

{#if show}
    <div class="language-overlay" transition:fade={{ duration: 300 }}>
        <div
            class="selection-card"
            transition:scale={{ duration: 400, start: 0.9 }}
        >
            <h1 class="welcome-title">CHOOSE YOUR LANGUAGE</h1>
            <h2 class="welcome-subtitle">ALEGE LIMBA</h2>

            <div class="options">
                <button
                    class="lang-option"
                    on:click={() => selectLanguage("ro")}
                >
                    <span class="main-text">ROMÂNĂ</span>
                    <span class="sub-text">RO</span>
                </button>

                <button
                    class="lang-option"
                    on:click={() => selectLanguage("en")}
                >
                    <span class="main-text">ENGLISH</span>
                    <span class="sub-text">EN</span>
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    .language-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .selection-card {
        background: rgba(20, 20, 20, 0.8);
        border: 2px solid #41dccc;
        border-radius: 2rem;
        padding: 3rem;
        text-align: center;
        box-shadow: 0 0 50px rgba(65, 220, 204, 0.3);
        max-width: 90%;
        width: 500px;
    }

    .welcome-title {
        font-family: "Pirulen", sans-serif;
        color: #41dccc;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .welcome-subtitle {
        font-family: "Pirulen", sans-serif;
        color: #636363;
        font-size: 1rem;
        margin-bottom: 2.5rem;
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .lang-option {
        background: transparent;
        border: 1px solid rgba(65, 220, 204, 0.5);
        color: white;
        padding: 1.5rem;
        border-radius: 1rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .lang-option:hover {
        background: rgba(65, 220, 204, 0.1);
        border-color: #41dccc;
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(65, 220, 204, 0.2);
    }

    .main-text {
        font-family: "Pirulen", sans-serif;
        font-size: 1.2rem;
    }

    .sub-text {
        font-family: "ABeeZee", sans-serif;
        color: #41dccc;
        font-size: 1rem;
        opacity: 0.7;
    }
</style>
