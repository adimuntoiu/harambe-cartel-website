<script>
    import "../styles/main.css";
    import { onMount } from "svelte";
    import Navigation from "$lib/components/Navigation.svelte";

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

    // Fixed layout: first 6 images
    let visibleImages = images.slice(0, 6);

    let leftContentHeight;

    function formatNumbers(text) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }
</script>

<div class="gallery-container">
    <div class="top-section">
        <!-- Left Column: Content -->
        <div class="left-column">
            <div
                class="left-content-wrapper"
                bind:clientHeight={leftContentHeight}
            >
                <div class="title-group">
                    <h1 class="page-title">GALLERY</h1>
                    <h2 class="subtitle">CAPTURING OUR JOURNEY</h2>
                </div>

                <div class="text-area">
                    <p class="description">
                        {@html formatNumbers(`Explore the moments that define us. From intense
                        competitions to late-night build sessions, our gallery
                        showcases the dedication, teamwork, and spirit of our
                        robotics family.`)}
                    </p>
                </div>

                <div class="nav-area">
                    <Navigation activeSection="gallery" />
                </div>
            </div>
        </div>

        <!-- Right Column: Image Grid -->
        <div class="right-column">
            <div
                class="right-content-wrapper"
                style="height: {leftContentHeight
                    ? `${leftContentHeight * 1.3}px`
                    : 'auto'}"
            >
                <div class="image-grid">
                    {#each visibleImages as image}
                        <div class="gallery-item">
                            <img
                                src={image.src}
                                alt={image.name}
                                loading="lazy"
                            />
                        </div>
                    {/each}
                </div>

                <a href="/gallery" class="view-all-btn btn">
                    <span>VIEW ALL IMAGES</span>
                </a>
            </div>
        </div>
    </div>
</div>

<style>
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

    /* Left Column */
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

    .left-content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .subtitle {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(1rem, 2vw, 1.5rem);
        color: #636363;
        margin: 0;
        line-height: 1.2;
    }

    .page-title {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(3rem, 5vw, 4rem);
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
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 5s linear infinite;
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
    }

    /* Nav Area */
    .nav-area {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        align-items: flex-start;
    }

    /* Right Column */
    .right-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center; /* Center vertically */
        border-radius: 1rem;
        gap: 1rem;
    }

    .right-content-wrapper {
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

    /* Responsive */
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

        .title-group,
        .text-area,
        .nav-area {
            align-items: center;
            text-align: center;
        }

        .right-column {
            width: 100%;
            height: auto;
        }

        .right-content-wrapper {
            height: auto !important; /* Reset height on mobile */
        }

        .image-grid {
            min-height: 400px; /* Min height for mobile */
            max-width: 100%;
        }

        .view-all-btn {
            align-self: center;
            width: 100%;
        }
    }
</style>
