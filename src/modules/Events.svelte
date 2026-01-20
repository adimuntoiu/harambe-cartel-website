<script lang="ts">
    import "../styles/main.css";
    import { onMount } from "svelte";
    import { selectedSeasonIndex } from "$lib/stores/season";
    import { language } from "$lib/stores/settings";
    import eventsData from "../events.json";

    interface Season {
        id: string;
        name: string;
        logo: string;
    }

    interface Event {
        name_ro: string;
        name_en: string;
        date_ro: string;
        date_en: string;
        location_ro: string;
        location_en: string;
        rank: string;
        wlt: string;
        awards: string;
        type: string;
        isImportant?: boolean;
        isChampionship?: boolean;
        organizer?: boolean;
    }

    // Season Data [cite: 229-234]
    const seasons = [
        {
            id: "velocityvortex",
            name: "VELOCITY VORTEX",
            logo: "src/assets/ftc-seasons/velocityvortex.png",
        },
        {
            id: "relicrecovery",
            name: "RELIC RECOVERY",
            logo: "src/assets/ftc-seasons/relicrecovery.png",
        },
        {
            id: "roverruckus",
            name: "ROVER RUCKUS",
            logo: "src/assets/ftc-seasons/roverruckus.png",
        },
        {
            id: "skystone",
            name: "SKYSTONE",
            logo: "src/assets/ftc-seasons/skystone.png",
        },
        {
            id: "ultimategoal",
            name: "ULTIMATE GOAL",
            logo: "src/assets/ftc-seasons/ultimategoal.png",
        },
        {
            id: "freightfrenzy",
            name: "FREIGHT FRENZY",
            logo: "src/assets/ftc-seasons/freightfrenzy.png",
        },
        {
            id: "powerplay",
            name: "POWER PLAY",
            logo: "src/assets/ftc-seasons/powerplay.png",
        },
        {
            id: "centerstage",
            name: "CENTER STAGE",
            logo: "src/assets/ftc-seasons/centerstage.png",
        },
        {
            id: "intothedeep",
            name: "INTO THE DEEP",
            logo: "src/assets/ftc-seasons/intothedeep.png",
        },
        {
            id: "decode",
            name: "DECODE",
            logo: "src/assets/ftc-seasons/decode.png",
        },
    ];

    let menuStartIndex = 0;
    let itemsPerPage = 4;
    let menuContainerWidth;

    let isMobile = false;
    let isExpanded = false;
    const fullText_ro =
        "De-a lungul anilor, am participat la numeroase evenimente și competiții care ne-au modelat ca echipă. Fiecare sezon aduce provocări noi, oportunități de învățare și momente memorabile alături de comunitatea FIRST Tech Challenge.";
    const fullText_en =
        "Over the years, we have participated in numerous events and competitions that have shaped us as a team. Each season brings new challenges, learning opportunities, and memorable moments with the FIRST Tech Challenge community.";

    $: showFullText = !isMobile || isExpanded;
    $: currentFullText = $language === "ro" ? fullText_ro : fullText_en;
    $: displayedText = showFullText
        ? currentFullText
        : currentFullText.slice(0, 100);

    $: selectedSeason = seasons[$selectedSeasonIndex];
    $: visibleSeasons = seasons.slice(
        menuStartIndex,
        menuStartIndex + itemsPerPage,
    );

    let events: Event[] = [];
    $: {
        const seasonId = selectedSeason.id;
        const rawEvents = (eventsData as Record<string, Event[]>)[seasonId];

        if (rawEvents && rawEvents.length > 0) {
            events = rawEvents;
        } else {
            events = [
                {
                    name_ro: "Nu există date suficiente pentru acest sezon.",
                    name_en: "There wasn't sufficient data for this season.",
                    date_ro: "N/A",
                    date_en: "N/A",
                    location_ro: "N/A",
                    location_en: "N/A",
                    rank: "",
                    wlt: "",
                    awards: "",
                    type: "league-meet",
                },
            ];
        }

        if (typeof document !== "undefined") {
            const list = document.querySelector(".right-column");
            if (list) list.scrollTop = 0;
        }
    }

    function selectSeason(index: number) {
        $selectedSeasonIndex = index;
    }
    function scrollMenu(direction: string) {
        if (direction === "left") {
            if (menuStartIndex > 0) menuStartIndex--;
        } else {
            if (menuStartIndex < seasons.length - itemsPerPage)
                menuStartIndex++;
        }
    }

    function updateItemsPerPage() {
        itemsPerPage = 3;
        if (menuStartIndex > seasons.length - itemsPerPage) {
            menuStartIndex = Math.max(0, seasons.length - itemsPerPage);
        }
    }

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9]+/g,
            (match: string) => `<span class="modern-num">${match}</span>`,
        );
    }

    $: if ($selectedSeasonIndex !== undefined) {
        const targetStart =
            $selectedSeasonIndex - Math.floor((itemsPerPage - 1) / 2);
        menuStartIndex = Math.max(
            0,
            Math.min(targetStart, seasons.length - itemsPerPage),
        );
    }

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth <= 768;
            updateItemsPerPage();
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });
</script>

<div class="events-container">
    <div class="top-section">
        <div class="left-column">
            <div class="title-group">
                <h1 class="page-title">EVENTS</h1>
                <h2 class="subtitle">
                    IN WHICH WE PARTICIPATED<br />OR WE HOSTED
                </h2>
            </div>

            <div class="text-area">
                <button
                    type="button"
                    class="description {isMobile ? 'clickable' : ''}"
                    on:click={() => {
                        if (isMobile) isExpanded = !isExpanded;
                    }}
                    on:keydown={(e) => {
                        if (isMobile && (e.key === "Enter" || e.key === " ")) {
                            isExpanded = !isExpanded;
                            e.preventDefault();
                        }
                    }}
                >
                    {@html formatNumbers(displayedText)}
                    {#if isMobile && !isExpanded}
                        <span class="expand-dots">...</span>
                    {/if}
                </button>
            </div>

            <div class="nav-area">
                <nav class="nav-buttons local-nav">
                    <a href="#home" class="btn">HOME</a>
                    <a href="#about" class="btn">ABOUT US</a>
                    <a href="#sponsors" class="btn">SPONSORS</a>
                    <a href="#members" class="btn">MEMBERS</a>
                    <a href="#events" class="btn selected">EVENTS</a>
                    <a href="#results" class="btn">RESULTS</a>
                    <a href="#gallery" class="btn">GALLERY</a>
                </nav>
                <div class="map-container local-map">
                    <a href="/map" class="btn btn-map">MAP</a>
                </div>
            </div>

            <div
                class="season-menu-container"
                bind:clientWidth={menuContainerWidth}
            >
                <button
                    class="arrow-btn left"
                    on:click={() => scrollMenu("left")}
                    disabled={menuStartIndex === 0}
                >
                    &lt;
                </button>
                <div class="season-menu">
                    {#each visibleSeasons as season, i}
                        <div
                            class="season-item {selectedSeason.id === season.id
                                ? 'active'
                                : ''}"
                            on:click={() => selectSeason(menuStartIndex + i)}
                            on:keydown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    selectSeason(menuStartIndex + i);
                                    e.preventDefault();
                                }
                            }}
                            aria-label="Select season {season.name}"
                            role="button"
                            tabindex="0"
                            data-season={season.id}
                        >
                            <img src={season.logo} alt={season.name} />
                        </div>
                    {/each}
                </div>
                <button
                    class="arrow-btn right"
                    on:click={() => scrollMenu("right")}
                    disabled={menuStartIndex >= seasons.length - itemsPerPage}
                >
                    &gt;
                </button>
            </div>
        </div>

        <div class="right-column">
            <div class="events-list">
                {#each events as event}
                    <div
                        class="event-card {event.type === 'league-meet'
                            ? 'league-meet'
                            : ''} {event.isChampionship
                            ? 'championship'
                            : ''} {event.isImportant ? 'important' : ''}"
                    >
                        <div class="event-info">
                            <div class="header-row">
                                <h3>
                                    {$language === "ro"
                                        ? event.name_ro
                                        : event.name_en}
                                </h3>
                                {#if event.organizer}
                                    <span class="organizer-badge"
                                        >ORGANIZER</span
                                    >
                                {/if}
                            </div>
                            <p class="event-meta">
                                {@html formatNumbers(
                                    $language === "ro"
                                        ? event.date_ro
                                        : event.date_en,
                                )} | {@html formatNumbers(
                                    $language === "ro"
                                        ? event.location_ro
                                        : event.location_en,
                                )}
                            </p>
                        </div>
                        <div class="event-result">
                            {#if event.awards}
                                <p class="award-text">{event.awards}</p>
                            {/if}
                            <p class="stats-text">
                                {event.rank} | {@html formatNumbers(event.wlt)}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    :global(.modern-num) {
        font-family: "Arial", sans-serif;
        font-weight: bold;
    }
    .events-container {
        display: flex;
        flex-direction: column;
        width: 98%;
        height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        position: relative;
        justify-content: space-between;
    }
    .top-section {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        gap: 2rem;
        overflow: hidden;
    }
    .left-column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 40%;
        min-width: 400px;
        height: 100%;
        justify-content: center;
        gap: 2rem;
    }
    .title-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .subtitle {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(0.8rem, 1.5vw, 1.8rem);
        color: #636363;
        margin: 0;
        line-height: 1.2;
        max-width: 100%;
        word-wrap: break-word;
        text-align: left;
    }
    .page-title {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(4rem, 6vw, 6rem);
        margin: 0;
        line-height: 1;
        color: #41dccc;
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
        white-space: nowrap;
    }
    @media (min-width: 1920px) {
        .page-title {
            font-size: 8rem;
        }
    }
    .text-area {
        width: 100%;
        margin-top: 0;
    }
    .description {
        font-family: "Coco Gothic", sans-serif;
        font-size: clamp(0.9rem, 1.1vw, 1.1rem);
        color: #949494;
        text-align: justify;
        line-height: 1.6;
        margin: 0;
        background: none;
        border: none;
        padding: 0;
        cursor: default;
        width: 100%;
    }
    .description.clickable {
        cursor: pointer;
    }
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
        justify-content: flex-start;
    }
    .local-map {
        width: 100%;
        direction: ltr;
    }
    .right-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        padding-right: 1rem;
        gap: 1rem;
        height: auto;
        max-height: 600px;
        scroll-behavior: smooth;
        overscroll-behavior: contain;
        justify-content: flex-start;
    }
    .events-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }
    .event-card {
        background: rgba(0, 0, 0, 0.6);
        border-radius: 1rem;
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.2rem;
        min-height: 180px;
        backdrop-filter: blur(5px);
        transition:
            transform 0.2s,
            background 0.2s,
            box-shadow 0.2s;
        border: 1px solid transparent;
    }
    .event-card.league-meet {
        background: rgba(150, 150, 150, 0.5);
        min-height: 120px;
        padding: 1.5rem;
    }
    .event-card.championship {
        background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8),
            rgba(0, 40, 40, 0.8)
        );
        border: 1px solid #41dccc;
        box-shadow: 0 0 15px rgba(65, 220, 204, 0.3);
    }
    .event-card:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.1);
    }
    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }
    .event-info h3 {
        font-family: "Pirulen", sans-serif;
        font-size: 1.5rem;
        color: white;
        margin: 0;
    }
    .organizer-badge {
        font-family: "Pirulen", sans-serif;
        font-size: 0.7rem;
        color: #41dccc;
        border: 1px solid #41dccc;
        padding: 0.2rem 0.5rem;
        border-radius: 0.5rem;
    }
    .event-meta {
        font-family: "Coco Gothic", sans-serif;
        font-size: 0.9rem;
        color: #e0e0e0;
        margin: 0;
    }
    .event-result {
        margin-top: 0.1rem;
        font-family: "Pirulen", sans-serif;
        font-size: 1.2rem;
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.1rem;
    }
    .award-text {
        color: #41dccc;
        margin: 0;
    }
    .stats-text {
        color: white;
        margin: 0;
    }

    /* DESKTOP SEASON BAR FIT UPDATES */
    .season-menu-container {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        border-radius: 1rem;
        gap: 1rem;
        backdrop-filter: blur(5px);
        width: 100%; /* Spans the left column width  */
        box-sizing: border-box;
        justify-content: center; /* Centers items for better fit */
        margin-top: 0;
        direction: ltr;
    }
    .season-menu {
        display: flex;
        gap: 1rem;
        overflow: hidden;
    }
    .season-item {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s;
        opacity: 0.7;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.5rem;
        padding: 5px;
        flex-shrink: 0;
    }
    .season-item.active {
        opacity: 1;
        border: 2px solid #41dccc;
        background: rgba(65, 220, 204, 0.2);
    }
    .season-item[data-season="powerplay"] img {
        transform: scale(0.7);
    }
    .arrow-btn {
        background: none;
        border: none;
        color: white;
        font-family: "Pirulen", sans-serif;
        font-size: 2rem;
        cursor: pointer;
        padding: 0 1rem;
        transition: color 0.2s;
    }

    /* ANDROID/MOBILE VERSION (UNTOUCHED) */
    @media (max-width: 768px) {
        .top-section {
            flex-direction: column;
            align-items: center;
            overflow: visible;
        }
        .left-column {
            width: 100%;
            align-items: center;
            min-width: 0;
            justify-content: flex-start;
            gap: 1rem;
        }
        .text-area,
        .nav-area {
            align-items: center;
            text-align: center;
        }
        .title-group {
            align-items: flex-start;
            text-align: left;
            width: 100%;
            padding-left: 1rem;
        }
        .local-nav {
            justify-content: center;
        }
        .right-column {
            width: 100%;
            padding-right: 0;
        }
        .season-menu-container {
            justify-content: center;
        }
    }

    @media (max-width: 768px) {
        .events-container {
            height: 100vh;
            overflow: hidden;
        }
        .top-section {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .left-column {
            display: contents;
        }
        .title-group {
            order: 1;
            margin-top: 4rem;
            padding-left: 0;
            align-items: flex-end;
        }
        .page-title {
            font-size: 3rem;
            text-align: right;
        }
        .subtitle {
            text-align: right;
        }
        .text-area {
            order: 2;
            text-align: left;
            width: 100%;
        }
        .description.clickable {
            cursor: pointer;
        }
        .nav-area {
            display: none;
        }
        .right-column {
            order: 3;
            max-height: 35vh;
            margin-top: 1rem;
        }
        .event-card {
            padding: 1rem;
            min-height: auto;
        }
        .event-info h3 {
            font-size: 1rem;
        }
        .season-menu-container {
            order: 4;
            margin-top: auto;
            padding: 0 0.5rem;
            gap: 0.5rem;
            height: 80px;
            min-height: 0;
            width: 100%;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
        }
        .season-menu {
            order: 2;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .season-item {
            width: 60px;
            height: 60px;
            padding: 2px;
        }
        .arrow-btn {
            font-size: 1.5rem;
            padding: 0 1rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            line-height: 1;
        }
        .arrow-btn.left {
            order: 1;
        }
        .arrow-btn.right {
            order: 3;
        }
    }

    /* Short Screen Layout */
    @media (max-height: 850px) and (min-width: 1025px) {
        .events-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto 1fr;
            grid-template-areas: "list title" "list text" "list nav" "list season-menu";
            gap: 1rem;
            align-items: start;
            padding-bottom: 1rem;
        }
        .top-section {
            display: contents;
        }
        .left-column,
        .right-column {
            display: contents;
        }
        .title-group {
            grid-area: title;
        }
        .text-area {
            grid-area: text;
            margin-top: 0;
        }
        .nav-area {
            grid-area: nav;
            margin-top: 0;
            align-items: flex-start;
            align-self: start;
        }
        .local-nav {
            justify-content: flex-start;
        }
        .right-column {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            max-height: 80vh;
        }
        .events-list {
            grid-area: list;
        }
        .season-menu-container {
            grid-area: season-menu;
            margin-top: 0;
            align-self: end;
            justify-content: flex-start;
            width: 100%;
            max-width: none;
        }
    }
</style>
