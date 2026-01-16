<script lang="ts">
    import "../styles/main.css";
    import { onMount } from "svelte";
    import {
        seasons,
        selectedSeasonIndex,
        menuStartIndex,
    } from "$lib/stores/season.js";
    import { language, type Language } from "$lib/stores/settings.js";
    import SeasonBar from "../lib/components/SeasonBar.svelte";

    // let selectedSeasonIndex = 8; // Removed local state
    let itemsPerPage = 4;
    let menuContainerWidth;

    let isMobile = false;
    let isExpanded = false;

    const fullText_ro =
        "De-a lungul anilor, am participat la numeroase evenimente și competiții care ne-au modelat ca echipă. Fiecare sezon aduce provocări noi, oportunități de învățare și momente memorabile alături de comunitatea FIRST Tech Challenge.";
    const fullText_en =
        "Over the years, we have participated in numerous events and competitions that have shaped us as a team. Each season brings new challenges, learning opportunities, and memorable moments with the FIRST Tech Challenge community.";

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
            subtitle: "CĂLĂTORIA NOASTRĂ ÎN",
            title: "EVENIMENTE",
            subtitle2: "LA CARE AM PARTICIPAT<br />SAU PE CARE LE-AM GĂZDUIT",
            fallback: "Nu am găsit niciun rezultat",
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
            subtitle: "OUR JOURNEY THROUGH",
            title: "EVENTS",
            subtitle2: "IN WHICH WE PARTICIPATED<br />OR WE HOSTED",
            fallback: "We didn't find any results",
        },
    };

    $: selectedSeason = seasons[$selectedSeasonIndex];

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

    // Mock Event Data (to be replaced with API call)
    let events: Event[] = [];

    import eventData from "../events.json" with { type: "json" };

    const mockEvents: Record<string, Event[]> = eventData;

    $: {
        // Update events when season changes
        events = mockEvents[selectedSeason.id] || [];

        // Scroll to top when events change
        if (typeof document !== "undefined") {
            const list = document.querySelector(".right-column");
            if (list) list.scrollTop = 0;
        }
    }

    function updateItemsPerPage() {
        itemsPerPage = 3;
    }

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth <= 768;
            updateItemsPerPage();
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    });
</script>

<div class="events-container">
    <div class="top-section">
        <!-- Left Column: Content (Title, Text, Nav) -->
        <div class="left-column">
            <!-- Title Group -->
            <div class="title-group">
                <h1 class="page-title">
                    {navLabels[$language as Language].title}
                </h1>
                <h2 class="subtitle">
                    {@html navLabels[$language as Language].subtitle2}
                </h2>
            </div>

            <!-- Description Text -->
            <div class="text-area">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
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

            <!-- Navigation Buttons -->
            <div class="nav-area">
                <nav class="nav-buttons local-nav">
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
                    <a href="#events" class="btn selected"
                        >{navLabels[$language as Language].events}</a
                    >
                    <a href="#results" class="btn"
                        >{navLabels[$language as Language].results}</a
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

            <!-- Season Menu -->
            <SeasonBar />
        </div>

        <!-- Right Column: Event Cards -->
        <div class="right-column">
            <div class="events-list">
                {#if events.length > 0}
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
                                    {event.rank} | {@html formatNumbers(
                                        event.wlt,
                                    )}
                                </p>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <div class="empty-seasons-fallback">
                        <p>
                            {navLabels[$language as Language].fallback}
                        </p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    /* Global style for modern numbers */
    :global(.modern-num) {
        font-family: "Arial", sans-serif; /* Or any other modern font */
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
        align-items: center; /* Center content vertically */
        width: 100%;
        height: 100%;
        gap: 2rem;
        overflow: hidden; /* Prevent overflow from list */
    }

    /* Left Column */
    .left-column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 40%;
        min-width: 400px;
        height: 100%;
        justify-content: center; /* Centered vertically */
        gap: 2rem; /* Spacing between elements */
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
        text-align: left; /* Ensure text is left aligned */
    }

    .page-title {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(4rem, 6vw, 6rem); /* Increased size */
        margin: 0;
        line-height: 1;
        color: #41dccc; /* Fallback */
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
        white-space: normal;
        word-wrap: break-word;
    }

    @media (min-width: 1920px) {
        .page-title {
            font-size: 8rem;
        }
    }

    .text-area {
        width: 100%;
        margin-top: 0; /* Handled by gap */
    }

    .description {
        font-family: "Coco Gothic", sans-serif;
        font-size: clamp(0.9rem, 1.1vw, 1.1rem);
        color: #949494;
        text-align: justify;
        line-height: 1.6;
        margin: 0;
    }

    /* Nav Area */
    .nav-area {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 0; /* Handled by gap */
        width: 100%;
        align-items: flex-start;
    }

    .local-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0;
        direction: ltr;
        justify-content: flex-start;
    }

    .local-nav .btn {
        direction: ltr;
    }

    .local-map {
        margin-top: 0;
        padding-right: 0;
        justify-content: flex-start;
        width: 100%;
        direction: ltr;
    }

    /* Right Column: Events List */
    .right-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto; /* Scrollable events list */
        padding-right: 1rem; /* Space for scrollbar */
        gap: 1rem;
        height: auto; /* Allow height to fit content up to max-height */
        max-height: 600px; /* Limit height to show approx 3 cards */
        scroll-behavior: smooth;
        overscroll-behavior: contain; /* Prevent body scroll */
        justify-content: flex-start; /* Align items to top of container */
    }

    /* Custom Scrollbar */
    /* Custom Scrollbar removed for cross-browser consistency */
    /* .right-column::-webkit-scrollbar { ... } */

    .events-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    .event-card {
        background: rgba(0, 0, 0, 0.6); /* Darker background for tournaments */
        border-radius: 1rem;
        padding: 2.5rem; /* Increased padding */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 180px; /* Increased height */
        backdrop-filter: blur(5px);
        transition:
            transform 0.2s,
            background 0.2s,
            box-shadow 0.2s;
        border: 1px solid transparent; /* Prepare for border */
    }

    .event-card.league-meet {
        background: rgba(
            150,
            150,
            150,
            0.5
        ); /* Lighter background for league meets */
        min-height: 120px; /* Smaller height for league meets */
        padding: 1.5rem; /* Increased padding */
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
        background: rgba(255, 255, 255, 0.1); /* Subtle hover brightness */
    }

    .event-card.championship:hover {
        background: linear-gradient(
            135deg,
            rgba(20, 20, 20, 0.8),
            rgba(20, 60, 60, 0.8)
        );
        box-shadow: 0 0 20px rgba(65, 220, 204, 0.5);
    }

    .event-card.important:hover {
        background: rgba(50, 50, 50, 0.7); /* Lighter on hover */
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
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
        font-size: 1.5rem; /* Increased from 1.2rem */
        color: white;
        margin: 0;
    }

    .event-card.league-meet .event-info h3 {
        font-size: 1rem; /* Smaller font for league meets */
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
        margin-top: 1rem;
        font-family: "Pirulen", sans-serif;
        font-size: 1rem;
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
    }

    .award-text {
        color: #41dccc; /* Cyan for awards */
        margin: 0;
    }

    .stats-text {
        color: white;
        margin: 0;
    }

    .event-card.league-meet .event-result {
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }

    .event-card.league-meet .event-result {
        margin-top: 0.5rem;
        font-size: 0.9rem;
    }

    /* Responsive Layouts */
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
            padding-left: 1rem; /* Add some padding if it's too close to the edge */
        }

        .local-nav {
            justify-content: center;
        }

        .right-column {
            width: 100%;
            padding-right: 0;
        }

        .right-column {
            width: 100%;
            padding-right: 0;
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
            display: contents; /* Allow children to be part of top-section flex */
        }

        .title-group {
            order: 1;
            margin-top: 4rem; /* Lower title */
            padding-left: 0;
            align-items: flex-end;
        }

        .page-title {
            font-size: 3rem; /* Smaller title */
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
            display: none; /* Hide nav */
        }

        .right-column {
            order: 3; /* Events under text */
            max-height: 35vh; /* Show approx 2 rows */
            margin-top: 1rem;
        }

        .event-card {
            padding: 1rem; /* Smaller padding */
            min-height: auto;
        }

        .event-info h3 {
            font-size: 1rem; /* Smaller font */
        }
    }

    /* Short Screen Layout (matching Results page fix) */
    @media (max-height: 850px) and (min-width: 1025px) {
        .events-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto 1fr; /* Added a row for the season menu */
            grid-template-areas:
                "list title"
                "list text"
                "list nav"
                "list season-menu"; /* Footer in left column */
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
            /* List takes the 'list' area which spans rows */
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            max-height: 80vh; /* Limit height to allow scrolling within grid */
        }

        .events-list {
            grid-area: list;
        }
    }

    .empty-seasons-fallback {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 1rem;
        border: 1px dashed rgba(255, 255, 255, 0.2);
        padding: 2rem;
        text-align: center;
        width: 100%;
    }

    .empty-seasons-fallback p {
        font-family: "Coco Gothic", sans-serif;
        font-size: 1.2rem;
        color: #bbbbbb;
        margin: 0;
    }
</style>
