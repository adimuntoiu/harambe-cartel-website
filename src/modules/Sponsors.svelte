<script lang="ts">
    import { onMount } from "svelte";
    import { language, type Language } from "$lib/stores/settings.js";

    let isMobile = false;
    let isExpanded = false;

    const fullText_ro = `Parteneriatele cu sponsorii noștri reprezintă fundamentul succesului echipei Harambe Cartel. Fără sprijinul lor financiar și moral, nu am putea susține performanța constantă cu care ne-am obișnuit comunitatea în aceste zece sezoane. De-a lungul anilor, am avut privilegiul de a colabora cu o varietate de susținători care au crezut în viziunea noastră și au contribuit direct la progresul nostru tehnic și educațional. 
    Deși acest sezon a adus provocări fără precedent în procesul de atragere a resurselor, am învățat că reziliența este o parte esențială a drumului nostru către excelență. Suntem cu atât mai recunoscători celor care au ales să investească în viitorul nostru, în ciuda contextului dificil. Succesul robotului nostru și impactul pe care îl avem în comunitate li se datorează în egală măsură, motiv pentru care dorim să le mulțumim în mod special partenerilor noștri:`;
    const fullText_en =
        "Sponsors are a fundamental element for almost every FTC team. Without the financial support that our sponsors provide, we would not be able to achieve consistent performance. Over the years, our sponsors have helped us enormously. Over the years, we have had the support of a variety of sponsors, who have contributed to our development and progress. However, this season, the process of attracting sponsors has been more difficult than ever, so we thank our sponsors:";

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
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
    $: truncationPoint =
        $language === "ro"
            ? currentText.indexOf("Deși acest sezon")
            : currentText.indexOf("However, this season");
    $: displayedText = isExpanded
        ? currentText
        : currentText.slice(0, truncationPoint !== -1 ? truncationPoint : 300);

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
            subtitle: "ACEŞTIA SUNT",
            title: "SPONSORII<br />NOŞTRI",
            readMore: "vezi mai mult",
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
            subtitle: "THESE ARE OUR",
            title: "SPONSORS",
            readMore: "read more",
        },
    };
</script>

<div class="sponsors-page">
    <div class="top-grid">
        <div class="nav-area">
            <nav class="nav-buttons local-nav">
                <div class="nav-row">
                    <a href="#home" class="btn"
                        >{navLabels[$language as Language].home}</a
                    >
                    <a href="#about" class="btn"
                        >{navLabels[$language as Language].about}</a
                    >
                    <a href="#sponsors" class="btn selected"
                        >{navLabels[$language as Language].sponsors}</a
                    >
                </div>
                <div class="nav-row">
                    <a href="#members" class="btn"
                        >{navLabels[$language as Language].members}</a
                    >
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

        <div class="subtitle-area">
            <h2 class="subtitle">
                {navLabels[$language as Language].subtitle}
            </h2>
        </div>

        <div class="title-area">
            <h1 class="title">
                {@html navLabels[$language as Language].title}
            </h1>
        </div>

        <div class="text-area">
            <p
                class="description clickable"
                on:click={() => (isExpanded = !isExpanded)}
                role="article"
            >
                {@html formatNumbers(displayedText)}
                {#if !isExpanded}
                    <span class="expand-dots"
                        >... <span class="read-more"
                            >{navLabels[$language as Language].readMore}</span
                        ></span
                    >
                {/if}
            </p>
        </div>
    </div>

    <div class="bottom-section">
        <div class="sponsors-grid {isExpanded ? 'shrunk' : ''}">
            <div class="sponsor-card">
                <img src="/assets/sponsors/panduit.png" alt="Panduit" />
            </div>
            <div class="sponsor-card">
                <img
                    src="/assets/sponsors/eurotravel.png"
                    alt="Eurotravel"
                />
            </div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
        </div>
    </div>
</div>

<style>
    .sponsors-page {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: center;
        gap: 1rem;
    }

    .top-grid {
        display: grid;
        grid-template-columns: min-content minmax(0, 1fr);
        grid-template-rows: auto auto auto;
        column-gap: 2.5rem;
        row-gap: 0; /* Removed space between rows */
        width: 100%;
        align-items: start;
    }

    .nav-area {
        grid-column: 1;
        grid-row: 1 / span 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .subtitle-area {
        grid-column: 2;
        grid-row: 1;
        text-align: right;
    }

    .subtitle {
        font-size: clamp(1.4rem, 4vw, 3.8rem);
        font-weight: 300;
        margin: 0;
        line-height: 1;
    }

    .title-area {
        grid-column: 2;
        grid-row: 2;
        text-align: right;
    }

    .title {
        font-size: clamp(2.5rem, 8vw, 7rem);
        line-height: 0.85;
        margin: 0;
        /* Pulls title up closer to the subtitle */
        margin-top: -1.2rem;
        text-transform: uppercase;
    }

    /* --- Scaling for ~1200px --- */
    @media (min-width: 769px) and (max-width: 1400px) {
        .title {
            font-size: clamp(2.2rem, 6vw, 4.8rem);
            margin-top: -0.6rem; /* Adjusted for smaller font */
        }
        .subtitle {
            font-size: clamp(1.2rem, 3vw, 2.2rem);
        }
    }

    /* --- Scaling for 1080p+ --- */
    @media (min-width: 1920px) {
        .title {
            font-size: 9.5rem;
            margin-top: -1.8rem;
        }
        .subtitle {
            font-size: 4.2rem;
        }
        .top-grid {
            column-gap: 5rem;
        }
    }

    /* --- Standard Styles --- */
    .text-area {
        grid-column: 1 / span 2;
        grid-row: 3;
        width: 100%;
        margin-top: 2rem;
    }
    .text-area .description {
        font-size: 1.3rem;
        text-align: justify;
        line-height: 1.5;
        cursor: pointer;
    }
    .read-more {
        font-size: 0.9rem;
        color: #41dccc;
        font-weight: bold;
        text-transform: uppercase;
        margin-left: 0.5rem;
    }
    .local-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
    }
    .nav-row {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-start;
    }
    .local-nav .btn {
        padding: 0.5rem 1rem;
        white-space: nowrap;
    }
    .bottom-section {
        width: 100%;
        margin-top: 1rem;
    }
    .sponsors-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
    }
    .sponsor-card {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 1rem;
        aspect-ratio: 3/2;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .sponsor-card img {
        max-width: 80%;
        max-height: 80%;
        object-fit: contain;
    }
    .sponsor-placeholder {
        background: rgba(200, 200, 200, 0.2);
    }

    @media (max-width: 768px) {
        .top-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        .nav-area {
            display: none;
        }
        .text-area {
            text-align: left;
            margin-top: 1rem;
            max-height: 20vh; /* Smaller text scroll box */
            overflow-y: auto;
        }
        .title {
            margin-top: 0;
        }

        .sponsors-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 rows (columns) */
        }

        .sponsor-card {
            aspect-ratio: 1/1; /* Bigger squares/taller items */
        }
    }
</style>
