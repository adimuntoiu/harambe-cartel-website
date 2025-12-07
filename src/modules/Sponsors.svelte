<script>
    export let title = "Sponsors";
    import "../styles/main.css";

    import { onMount } from "svelte";

    let isMobile = false;
    let isExpanded = false;

    const fullText = `We are incredibly grateful to all our sponsors for your generous support in helping our FTC team reach the milestone of $20,000! Your belief in our mission and commitment to STEM education has made a tremendous impact on our journey. With your contributions, we've been able to purchase essential equipment, attend competitions, and continue inspiring innovation and teamwork. Thank you for investing in our future—we couldn't have reached this goal without you. We're excited to make the most of this opportunity and represent our community with pride!`;

    function formatNumbers(text) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g, // Include commas and $ for money
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth <= 768; // Matching the CSS media query
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    $: showFullText = !isMobile || isExpanded;
    $: displayedText = showFullText ? fullText : fullText.slice(0, 120);
</script>

<div class="sponsors-page">
    <div class="top-grid">
        <!-- Row 1: Subtitle (Right) -->
        <div class="subtitle-area">
            <h2 class="subtitle">THESE ARE OUR</h2>
        </div>

        <!-- Row 2: Nav (Left) + Title (Right) -->
        <div class="nav-area">
            <nav class="nav-buttons local-nav">
                <div class="nav-row">
                    <a href="#home" class="btn">HOME</a>
                    <a href="#about" class="btn">ABOUT US</a>
                    <a href="#sponsors" class="btn selected">SPONSORS</a>
                </div>
                <div class="nav-row">
                    <a href="#members" class="btn">MEMBERS</a>
                    <a href="#events" class="btn">EVENTS</a>
                    <a href="#results" class="btn">RESULTS</a>
                </div>
                <div class="nav-row">
                    <a href="#gallery" class="btn">GALLERY</a>
                </div>
            </nav>
            <div class="map-container local-map">
                <a href="#map" class="btn btn-map">MAP</a>
            </div>
        </div>

        <div class="title-area">
            <h1 class="title">SPONSORS</h1>
        </div>

        <!-- Row 3: Description (Right) -->
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
    </div>

    <div class="bottom-section">
        <div class="sponsors-grid {isExpanded ? 'shrunk' : ''}">
            <div class="sponsor-card">
                <img src="src/assets/sponsors/panduit.png" alt="Panduit" />
            </div>
            <div class="sponsor-card">
                <img
                    src="src/assets/sponsors/joyson.png"
                    alt="Joyson Safety Systems"
                />
            </div>
            <div class="sponsor-card">
                <img src="src/assets/sponsors/filip.png" alt="Filip" />
            </div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
        </div>
    </div>
</div>

<style>
    .sponsors-page {
        display: flex;
        flex-direction: column;
        width: 98%;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: center;
        gap: 1rem;
    }

    .top-grid {
        display: grid;
        grid-template-columns: min-content 1fr; /* Left is sized by content, Right takes remaining */
        grid-template-rows: auto auto auto;
        column-gap: 2rem;
        row-gap: 0.5rem;
        width: 100%;
        justify-items: end; /* Align everything to the right side of their cells */
        align-items: start; /* Prevent rows from stretching to fill height */
    }

    .subtitle-area {
        grid-column: 2;
        grid-row: 1;
        text-align: right;
        width: 100%;
    }

    .subtitle {
        font-size: clamp(1rem, 4vw, 3rem);
    }

    .nav-area {
        grid-column: 1;
        grid-row: 2 / span 2; /* Span across Title and Text rows */
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Align buttons to the left */
        gap: 1rem;
        padding-top: 1rem; /* Visual adjustment to align with large title text baseline/center if needed */
    }

    .title-area {
        grid-column: 2;
        grid-row: 2;
        text-align: right;
        /* The width of this element will define the column width */
    }

    .title {
        font-size: clamp(2rem, 8vw, 6.5rem);
    }

    .text-area {
        grid-column: 2;
        grid-row: 3;
        width: 100%;
    }

    .text-area .description {
        margin-top: 0; /* Override global 2rem margin */
        font-size: 1.5rem;
    }

    .local-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 0;
        width: 100%;
    }

    .nav-row {
        display: flex;
        gap: 0.5rem;
        width: 100%;
        justify-content: flex-start;
    }

    .local-nav .btn {
        direction: ltr;
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        white-space: nowrap;
        padding: 0.5rem 1rem;
        box-sizing: border-box;
    }

    .local-map {
        margin-top: 0;
        padding-right: 0;
        justify-content: flex-start;
        width: 100%;
    }

    .local-map .btn-map {
        width: 100%;
        box-sizing: border-box;
        text-align: center;
    }

    .bottom-section {
        width: 100%;
        margin-top: 0;
    }

    .sponsors-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 1rem;
        width: 100%;
    }

    .sponsor-card {
        background: rgba(
            0,
            0,
            0,
            0.4
        ); /* Darker background for active sponsors */
        border-radius: 1rem;
        padding: 0.5rem; /* Reduced padding to make images bigger */
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 3/2;
        transition:
            transform 0.3s,
            background 0.3s;
    }

    .sponsor-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
    }

    .sponsor-card img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .sponsor-placeholder {
        background: rgba(200, 200, 200, 0.2);
    }

    @media (max-width: 1200px) {
        .sponsors-grid {
            grid-template-columns: repeat(4, 1fr);
        }

        .text-area .description {
            font-size: 0.9rem; /* Smaller text for smaller resolutions */
        }
    }

    @media (max-width: 768px) {
        .top-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-end; /* Right align */
            text-align: right;
            margin-top: 4rem; /* Lower the title */
        }

        .subtitle-area,
        .title-area {
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            text-align: right; /* Right align */
            align-items: flex-end;
        }

        .text-area {
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            text-align: left; /* Keep text left aligned */
            align-items: flex-start;
        }

        .nav-area {
            display: none; /* Hide navigation on mobile */
        }

        .subtitle-area {
            order: 1;
        }
        .title-area {
            order: 2;
        }
        .text-area {
            order: 3;
        }

        .sponsors-grid {
            grid-template-columns: repeat(2, 1fr);
            max-height: 50vh; /* Limit height to show ~6 items (approx 3 rows) */
            overflow-y: auto; /* Enable vertical scrolling */
            padding-right: 5px; /* Space for scrollbar */
            transition: max-height 0.3s ease; /* Smooth transition */
        }

        .sponsors-grid.shrunk {
            max-height: 25vh; /* Smaller height when text is expanded */
        }

        /* Custom Scrollbar for Sponsors Grid */
        .sponsors-grid::-webkit-scrollbar {
            width: 6px;
        }
        .sponsors-grid::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
        }
        .sponsors-grid::-webkit-scrollbar-thumb {
            background: #41dccc;
            border-radius: 3px;
        }

        .description.clickable {
            cursor: pointer;
        }

        .local-nav {
            flex-direction: row;
            flex-wrap: wrap;
        }

        .local-map {
            justify-content: center;
        }
    }

    @media (max-height: 850px) and (min-width: 768px) {
        .sponsors-page {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 1rem 4rem;
            gap: 4rem;
        }

        .top-grid {
            width: 40%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-end;
            justify-items: end;
        }

        .subtitle-area,
        .title-area,
        .text-area,
        .nav-area {
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            text-align: right;
        }

        .nav-area {
            align-items: flex-end;
            margin-top: 1rem;
        }

        .local-nav {
            justify-content: flex-end;
        }

        .bottom-section {
            width: 50%;
            margin-top: 0;
        }

        .sponsors-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
        }

        .sponsor-card {
            padding: 0.25rem;
        }

        .text-area .description {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 0.8rem; /* Smaller font */
        }

        .title-area .title {
            font-size: 2rem; /* Smaller title */
        }
    }
</style>
