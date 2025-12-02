<script>
    export let title = "Results";
    import "../styles/main.css";
    import { onMount } from "svelte";

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

    let selectedSeasonIndex = 8; // Default to INTO THE DEEP
    let menuStartIndex = 0;
    let itemsPerPage = 4;
    let menuContainerWidth;

    $: selectedSeason = seasons[selectedSeasonIndex];
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
    $: robotImage = isCenterStage
        ? "src/assets/robots/geicu.png"
        : "src/assets/robots/fuego.png";
    $: descriptionText = isCenterStage ? "hello world" : defaultDescription;

    function selectSeason(index) {
        selectedSeasonIndex = index;
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
        if (menuContainerWidth) {
            const itemWidth = 100;
            const availableWidth = menuContainerWidth - 100;
            const calculatedItems = Math.floor(availableWidth / itemWidth);
            itemsPerPage = Math.max(
                3,
                Math.min(calculatedItems, seasons.length),
            );

            if (menuStartIndex > seasons.length - itemsPerPage) {
                menuStartIndex = Math.max(0, seasons.length - itemsPerPage);
            }
        }
    }

    function formatNumbers(text) {
        if (!text) return "";
        return text.replace(
            /[0-9]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }

    onMount(() => {
        updateItemsPerPage();
        window.addEventListener("resize", updateItemsPerPage);

        if (selectedSeasonIndex > itemsPerPage - 1) {
            menuStartIndex = Math.min(
                selectedSeasonIndex - itemsPerPage + 2,
                seasons.length - itemsPerPage,
            );
        }

        return () => {
            window.removeEventListener("resize", updateItemsPerPage);
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
                <p class="description">
                    {@html formatNumbers(descriptionText)}
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
                />
            </div>
        </div>
    </div>

    <!-- Season Menu (Footer) -->
    <div class="footer">
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

<style>
    .results-container {
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
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        flex: 1;
        gap: 2rem;
    }

    /* Left Column */
    .left-column {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        /* Use intrinsic width to constrain text to title width */
        width: min-content;
        min-width: 40%; /* Ensure it doesn't get too small */
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        white-space: nowrap; /* Prevent title from wrapping */
    }

    .season-name {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(1.5rem, 3vw, 2.5rem);
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
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 5s linear infinite;
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
        align-items: flex-end; /* Align content to right */
        flex: 1;
        gap: 2rem;
    }

    .season-logo-large {
        /* Parallel to title */
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

    /* Footer / Season Menu */
    .footer {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 100%;
        margin-top: auto;
    }

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

    @media (max-width: 1024px) {
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

        .footer {
            grid-area: footer;
            margin-top: 0;
            align-self: end;
            justify-content: flex-end;
            width: 100%;
        }

        .season-menu-container {
            width: 100%; /* Take full width of the grid cell */
            max-width: none;
        }
    }
</style>
