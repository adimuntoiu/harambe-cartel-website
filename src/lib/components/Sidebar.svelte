<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { slide, fly, fade } from "svelte/transition";
    import { language } from "$lib/stores/settings.js";

    export let isOpen = false;
    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }

    type Language = "ro" | "en";
    const navLabels: Record<Language, any> = {
        ro: {
            home: "ACASĂ",
            about: "DESPRE NOI",
            sponsors: "SPONSORI",
            members: "MEMBRI",
            events: "EVENIMENTE",
            results: "REZULTATE",
            gallery: "GALERIE",
            map: "HARTĂ",
        },
        en: {
            home: "HOME",
            about: "ABOUT US",
            sponsors: "SPONSORS",
            members: "MEMBERS",
            events: "EVENTS",
            results: "RESULTS",
            gallery: "GALLERY",
            map: "MAP",
        },
    };
</script>

{#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="backdrop"
        on:click={close}
        role="button"
        tabindex="0"
        transition:fade={{ duration: 300 }}
    ></div>
    <div
        class="sidebar"
        transition:fly={{ x: -250, duration: 300, opacity: 1 }}
    >
        <button class="close-btn" on:click={close}>&times;</button>
        <nav class="nav-links">
            <a href="/#home" on:click={close}
                >{navLabels[$language as Language].home}</a
            >
            <a href="/#about" on:click={close}
                >{navLabels[$language as Language].about}</a
            >
            <a href="/#sponsors" on:click={close}
                >{navLabels[$language as Language].sponsors}</a
            >
            <a href="/#members" on:click={close}
                >{navLabels[$language as Language].members}</a
            >
            <a href="/#events" on:click={close}
                >{navLabels[$language as Language].events}</a
            >
            <a href="/#results" on:click={close}
                >{navLabels[$language as Language].results}</a
            >
            <a href="/#gallery" on:click={close}
                >{navLabels[$language as Language].gallery}</a
            >
            <a href="/map" on:click={close}
                >{navLabels[$language as Language].map}</a
            >
        </nav>
        <div class="footer">
            made by <a href="https://github.com/adimuntoiu" target="_blank"
                ><span style="font-family: 'Arial', sans-serif;">@</span
                >adimuntoiu</a
            > on github
        </div>
    </div>
{/if}

<style>
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        backdrop-filter: blur(2px);
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        height: 100%;
        background: rgba(0, 0, 0, 0.4); /* Further reduced opacity */
        backdrop-filter: blur(15px); /* Increased blur */
        z-index: 9999;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
        border-right: 1px solid rgba(65, 220, 204, 0.3);
    }

    .close-btn {
        align-self: flex-end;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        margin-bottom: 2rem;
        transition: transform 0.2s;
    }

    .close-btn:hover {
        color: #41dccc;
        transform: scale(1.1);
    }

    .nav-links {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .nav-links a {
        font-family: "Pirulen", sans-serif;
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        transition:
            color 0.2s,
            text-shadow 0.2s;
    }

    .nav-links a:hover {
        color: #41dccc;
        text-shadow: 0 0 10px rgba(65, 220, 204, 0.5);
    }

    .footer {
        margin-top: auto; /* Push to bottom */
        font-family: "Coco Gothic", sans-serif;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.5);
        text-align: center;
        width: 100%;
        padding-top: 1rem;
    }

    .footer a {
        color: #41dccc;
        text-decoration: none;
    }
</style>
