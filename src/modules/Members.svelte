<script>
    export let title = "Members";
    import "../styles/main.css";

    import { onMount } from "svelte";

    let isMobile = false;
    let isExpanded = false;

    const fullText = `Our team is composed of dedicated students who are passionate about robotics, engineering, and innovation. Each member brings unique skills and perspectives, contributing to our collective success. Together, we learn, build, and grow, striving to make a positive impact in our community and beyond.`;

    function formatNumbers(text) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
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
    $: displayedText = showFullText ? fullText : fullText.slice(0, 100);
</script>

<div class="members-page">
    <div class="top-grid">
        <!-- Row 1: Subtitle (Right) -->
        <div class="subtitle-area">
            <h2 class="subtitle">MEET OUR</h2>
        </div>

        <!-- Row 2: Nav (Left) + Title (Right) -->
        <div class="nav-area">
            <nav class="nav-buttons local-nav">
                <div class="nav-row">
                    <a href="#home" class="btn">HOME</a>
                    <a href="#about" class="btn">ABOUT US</a>
                    <a href="#sponsors" class="btn">SPONSORS</a>
                </div>
                <div class="nav-row">
                    <a href="#members" class="btn selected">MEMBERS</a>
                    <a href="#events" class="btn">EVENTS</a>
                    <a href="#results" class="btn">RESULTS</a>
                </div>
                <div class="nav-row">
                    <a href="#gallery" class="btn">GALLERY</a>
                </div>
            </nav>
            <div class="map-container local-map">
                <a href="/map" class="btn btn-map">MAP</a>
            </div>
        </div>

        <div class="title-area">
            <h1 class="title">MEMBERS</h1>
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
        <div class="members-grid">
            <!-- 16 Placeholders -->
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>

            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>

            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
        </div>
        <div class="view-all-container">
            <a href="/members" class="btn view-all-btn">VIEW ALL MEMBERS</a>
        </div>
    </div>
</div>

<style>
    .members-page {
        display: flex;
        flex-direction: column;
        width: 98%;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: center;
        gap: 1rem;
    }

    @media (max-width: 768px) {
        .members-page {
            padding: 1rem;
        }
    }

    .top-grid {
        display: grid;
        grid-template-columns: 1fr max-content; /* Left is content, Right is nav */
        grid-template-rows: auto auto auto auto; /* Added extra row */
        column-gap: 2rem;
        row-gap: 0.5rem;
        width: 100%;
        justify-items: start; /* Align everything to the left side of their cells */
        align-items: start;
    }

    .subtitle-area {
        grid-column: 1;
        grid-row: 1; /* Moved up */
        text-align: left;
        width: 100%;
    }

    .nav-area {
        grid-column: 2;
        grid-row: 2 / span 3; /* Starts at Title row (now row 2) */
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
        padding-top: 0; /* Align top with subtitle */
        padding-left: 0;
        justify-self: end;
        width: fit-content;
        margin-left: auto;
    }

    .title-area {
        grid-column: 1;
        grid-row: 2; /* Moved up */
        text-align: left;
    }

    .text-area {
        grid-column: 1;
        grid-row: 3; /* Moved up */
        width: 100%;
    }

    .text-area .description {
        margin-top: 0.5rem;
    }

    .local-nav {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
        margin-top: 0;
        width: 100%;
        max-width: none; /* Remove constraint */
    }

    .nav-row {
        display: flex;
        gap: 0.5rem;
        width: 100%;
        justify-content: flex-end;
    }

    .local-nav .btn {
        direction: ltr;
        width: fit-content;
        flex: 0 0 auto;
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
        justify-content: flex-end;
        display: flex;
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
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
    }

    .view-all-container {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .view-all-btn {
        padding: 0.8rem 2rem;
        font-size: 1.2rem;
    }

    .members-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr); /* 5 items per row */
        gap: 1rem;
        width: 100%;
        max-width: 1400px; /* Constrain width at larger resolutions */
        margin: 0 auto; /* Center the grid */
    }

    /* First item centered on its own row */
    .member-card:nth-child(1) {
        grid-column: 3; /* Center in 5 columns */
        grid-row: 1;
    }

    /* Ensure 2nd item starts on the next row */
    .member-card:nth-child(2) {
        grid-row-start: 2;
        grid-column-start: 1; /* Explicitly start at beginning of row */
    }

    .member-card {
        background: rgba(
            0,
            0,
            0,
            0.4
        ); /* Darker background for active members */
        border-radius: 1rem;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 3/2;
        transition:
            transform 0.3s,
            background 0.3s;
    }

    .member-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
    }

    .member-placeholder {
        background: rgba(200, 200, 200, 0.2);
    }

    @media (max-width: 1200px) {
        .members-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (max-width: 768px) {
        .top-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Left align */
            text-align: left;
            margin-top: 4rem; /* Lower the title */
        }

        .subtitle-area,
        .title-area {
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            text-align: left; /* Left align */
            align-items: flex-start;
        }

        .title-area .title {
            direction: ltr;
            text-align: left;
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

        .description.clickable {
            cursor: pointer;
        }

        .members-grid {
            grid-template-columns: repeat(2, 1fr);
            max-height: 40vh; /* Limit height to allow scrolling */
            overflow-y: auto; /* Enable vertical scroll */
            padding-right: 0.5rem; /* Space for scrollbar */
        }

        /* Reset grid positioning for mobile */
        .member-card:nth-child(1),
        .member-card:nth-child(2) {
            grid-column: auto;
            grid-row: auto;
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
        .members-page {
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

        .members-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
        }

        .member-card {
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
