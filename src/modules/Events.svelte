<script>
    export let title = "Events";
    import "../styles/main.css";
    import { onMount } from "svelte";
    import { selectedSeasonIndex } from "$lib/stores/season";

    // Season Data
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

    // let selectedSeasonIndex = 8; // Removed local state
    let menuStartIndex = 0;
    let itemsPerPage = 4;
    let menuContainerWidth;

    let isMobile = false;
    let isExpanded = false;

    const fullText = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.`;

    $: showFullText = !isMobile || isExpanded;
    $: displayedText = showFullText ? fullText : fullText.slice(0, 100);

    $: selectedSeason = seasons[$selectedSeasonIndex];
    $: visibleSeasons = seasons.slice(
        menuStartIndex,
        menuStartIndex + itemsPerPage,
    );

    // Mock Event Data (to be replaced with API call)
    let events = [];

    const mockEvents = {
        intothedeep: [
            {
                name: "Bucharest Twin Cup",
                date: "22 – 24 August, 2025",
                location:
                    "Universitatea Romano-Americana, Bucuresti, B, Romania",
                rank: "Rank 14/30",
                wlt: "W-L-T: 3-6-0",
                awards: "",
                type: "tournament",
                isImportant: true,
            },
            {
                name: "Romania Championship",
                date: "14-16 Martie 2025",
                location: "Pitesti Arena, Pitesti, AG, Romania",
                rank: "Rank 25/60",
                wlt: "W-L-T: 3-3-0",
                awards: "Natie Prin Educatie Award",
                type: "tournament",
                isChampionship: true,
            },
            {
                name: "West Romania League",
                date: "21-23 Februarie 2025",
                location: "Timisoara, TM, Romania",
                rank: "Rank 5/41",
                wlt: "W-L-T: 5-1-0",
                awards: "Think II Award",
                type: "tournament",
                isImportant: true,
            },
            {
                name: "Robotics Reef League Meet",
                date: "8 Februarie, 2025",
                location: "Timisoara, TM, Romania",
                rank: "Rank 7/12",
                wlt: "W-L-T: 3-3-0",
                awards: "",
                type: "league-meet",
            },
            {
                name: "Aloha League Meet",
                date: "8 Februarie, 2025",
                location: "Colegiul Național 'Preparandia-DimitrieȚichindeal'",
                rank: "Rank 4/10",
                wlt: "W-L-T: 4-2-0",
                awards: "",
                type: "league-meet",
            },
            {
                name: "2025 League Meet (Soft-Delta-Decebal)",
                date: "25 Ianuarie, 2025",
                location: "Universitatea Aurel Vlaicu, Arad",
                rank: "Rank 4/20",
                wlt: "W-L-T: 4-2-0",
                awards: "",
                type: "league-meet",
            },
            {
                name: "Hunedoara Dual Meet by RobotX Hunedoara",
                date: "12 Ianuarie, 2025",
                location: "Hunedoara, HD, Romania",
                rank: "Rank 2/8",
                wlt: "W-L-T: 5-1-0",
                awards: "",
                type: "league-meet",
            },
            {
                name: "RoboDojo X Cybermoon X AtlasCNB",
                date: "7 Decembrie, 2024",
                location: "Timisoara, TM, Romania",
                rank: "Rank 4/12",
                wlt: "W-L-T: 4-2-0",
                awards: "",
                type: "league-meet",
            },
        ],
        centerstage: [
            {
                name: "2024 RO #3 TIMISOARA 070000",
                date: "23-25 Februarie 2024",
                location: "Sala Polivalenta Arad, Arad, AR, Romania",
                rank: "Rank 36/42",
                wlt: "W-L-T: 2-4-0",
                awards: "",
                type: "tournament",
                isImportant: true,
            },
            {
                name: "RO Timisoara - 07000 - DecebalTech 19105 & Dark Energy 19106",
                date: "3-4 Februarie, 2024",
                location: "Deva, HD, Romania",
                rank: "Rank 14/14",
                wlt: "W-L-T: 0-6-0",
                awards: "",
                type: "league-meet",
            },
            {
                name: "RO TIMISOARA - 070000 - Delta Force 17713 RO119",
                date: "25-26 Ianuarie, 2024",
                location: "Arad, AR, Romania",
                rank: "Rank 16/16",
                wlt: "W-L-T: 1-5-0",
                awards: "",
                type: "league-meet",
            },
            {
                name: "RO TIMISOARA - 070000 - CSH 17861",
                date: "11-12 Ianuarie, 2024",
                location: "Timisoara, TM, Romania",
                rank: "Rank 16/16",
                wlt: "W-L-T: 1-5-0",
                awards: "",
                type: "league-meet",
            },
        ],
        powerplay: [
            {
                name: "RO NATIONAL CHAMPIONSHIP - FTC ROMANIA",
                date: "3-5 Martie 2023",
                location:
                    "Sala Polivalenta BUCURESTI - parcul TINERETULUI, Bucuresti, B, Romania",
                rank: "Rank 46/79",
                wlt: "W-L-T: 3-3-0",
                awards: "",
                type: "tournament",
                isChampionship: true,
            },
            {
                name: "RO BUCHAREST #1 - FTC Romania Qualifying Tournament",
                date: "13-15 Februarie 2023",
                location:
                    "Universitatea POLITEHNICA din BUCURESTI, Bucuresti, B, Romania",
                rank: "Rank 25/81",
                wlt: "W-L-T: 4-2-0",
                awards: "",
                type: "tournament",
                isImportant: true,
            },
        ],
    };

    $: {
        // Update events when season changes
        events = mockEvents[selectedSeason.id] || [
            {
                name: "Event Data Unavailable",
                date: "N/A",
                location: "N/A",
                rank: "",
                wlt: "",
                awards: "",
                type: "tournament",
            },
        ];

        // Scroll to top when events change
        if (typeof document !== "undefined") {
            const list = document.querySelector(".right-column");
            if (list) list.scrollTop = 0;
        }
    }

    function selectSeason(index) {
        $selectedSeasonIndex = index;
    }

    function scrollMenu(direction) {
        if (direction === "left") {
            if (menuStartIndex > 0) {
                menuStartIndex--;
            }
        } else {
            if (menuStartIndex < seasons.length - itemsPerPage) {
                menuStartIndex++;
            }
        }
    }

    function updateItemsPerPage() {
        itemsPerPage = 3;

        if (menuStartIndex > seasons.length - itemsPerPage) {
            menuStartIndex = Math.max(0, seasons.length - itemsPerPage);
        }
    }

    function formatNumbers(text) {
        if (!text) return "";
        return text.replace(
            /[0-9]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }

    $: {
        if ($selectedSeasonIndex !== undefined) {
            // Center the selected season
            const targetStart =
                $selectedSeasonIndex - Math.floor((itemsPerPage - 1) / 2);
            menuStartIndex = Math.max(
                0,
                Math.min(targetStart, seasons.length - itemsPerPage),
            );
        }
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
                <h1 class="page-title">EVENTS</h1>
                <h2 class="subtitle">
                    IN WHICH WE PARTICIPATED<br />OR WE HOSTED
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

            <!-- Season Menu (Moved to be under Nav) -->
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
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class="season-item {selectedSeason.id === season.id
                                ? 'active'
                                : ''}"
                            on:click={() => selectSeason(menuStartIndex + i)}
                            role="button"
                            tabindex="0"
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

        <!-- Right Column: Event Cards -->
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
                                <h3>{event.name}</h3>
                                {#if event.organizer}
                                    <span class="organizer-badge"
                                        >ORGANIZER</span
                                    >
                                {/if}
                            </div>
                            <p class="event-meta">
                                {@html formatNumbers(event.date)} | {@html formatNumbers(
                                    event.location,
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
        white-space: nowrap;
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

    /* Season Menu */
    .season-menu-container {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        border-radius: 1rem;
        gap: 1rem;
        backdrop-filter: blur(5px);
        max-width: 100%;
        width: auto;
        margin-top: 0; /* Handled by gap */
        direction: ltr; /* Ensure arrows are on correct sides */
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

    .season-item:hover {
        transform: scale(1.1);
        opacity: 1;
    }

    .season-item.active {
        opacity: 1;
        border: 2px solid #41dccc;
        background: rgba(65, 220, 204, 0.2);
    }

    .season-item img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
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

    .arrow-btn:hover:not(:disabled) {
        color: #41dccc;
    }

    .arrow-btn:disabled {
        color: rgba(255, 255, 255, 0.2);
        cursor: default;
    }

    /* Responsive Layouts */
    @media (max-width: 1024px) {
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

        .season-menu-container {
            order: 4; /* Season menu at bottom */
            margin-top: auto; /* Push to bottom */
            padding: 0 0.5rem; /* Adjusted padding */
            gap: 0.5rem; /* Reduced gap */
            height: 80px; /* Increased height for larger icons */
            min-height: 0;
            width: 100%; /* Full width */
            justify-content: space-between; /* Spread out */
            flex-direction: row; /* Force row */
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
            width: 60px; /* Larger items */
            height: 60px;
            padding: 2px;
        }

        .arrow-btn {
            font-size: 1.5rem;
            padding: 0 1rem; /* Adjusted padding */
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

        .season-menu-container {
            grid-area: season-menu; /* Changed from footer */
            margin-top: 0;
            align-self: end;
            justify-content: flex-start;
            width: 100%;
            max-width: none;
        }
    }
</style>
