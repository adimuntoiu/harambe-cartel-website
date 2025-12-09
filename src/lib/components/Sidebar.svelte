<script>
    import { createEventDispatcher } from "svelte";
    import { slide, fly, fade } from "svelte/transition";

    export let isOpen = false;
    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }
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
            <a href="/#home" on:click={close}>HOME</a>
            <a href="/#about" on:click={close}>ABOUT US</a>
            <a href="/#sponsors" on:click={close}>SPONSORS</a>
            <a href="/#members" on:click={close}>MEMBERS</a>
            <a href="/#events" on:click={close}>EVENTS</a>
            <a href="/#results" on:click={close}>RESULTS</a>
            <a href="/#gallery" on:click={close}>GALLERY</a>
            <a href="/map" class="map-link" on:click={close}>MAP</a>
        </nav>
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

    .map-link {
        margin-top: 1rem;
        color: #41dccc !important;
        background: rgba(65, 220, 204, 0.2); /* Made out of opacity */
        border: 1px solid rgba(65, 220, 204, 0.5);
        padding: 0.5rem;
        text-align: center;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
    }

    .map-link:hover {
        background: rgba(65, 220, 204, 0.4);
        border-color: #41dccc;
        color: white !important;
        box-shadow: 0 0 15px rgba(65, 220, 204, 0.4);
    }
</style>
