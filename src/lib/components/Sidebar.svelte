<script>
    import { createEventDispatcher } from "svelte";
    import { slide, fly } from "svelte/transition";

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
        transition:fly={{ x: -100, duration: 300, opacity: 0 }}
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
            <a href="/#map" class="map-link" on:click={close}>MAP</a>
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
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(10px);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 5px 0 15px rgba(0, 0, 0, 0.5);
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
        transition: color 0.2s;
    }

    .nav-links a:hover {
        color: #41dccc;
    }

    .map-link {
        margin-top: 1rem;
        color: #41dccc !important;
        border: 1px solid #41dccc;
        padding: 0.5rem;
        text-align: center;
        border-radius: 0.5rem;
    }

    .map-link:hover {
        background: #41dccc;
        color: black !important;
    }
</style>
