<script lang="ts">
    import { language, type Language } from "$lib/stores/settings.js";
    export let activeSection = "";

    const labels: Record<Language, any> = {
        ro: {
            home: "ACASĂ",
            about: "DESPRE NOI",
            sponsors: "SPONSORI",
            results: "REZULTATE",
            events: "EVENIMENTE",
            map: "HARTĂ",
            gallery: "GALERIE",
            members: "MEMBRI",
        },
        en: {
            home: "HOME",
            about: "ABOUT US",
            sponsors: "SPONSORS",
            results: "RESULTS",
            events: "EVENTS",
            map: "MAP",
            gallery: "GALLERY",
            members: "MEMBERS",
        },
    };
</script>

<div class="nav-area">
    <nav class="nav-buttons local-nav">
        <a href="/#home" class="btn" class:selected={activeSection === "home"}
            >{labels[$language as Language].home}</a
        >
        <a href="/#about" class="btn" class:selected={activeSection === "about"}
            >{labels[$language as Language].about}</a
        >
        <a
            href="/#sponsors"
            class="btn"
            class:selected={activeSection === "sponsors"}
            >{labels[$language as Language].sponsors}</a
        >
        <a
            href="/#results"
            class="btn"
            class:selected={activeSection === "results"}
            >{labels[$language as Language].results}</a
        >
        <a
            href="/#events"
            class="btn"
            class:selected={activeSection === "events"}
            >{labels[$language as Language].events}</a
        >
        <a href="/map" class="btn {activeSection === 'map' ? 'selected' : ''}"
            >{labels[$language as Language].map}</a
        >
        <a
            href="/#gallery"
            class="btn"
            class:selected={activeSection === "gallery"}
            >{labels[$language as Language].gallery}</a
        >
        <a
            href="/#members"
            class="btn"
            class:selected={activeSection === "members"}
            >{labels[$language as Language].members}</a
        >
    </nav>
</div>

<style>
    .nav-area {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        align-items: flex-start;
    }

    .local-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        direction: ltr;
        justify-content: flex-start;
    }

    .btn {
        font-family: "Pirulen", sans-serif;
        color: #41dccc;
        text-decoration: none;
        font-size: 1rem;
        border: 1px solid #41dccc;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }

    .btn:hover,
    .btn.selected {
        background: rgba(65, 220, 204, 0.2);
        box-shadow: 0 0 10px rgba(65, 220, 204, 0.4);
    }

    @media (max-width: 768px) {
        .nav-area {
            align-items: center;
            text-align: center;
        }

        .local-nav {
            justify-content: center;
        }
    }
</style>
