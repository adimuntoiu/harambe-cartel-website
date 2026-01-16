<script lang="ts">
    import "../styles/main.css";
    import { onMount } from "svelte";
    import { selectedSeasonIndex, menuStartIndex } from "$lib/stores/season.js";
    import { language, type Language } from "$lib/stores/settings.js";
    import SeasonBar from "../lib/components/SeasonBar.svelte";

    // Season Data
    const seasons = [
        {
            id: "velocityvortex",
            name_ro: "VELOCITY VORTEX",
            name_en: "VELOCITY VORTEX",
            logo: "src/assets/ftc-seasons/velocityvortex.png",
        },
        {
            id: "relicrecovery",
            name_ro: "RELIC RECOVERY",
            name_en: "RELIC RECOVERY",
            logo: "src/assets/ftc-seasons/relicrecovery.png",
        },
        {
            id: "roverruckus",
            name_ro: "ROVER RUCKUS",
            name_en: "ROVER RUCKUS",
            logo: "src/assets/ftc-seasons/roverruckus.png",
        },
        {
            id: "skystone",
            name_ro: "SKYSTONE",
            name_en: "SKYSTONE",
            logo: "src/assets/ftc-seasons/skystone.png",
        },
        {
            id: "ultimategoal",
            name_ro: "ULTIMATE GOAL",
            name_en: "ULTIMATE GOAL",
            logo: "src/assets/ftc-seasons/ultimategoal.png",
        },
        {
            id: "freightfrenzy",
            name_ro: "FREIGHT FRENZY",
            name_en: "FREIGHT FRENZY",
            logo: "src/assets/ftc-seasons/freightfrenzy.png",
        },
        {
            id: "powerplay",
            name_ro: "POWER PLAY",
            name_en: "POWER PLAY",
            logo: "src/assets/ftc-seasons/powerplay.png",
        },
        {
            id: "centerstage",
            name_ro: "CENTER STAGE",
            name_en: "CENTER STAGE",
            logo: "src/assets/ftc-seasons/centerstage.png",
        },
        {
            id: "intothedeep",
            name_ro: "INTO THE DEEP",
            name_en: "INTO THE DEEP",
            logo: "src/assets/ftc-seasons/intothedeep.png",
        },
        {
            id: "decode",
            name_ro: "DECODE",
            name_en: "DECODE",
            logo: "src/assets/ftc-seasons/decode.png",
        },
    ];

    let itemsPerPage = 4;
    let isMobile = false;
    let isExpanded = false;

    $: selectedSeason = seasons[$selectedSeasonIndex];
    $: visibleSeasons = seasons.slice(
        $menuStartIndex,
        $menuStartIndex + itemsPerPage,
    );

    const fullText_ro =
        "În fiecare sezon, echipa noastră depune eforturi considerabile pentru a atinge performanțe de vârf. Rezultatele noastre reflectă munca susținută, inovația tehnică și spiritul competitiv care ne definesc.";
    const fullText_en =
        "Each season, our team puts in considerable effort to achieve top performance. Our results reflect the sustained work, technical innovation, and competitive spirit that define us.";

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match: string) => `<span class="modern-num">${match}</span>`,
        );
    }

    $: currentText = $language === "ro" ? fullText_ro : fullText_en;
    $: showFullText = !isMobile || isExpanded;
    $: displayedText = showFullText ? currentText : currentText.slice(0, 100);

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
            title: "REZULTATE",
            seeMore: "VEZI MAI MULTE ÎN EVENIMENTE",
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
            title: "RESULTS",
            seeMore: "SEE MORE IN EVENTS",
        },
    };

    $: isCenterStage = selectedSeason.id === "centerstage";
    $: isFreightFrenzy = selectedSeason.id === "freightfrenzy";
    $: isSkystone = selectedSeason.id === "skystone";
    $: isIntoTheDeep = selectedSeason.id === "intothedeep";
    $: isPowerPlay = selectedSeason.id === "powerplay";
    $: isRoverRuckus = selectedSeason.id === "roverruckus";
    $: isUltimateGoal = selectedSeason.id === "ultimategoal";

    $: robotImage = isCenterStage
        ? "src/assets/robots/geicu.png"
        : isFreightFrenzy
          ? "src/assets/robots/freight.png"
          : isSkystone
            ? "src/assets/robots/skystone.png"
            : isIntoTheDeep
              ? "src/assets/robots/fuego.png"
              : isPowerPlay
                ? "src/assets/robots/kormanyos.png"
                : isRoverRuckus
                  ? "src/assets/robots/roverruckus.png"
                  : "src/assets/placeholder.svg";

    function updateItemsPerPage() {
        const width = window.innerWidth;
        if (width <= 768) {
            itemsPerPage = 3;
        } else if (width <= 1250) {
            itemsPerPage = 3; // Reduce count for mid-range resolutions
        } else {
            itemsPerPage = 4;
        }

        if ($menuStartIndex > seasons.length - itemsPerPage) {
            $menuStartIndex = Math.max(0, seasons.length - itemsPerPage);
        }
    }

    onMount(() => {
        const handleResize = () => {
            isMobile = window.innerWidth <= 768;
            updateItemsPerPage();
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
</script>

<div class="results-container">
    <div class="top-section">
        <div class="left-column">
            <div class="title-group">
                <h2
                    class="season-name"
                    class:lighter-font={isFreightFrenzy || isUltimateGoal}
                >
                    {$language === "ro"
                        ? selectedSeason.name_ro
                        : selectedSeason.name_en}
                </h2>
                <h1 class="page-title">
                    {navLabels[$language as Language].title}
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
                    {#if isMobile && !isExpanded}<span class="expand-dots"
                            >...</span
                        >{/if}
                </p>
                <a href="#events" class="btn btn-map see-more-btn"
                    >{navLabels[$language as Language].seeMore}</a
                >
            </div>

            <div class="nav-area">
                <nav class="nav-buttons local-nav">
                    <a href="#results" class="btn selected"
                        >{navLabels[$language as Language].results}</a
                    >
                    <a href="#home" class="btn"
                        >{navLabels[$language as Language].home}</a
                    >
                    <a href="#about" class="btn"
                        >{navLabels[$language as Language].about}</a
                    >
                    <a href="#sponsors" class="btn"
                        >{navLabels[$language as Language].sponsors}</a
                    >
                    <a href="#members" class="btn"
                        >{navLabels[$language as Language].members}</a
                    >
                    <a href="#events" class="btn"
                        >{navLabels[$language as Language].events}</a
                    >
                    <a href="#gallery" class="btn"
                        >{navLabels[$language as Language].gallery}</a
                    >
                </nav>
                <div class="map-container local-map">
                    <a href="/map" class="btn btn-map"
                        >{navLabels[$language as Language].map}</a
                    >
                </div>
            </div>
        </div>

        <div class="right-column">
            <div class="season-logo-large">
                <img
                    src={selectedSeason.logo}
                    alt={$language === "ro"
                        ? selectedSeason.name_ro
                        : selectedSeason.name_en}
                />
            </div>
            <div class="photo-placeholder">
                <img
                    src={robotImage}
                    alt="Robot"
                    class:shrunk={isExpanded}
                    class:reversed={isPowerPlay}
                    class:rover-ruckus-img={isRoverRuckus}
                    class:center-stage-img={isCenterStage}
                />
            </div>
            <SeasonBar />
        </div>
    </div>
</div>

<style>
    .results-container {
        display: grid;
        /* Changed to minmax to prevent right column from being pushed out */
        grid-template-columns: 40% minmax(0, 1fr);
        width: 100%;
        height: 100vh;
        padding: 2rem;
        padding-bottom: 8rem;
        box-sizing: border-box;
        position: relative;
        gap: 2rem;
        overflow: hidden;
    }

    .top-section {
        display: contents;
    }

    .left-column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        padding-top: 15vh;
        overflow-y: auto;
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .season-name {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(0.8rem, 1.5vw, 1.8rem);
        color: #636363;
        margin: 0;
        line-height: 1.2;
    }

    .season-name.lighter-font {
        color: #bbbbbb;
    }

    .page-title {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(2.5rem, 4vw, 4rem);
        margin: 0;
        line-height: 1;
        background: linear-gradient(
            90deg,
            #41dccc 0%,
            #59d3ff 50%,
            #41dccc 100%
        );
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 5s linear infinite;
    }

    .text-area {
        width: 100%;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .see-more-btn {
        display: inline-block;
        text-decoration: none;
        align-self: flex-start;
        margin-top: 1rem;
        font-size: 0.9rem !important;
        padding: 0.5rem 1rem !important;
        width: auto !important;
    }

    .description {
        font-family: "Coco Gothic", sans-serif;
        font-size: clamp(0.85rem, 1vw, 1.1rem);
        color: #949494;
        text-align: justify;
        line-height: 1.6;
        margin: 0;
    }

    .nav-area {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
        width: 100%;
        align-items: flex-start;
    }

    .local-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: flex-start;
    }

    .right-column {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        gap: 1rem;
        min-width: 0; /* Critical for grid shrinking */
    }

    .season-logo-large img {
        height: clamp(60px, 10vw, 120px);
        width: auto;
        object-fit: contain;
    }

    .photo-placeholder {
        transform: scaleX(-1);
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .photo-placeholder img {
        max-height: 55vh;
        object-fit: contain;
    }

    .photo-placeholder img.reversed {
        transform: scaleX(-1);
    }

    .photo-placeholder img.rover-ruckus-img {
        transform: scale(1.3);
    }

    .photo-placeholder img.center-stage-img {
        transform: scale(1.2);
    }

    /* --- BREAKPOINT FIX FOR 1200px --- */
    @media (max-width: 1250px) {
        .results-container {
            gap: 1rem;
            padding: 1.5rem;
        }

        /* Reduce the size of the season items to save horizontal space */
        :global(.season-item) {
            width: 50px !important;
            height: 50px !important;
        }

        :global(.season-menu-container) {
            padding: 0.5rem !important;
            gap: 0.5rem !important;
        }

        .photo-placeholder img {
            max-height: 45vh;
        }
    }

    @media (max-width: 768px) {
        .results-container {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            height: auto;
            min-height: 100vh;
        }

        .nav-area {
            display: none;
        }
        .season-logo-large {
            display: none;
        }

        .right-column {
            align-items: center;
            height: auto;
        }
    }

    @media (max-height: 850px) and (min-width: 769px) {
        .results-container {
            grid-template-rows: auto auto 1fr;
            grid-template-areas:
                "title logo"
                "text robot"
                "nav footer";
        }
        /* Grid area assignments... */
    }
</style>
