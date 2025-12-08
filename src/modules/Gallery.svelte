<script>
    import "../styles/main.css";
    import { onMount } from "svelte";

    // Import all images
    const imageModules = import.meta.glob(
        "/src/assets/gallery images/*.{jpg,jpeg,png,webp,gif}",
        { eager: true, query: "?url", import: "default" },
    );

    let images = Object.entries(imageModules)
        .map(([path, src]) => {
            return {
                name: path.split("/").pop(),
                src: src,
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    // Reactive layout: first 6 images normally, 4 if expanded on mobile
    $: visibleImages =
        isMobile && isExpanded ? images.slice(0, 4) : images.slice(0, 6);

    let contentHeight;

    function formatNumbers(text) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }

    let isMobile = false;
    let isExpanded = false;

    const fullText = `Explore the moments that define us. From intense competitions to late-night build sessions, our gallery showcases the dedication, teamwork, and spirit of our robotics family.`;

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth <= 768;
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    $: showFullText = !isMobile || isExpanded;
    $: displayedText = showFullText ? fullText : fullText.slice(0, 100);
</script>

<div class="gallery-container">
    <div class="top-section">
        <!-- Left Column: Image Grid -->
        <div class="image-column">
            <div
                class="image-content-wrapper"
                style="height: {contentHeight
                    ? `${contentHeight * 0.9}px`
                    : 'auto'}"
            >
                <div class="image-grid">
                    {#each visibleImages as image}
                        <div class="gallery-item">
                            <a
                                href={image.src}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={image.src}
                                    alt={image.name}
                                    loading="lazy"
                                />
                            </a>
                        </div>
                    {/each}
                </div>

                <a href="/gallery" class="view-all-btn btn desktop-only">
                    <span>VIEW ALL IMAGES</span>
                </a>
            </div>
        </div>

        <!-- Right Column: Content -->
        <div class="content-column">
            <div class="content-wrapper" bind:clientHeight={contentHeight}>
                <div class="trying-height-centering">
                    <div class="title-group">
                        <h1 class="page-title">GALLERY</h1>
                        <h2 class="subtitle">CAPTURING OUR JOURNEY</h2>
                    </div>

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
                        <a href="/gallery" class="view-all-btn btn mobile-only">
                            <span>VIEW ALL IMAGES</span>
                        </a>
                    </div>

                    <div class="nav-area">
                        <nav class="nav-buttons">
                            <a href="#home" class="btn">HOME</a>
                            <a href="#about" class="btn">ABOUT US</a>
                            <a href="#sponsors" class="btn">SPONSORS</a>
                            <a href="#members" class="btn">MEMBERS</a>
                            <a href="#events" class="btn">EVENTS</a>
                            <a href="#results" class="btn">RESULTS</a>
                            <a href="#gallery" class="btn selected">GALLERY</a>
                        </nav>
                        <div class="map-container">
                            <a href="#map" class="btn btn-map">MAP</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .trying-height-centering {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end; /* Maintain right alignment matching design */
        height: 100%;
        width: 100%;
        gap: 1rem; /* Added space between title and description */
    }
    .gallery-container {
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
        height: 100%;
        gap: 2rem;
        overflow: hidden;
    }

    /* Content Column (Right) */
    .content-column {
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* Align right */
        width: 40%;
        min-width: 400px;
        height: 100%;
        justify-content: center;
        gap: 2rem;
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        height: 100%; /* Ensure it fills the column */
        align-items: flex-end; /* Align right */
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* Align right */
        text-align: right;
    }

    .subtitle {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(1.2rem, 2vw, 2.5rem); /* Increased size */
        color: #636363;
        margin: 0;
        line-height: 1.2;
    }

    .page-title {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(5rem, 6vw, 8rem); /* Increased size significantly */
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
            font-size: 10rem;
        }

        .content-column {
            justify-content: center;
        }

        .content-wrapper {
            margin-top: auto;
            margin-bottom: auto;
        }
    }

    .text-area {
        width: 100%;
        margin-top: 0;
        text-align: right; /* Align text right? Or Justify? Keeping justify but maybe RTL direction? No, just justify. */
    }

    .description {
        font-family: "Coco Gothic", sans-serif;
        font-size: clamp(1.2rem, 1.4vw, 1.6rem); /* Increased size */
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
        width: 100%;
        align-items: flex-end; /* Align right */
    }

    .nav-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 0.5rem;
        max-width: 420px; /* Precise width to fit 3 items (316px) but wrap 4th (426px) */
        direction: ltr;
    }

    .nav-buttons .btn {
        width: auto;
        flex-grow: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        white-space: nowrap;
        padding: 0.5rem 1rem;
    }

    .map-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .btn-map {
        width: 100%; /* Make map button as big as the div */
        text-align: center;
    }

    /* Image Column (Left) */
    .image-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center; /* Center vertically */
        border-radius: 1rem;
        gap: 1rem;
    }

    .image-content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        /* Height is set dynamically via inline style */
    }

    .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr); /* Distribute height equally */
        gap: 1rem;
        width: 85%; /* Reduced width for desktop */
        margin: 0 auto;
        flex: 1; /* Fill available height in wrapper */
    }

    .gallery-item {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        overflow: hidden;
        position: relative;
        transition: transform 0.2s;
        /* No fixed aspect-ratio, relies on grid row height */
    }

    /* Brick Layout Logic */
    /* Row 1: Wide, Narrow */
    .gallery-item:nth-child(1) {
        grid-column: span 2;
    }
    .gallery-item:nth-child(2) {
        grid-column: span 1;
    }

    /* Row 2: Narrow, Wide */
    .gallery-item:nth-child(3) {
        grid-column: span 1;
    }
    .gallery-item:nth-child(4) {
        grid-column: span 2;
    }

    /* Row 3: Wide, Narrow */
    .gallery-item:nth-child(5) {
        grid-column: span 2;
    }
    .gallery-item:nth-child(6) {
        grid-column: span 1;
    }

    .gallery-item:hover {
        transform: scale(1.02);
        z-index: 1;
    }

    .gallery-item img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .view-all-btn {
        /* Inherits .btn styles */
        width: fit-content;
        align-self: center; /* Center button */
        margin-top: 1rem;
    }

    .mobile-only {
        display: none;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .gallery-container {
            padding: 1rem;
            justify-content: flex-start; /* Move content higher (top aligned) */
        }

        .top-section {
            flex-direction: column-reverse;
            align-items: flex-start; /* Left align */
            overflow: visible;
            gap: 1rem; /* Add some gap between text and images */
            justify-content: flex-start; /* Move content higher */
        }

        .content-column {
            width: 100%;
            align-items: center;
            min-width: 0;
            justify-content: flex-start;
            gap: 0; /* Remove gap */
            margin-bottom: 1rem; /* Small margin before images if needed, or 0 */
        }

        .content-wrapper {
            align-items: center;
        }

        .title-group {
            align-items: flex-end; /* Right align */
            text-align: right;
            margin-top: 1rem; /* Reduced from 8rem to move title higher */
            width: 100%;
        }

        .page-title {
            direction: ltr;
            text-align: right;
            font-size: 2.5rem; /* Reduced from 3.5rem */
        }

        .subtitle {
            text-align: right;
            font-size: 1rem; /* Reduced from 1.3rem */
        }

        .text-area {
            align-items: center;
            text-align: justify; /* Keep text justified */
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        .nav-area {
            display: none; /* Hide nav */
        }

        .description {
            direction: ltr;
            text-align: justify;
            font-size: 1rem; /* Added/Explicitly reduced */
        }

        .description.clickable {
            cursor: pointer;
        }

        .image-column {
            width: 100%;
            height: auto;
        }

        .image-content-wrapper {
            height: auto !important; /* Reset height on mobile */
        }

        .image-grid {
            min-height: 400px; /* Min height for mobile */
            max-width: 100%;
        }

        .desktop-only {
            display: none;
        }

        .mobile-only {
            display: flex;
            align-self: center; /* Center button */
            width: 100%; /* Make button bigger (full width) */
            justify-content: center;
            margin-top: 1rem;
            padding: 1rem; /* Bigger button */
            font-size: 1.2rem; /* Bigger text */
            margin-bottom: 0; /* Remove space below button */
        }
    }
</style>
