<script lang="ts">
    import { onMount } from "svelte";
    import { language, type Language } from "$lib/stores/settings.js";

    let isMobile = false;
    let isExpanded = false;

    const fullText_ro =
        "În acest sezon, echipa noastră este alcătuită din 15 membri și 20 de voluntari. Împreună, învățăm, construim și creștem, străduindu-ne să avem un impact pozitiv în comunitatea noastră și nu numai. Echipa se împarte în 5 departamente, precum: Proiectare 3D, Mecanică, Programare, Design și PR. Aceștia sunt membrii echipei:";

    const fullText_en =
        "This season, our team consists of 15 members and 20 volunteers. Together, we learn, build, and grow, striving to have a positive impact on our community and beyond. The team is divided into 5 departments: 3D Design, Mechanics, Programming, Design, and PR. These are the team members:";

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match: string) => `<span class="modern-num">${match}</span>`,
        );
    }

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth <= 768;
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    $: currentText = $language === "ro" ? fullText_ro : fullText_en;
    $: showFullText = !isMobile || isExpanded;
    $: displayedText = showFullText ? currentText : currentText.slice(0, 120);

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
            subtitle: "FĂ CUNOŞTINŢĂ CU",
            title: "MEMBRII<br />NOŞTRI",
            viewAll: "VEZI TOŢI MEMBRII",
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
            subtitle: "MEET OUR",
            title: "MEMBERS",
            viewAll: "VIEW ALL MEMBERS",
        },
    };
</script>

<div class="members-page">
    <div class="top-grid">
        <div class="subtitle-area">
            <h2 class="subtitle">
                {navLabels[$language as Language].subtitle}
            </h2>
        </div>

        <div class="nav-area">
            <nav class="nav-buttons local-nav">
                <div class="nav-row">
                    <a href="#home" class="btn"
                        >{navLabels[$language as Language].home}</a
                    >
                    <a href="#about" class="btn"
                        >{navLabels[$language as Language].about}</a
                    >
                </div>
                <div class="nav-row">
                    <a href="#sponsors" class="btn"
                        >{navLabels[$language as Language].sponsors}</a
                    >
                    <a href="#members" class="btn selected"
                        >{navLabels[$language as Language].members}</a
                    >
                </div>
                <div class="nav-row">
                    <a href="#events" class="btn"
                        >{navLabels[$language as Language].events}</a
                    >
                    <a href="#results" class="btn"
                        >{navLabels[$language as Language].results}</a
                    >
                </div>
                <div class="nav-row">
                    <a href="#gallery" class="btn"
                        >{navLabels[$language as Language].gallery}</a
                    >
                </div>
            </nav>
            <div class="map-container local-map">
                <a href="/map" class="btn btn-map"
                    >{navLabels[$language as Language].map}</a
                >
            </div>
        </div>

        <div class="title-area">
            <h1 class="title">
                {@html navLabels[$language as Language].title}
            </h1>
        </div>

        <div class="text-area">
            <p
                class="description {isMobile ? 'clickable' : ''}"
                on:click={() => {
                    if (isMobile) isExpanded = !isExpanded;
                }}
                role="article"
            >
                {@html formatNumbers(displayedText)}
                {#if isMobile && !isExpanded}
                    <span class="expand-dots">...</span>
                {/if}
            </p>
        </div>
    </div>

    <div class="bottom-section">
        <div class="members-grid">
            {#each Array(16) as _}
                <div class="member-card member-placeholder"></div>
            {/each}
        </div>
        <div class="view-all-container">
            <a href="/members" class="btn view-all-btn">
                {navLabels[$language as Language].viewAll}
            </a>
        </div>
    </div>
</div>

<style>
    .members-page {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100vw;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: center;
        gap: 1rem;
        overflow-x: hidden;
    }

    .top-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(250px, 0.8fr);
        grid-template-rows: auto auto auto;
        column-gap: 2rem;
        width: 100%;
        align-items: start;
    }

    .subtitle-area {
        grid-column: 1;
        grid-row: 1;
        justify-self: start;
    }

    .title-area {
        grid-column: 1;
        grid-row: 2;
        min-width: 0;
        justify-self: start;
    }

    .text-area {
        grid-column: 1;
        grid-row: 3;
        max-width: 100%;
    }

    .nav-area {
        grid-column: 2;
        grid-row: 2 / span 2;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-self: end;
        width: 100%;
    }

    .title {
        font-size: clamp(2.5rem, 8vw, 9rem);
        line-height: 0.85;
        margin: 0;
        text-transform: uppercase;
        word-wrap: break-word;
        text-align: left;
        justify-self: start;
    }

    .subtitle {
        font-size: clamp(1.4rem, 4vw, 4.2rem);
        font-weight: 300;
        margin-bottom: -0.2rem;
        text-align: left;
        justify-self: start;
    }

    @media (min-width: 1920px) {
        .top-grid {
            column-gap: 5rem;
        }

        .title {
            font-size: 10rem;
        }

        .subtitle {
            font-size: 4.8rem;
        }
    }

    @media (max-width: 1300px) and (min-width: 900px) {
        .local-nav {
            display: grid;
            grid-template-columns: repeat(2, max-content);
            justify-content: end;
            gap: 0.75rem 1rem;
        }

        .nav-row {
            display: contents;
        }
    }

    .local-nav {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
    }

    .nav-row {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        flex-wrap: nowrap;
    }

    .btn {
        padding: 0.9rem 1.6rem;
        white-space: nowrap;
        font-size: clamp(0.8rem, 1.5vw, 1.5rem);
    }

    .bottom-section {
        width: 100%;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .members-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
    }

    .member-card:nth-child(1) {
        grid-column: 3;
        grid-row: 1;
    }

    .member-card:nth-child(2) {
        grid-row: 2;
        grid-column: 1;
    }

    .member-card {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 1rem;
        aspect-ratio: 3 / 2;
        transition: 0.3s;
    }

    .member-placeholder {
        background: rgba(200, 200, 200, 0.2);
    }

    @media (max-width: 1024px) {
        .top-grid {
            grid-template-columns: 1fr 300px;
        }
    }

    @media (max-width: 768px) {
        .top-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 4rem;
        }

        .nav-area {
            display: none;
        }

        .members-grid {
            grid-template-columns: repeat(2, 1fr);
            max-height: 40vh;
            overflow-y: auto;
        }

        .member-card:nth-child(1),
        .member-card:nth-child(2) {
            grid-column: auto;
            grid-row: auto;
        }
    }
</style>
