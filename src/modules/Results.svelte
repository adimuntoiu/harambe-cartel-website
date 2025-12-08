<script>
    export let title = "Results";
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

    $: selectedSeason = seasons[$selectedSeasonIndex];
    $: visibleSeasons = seasons.slice(
        menuStartIndex,
        menuStartIndex + itemsPerPage,
    );

    let defaultDescription = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Pretium
                    tellus duis convallis tempus leo eu aenean. Iaculis massa nisl
                    malesuada lacinia integer nunc posuere. Conubia nostra inceptos
                    himenaeos orci varius natoque penatibus. Nulla molestie mattis
                    scelerisque maximus eget fermentum odio. Blandit quis suspendisse
                    aliquet nisi sodales consequat magna. Ligula congue sollicitudin
                    erat viverra ac tincidunt nam. Velit aliquam imperdiet mollis
                    nullam volutpat porttitor ullamcorper. Dui felis venenatis
                    ultrices proin libero feugiat tristique. Cubilia curae hac
                    habitasse platea dictumst lorem ipsum. Sem placerat in id cursus
                    mi pretium tellus. Fringilla lacus nec metus bibendum egestas
                    iaculis massa. Taciti sociosqu ad litora torquent per conubia
                    nostra. Ridiculus mus donec rhoncus eros lobortis nulla
                    molestie. Mauris pharetra vestibulum fusce dictum risus blandit
                    quis.`;

    $: isCenterStage = selectedSeason.id === "centerstage";
    $: isFreightFrenzy = selectedSeason.id === "freightfrenzy";
    $: isSkystone = selectedSeason.id === "skystone";
    $: isIntoTheDeep = selectedSeason.id === "intothedeep";

    $: robotImage = isCenterStage
        ? "src/assets/robots/geicu.png"
        : isFreightFrenzy
          ? "src/assets/robots/freight.png"
          : isSkystone
            ? "src/assets/robots/skystone.png"
            : isIntoTheDeep
              ? "src/assets/robots/fuego.png"
              : "src/assets/placeholder.svg";

    $: descriptionText = isCenterStage ? "hello world" : defaultDescription;
    $: showFullText = !isMobile || isExpanded;
    $: displayedText = showFullText
        ? descriptionText
        : descriptionText.slice(0, 120);

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
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);

        return () => {
            window.removeEventListener("resize", updateItemsPerPage);
            window.removeEventListener("resize", checkMobile);
        };
    });
</script>

<div class="results-container">
    <div class="top-section">
        <!-- Left Column: Content (Title, Text, Nav) -->
        <div class="left-column">
            <!-- Title Group -->
            <div class="title-group">
                <h2 class="season-name">{selectedSeason.name}</h2>
                <h1 class="page-title">RESULTS</h1>
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
                <a href="#events" class="btn btn-map see-more-btn"
                    >SEE MORE IN EVENTS</a
                >
            </div>

            <!-- Navigation Buttons -->
            <div class="nav-area">
                <nav class="nav-buttons local-nav">
                    <a href="#home" class="btn">HOME</a>
                    <a href="#about" class="btn">ABOUT US</a>
                    <a href="#sponsors" class="btn">SPONSORS</a>
                    <a href="#members" class="btn">MEMBERS</a>
                    <a href="#events" class="btn">EVENTS</a>
                    <a href="#results" class="btn selected">RESULTS</a>
                    <a href="#gallery" class="btn">GALLERY</a>
                </nav>
                <div class="map-container local-map">
                    <a href="#map" class="btn btn-map">MAP</a>
                </div>
            </div>
        </div>

        <!-- Right Column: Visuals (Logo, Photo) -->
        <div class="right-column">
            <div class="season-logo-large">
                <img src={selectedSeason.logo} alt={selectedSeason.name} />
            </div>
            <div class="photo-placeholder">
                <img
                    src={robotImage}
                    alt="Robot"
                    class:center-stage-img={isCenterStage}
                    class:freight-frenzy-img={isFreightFrenzy}
                    class:shrunk={isExpanded}
                />
            </div>
            <!-- Season Menu -->
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
    </div>

    <!-- Season Menu (Footer) -->
</div>

<style>
    .results-container {
        display: grid;
        grid-template-columns: 40% 1fr;
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

    /* Left Column */
    .left-column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        padding-top: 5vh;
        overflow-y: auto;
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        white-space: nowrap; /* Prevent title from wrapping */
    }

    .season-name {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(0.8rem, 1.5vw, 1.8rem);
        color: #636363;
        margin: 0;
        line-height: 1.2;
    }

    .page-title {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(3rem, 5vw, 4rem); /* Reduced max size */
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

    @media (min-width: 1920px) {
        .page-title {
            font-size: 8rem;
        }
    }

    /* Text Area */
    .text-area {
        width: 100%;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .see-more-btn {
        display: inline-block;
        /* Inherits styles from btn and btn-map */
        text-decoration: none;
        align-self: flex-start;
        margin-top: 1rem;
        /* Override btn-map padding/size if needed, but user said "look like similar" */
        font-size: 1rem !important; /* Reset size from btn-map if too big */
        padding: 0.5rem 1rem !important; /* Reset padding */
        width: auto !important; /* Reset width */
    }

    .see-more-btn:hover {
        background: rgba(65, 220, 204, 0.2);
        transform: translateY(-2px);
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
        margin-top: 2rem;
        width: 100%;
        align-items: flex-start; /* Align to left side */
    }

    .local-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0;
        direction: ltr; /* Buttons go from left to right */
        justify-content: flex-start;
    }

    .local-nav .btn {
        direction: ltr; /* Reset text direction inside buttons */
    }

    .local-map {
        margin-top: 0;
        padding-right: 0;
        justify-content: flex-start; /* Align map button to left */
        width: 100%;
        direction: ltr;
    }

    /* Right Column */
    .right-column {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        gap: 1rem;
        /* overflow: hidden; Removed to prevent cropping */
    }

    .season-logo-large {
        margin-top: 2rem;
    }

    .season-logo-large img {
        height: clamp(80px, 12vw, 150px); /* Smaller logo */
        width: auto;
        object-fit: contain;
    }

    .photo-placeholder {
        transform: scaleX(
            -1
        ); /* Flip container so image animation coordinates work naturally */
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%; /* Ensure it takes full width to center content */
    }

    .photo-placeholder img {
        max-width: 100%;
        max-height: 60vh;
        object-fit: contain;

        /* Animation from Home page */
        transform: scale(1.1) rotate(0deg);
        transition: transform 1s;
        transform-origin: center center;
        overflow: visible;
    }

    .photo-placeholder img:hover {
        transform: scale(1.6) rotate(-10deg);
        transition: 1s;
    }

    /* Bigger dimensions for Center Stage */
    .photo-placeholder img.center-stage-img {
        max-height: 75vh; /* Increased from 60vh */
        transform: scale(1.2) rotate(0deg); /* Start slightly bigger */
    }

    .photo-placeholder img.center-stage-img:hover {
        transform: scale(1.7) rotate(-10deg); /* Hover bigger too */
    }

    /* Smaller dimensions for Freight Frenzy */
    .photo-placeholder img.freight-frenzy-img {
        max-height: 40vh; /* Reduced from 50vh */
        transform: scale(0.8) rotate(0deg); /* Reduced from 0.9 */
    }

    .photo-placeholder img.freight-frenzy-img:hover {
        transform: scale(1.3) rotate(-10deg);
    }

    /* Footer / Season Menu */

    /* Season Menu */
    .season-menu-container {
        /* Force Reflow */
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        border-radius: 1rem;
        gap: 1rem;
        backdrop-filter: blur(5px);
        max-width: 100%;
        width: 100%; /* Ensure full width so arrows go to edges */
        margin-top: 0; /* Handled by gap */
        direction: ltr; /* Ensure arrows are on correct sides */
        position: relative; /* For absolute positioning of arrows */
        justify-content: center; /* Center the season items */
        box-sizing: border-box;
    }

    .season-menu {
        display: flex;
        gap: 1rem;
        overflow: hidden;
    }

    .season-item {
        width: 60px !important;
        height: 60px !important;
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
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 1rem;
        transition: color 0.2s;
        position: absolute; /* Take out of flow to push to edges */
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
    }

    .arrow-btn.left {
        left: 0;
    }

    .arrow-btn.right {
        right: 0;
    }

    .arrow-btn:hover:not(:disabled) {
        color: #41dccc;
    }

    .arrow-btn:disabled {
        color: rgba(255, 255, 255, 0.2);
        cursor: default;
    }

    @media (max-width: 768px) {
        .results-container {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            height: auto;
            min-height: 100vh;
        }

        .top-section {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .left-column {
            width: 100%;
            height: auto;
            align-items: flex-start;
            padding-top: 1rem;
            overflow: visible;
        }

        .title-group {
            align-items: flex-start; /* Left align */
        }

        .text-area {
            text-align: left; /* Left align */
            align-items: flex-start;
        }

        .description {
            text-align: left;
        }

        .description.clickable {
            cursor: pointer;
        }

        .nav-area {
            display: none; /* Hide nav */
        }

        .right-column {
            align-items: center;
            width: 100%;
            height: auto;
            margin-top: 1rem;
        }

        .season-logo-large {
            display: none; /* Hide logo */
        }

        .footer {
            justify-content: center;
        }

        .season-menu-container {
            padding: 0.5rem;
            gap: 0.5rem;
            justify-content: space-between;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            width: 100%;
        }
        .season-menu {
            order: 2;
        }

        .season-menu-container {
            width: 100%;
            max-width: 100%;
        }

        /* Removed distributed seasons logic */

        .season-item {
            width: 60px;
            height: 60px;
        }

        .arrow-btn {
            padding: 0 0.5rem;
            height: auto;
            display: flex;
            align-items: center;
            margin: 0;
        }

        .arrow-btn.left {
            order: 1;
        }

        .arrow-btn.right {
            order: 3;
        }

        .photo-placeholder img.shrunk {
            max-height: 10vh;
            transition: max-height 0.3s ease;
        }
    }

    @media (max-width: 1024px) and (min-width: 769px) {
        .top-section {
            flex-direction: column;
            align-items: center;
        }

        .left-column {
            width: 100%;
            align-items: center;
        }

        .title-group {
            align-items: center;
        }

        .text-area {
            text-align: center;
        }

        .nav-area {
            align-items: center;
        }

        .local-nav {
            justify-content: center;
            direction: ltr;
        }

        .right-column {
            align-items: center;
            width: 100%;
        }

        .footer {
            justify-content: center;
        }
    }

    @media (max-height: 850px) and (min-width: 1025px) {
        .results-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto 1fr;
            grid-template-areas:
                "title logo"
                "text robot"
                "nav footer";
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
            align-items: flex-start; /* Nav on left */
            align-self: end;
        }

        .local-nav {
            justify-content: flex-start; /* Nav buttons align left */
        }

        .season-logo-large {
            grid-area: logo;
            margin-top: 0;
            justify-self: end;
        }

        .season-logo-large img {
            height: 60px;
        }

        .photo-placeholder {
            grid-area: robot;
            justify-self: end;
            width: auto;
        }

        .photo-placeholder img {
            max-height: 40vh;
        }

        .photo-placeholder img.center-stage-img {
            max-height: 50vh;
        }

        .photo-placeholder img.freight-frenzy-img {
            max-height: 35vh;
        }

        .season-menu-container {
            width: 100%; /* Take full width of the grid cell */
            max-width: none;
        }
    }
</style>
