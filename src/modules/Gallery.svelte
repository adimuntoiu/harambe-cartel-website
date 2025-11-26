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

    // Layout Logic
    let rightColumn;
    let containerWidth;
    let containerHeight;
    let visibleImages = [];
    let showViewAll = false;

    function updateLayout() {
        if (!rightColumn) return;

        const width = rightColumn.clientWidth;
        const height = rightColumn.clientHeight;

        // Grid configuration
        const gap = 16; // 1rem

        // Determine columns based on window width to match CSS media queries
        // > 1024px = 3 columns
        // <= 1024px = 2 columns
        const cols = window.innerWidth <= 1024 ? 2 : 3;

        const actualItemWidth = (width - (cols - 1) * gap) / cols;
        const itemHeightRatio = 9 / 16; // 16:9 aspect ratio
        const itemHeight = actualItemWidth * itemHeightRatio;

        const rows = Math.floor((height + gap) / (itemHeight + gap));

        const maxItems = Math.max(0, cols * rows);

        if (images.length > maxItems) {
            visibleImages = images.slice(0, maxItems);
            showViewAll = true;
        } else {
            visibleImages = images;
            showViewAll = false;
        }
    }

    onMount(() => {
        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    });
</script>

<div class="gallery-container">
    <div class="top-section">
        <!-- Left Column: Content -->
        <div class="left-column">
            <div class="title-group">
                <h1 class="page-title">GALLERY</h1>
                <h2 class="subtitle">CAPTURING OUR JOURNEY</h2>
            </div>

            <div class="text-area">
                <p class="description">
                    Explore the moments that define us. From intense
                    competitions to late-night build sessions, our gallery
                    showcases the dedication, teamwork, and spirit of our
                    robotics family.
                </p>
            </div>

            <div class="nav-area">
                <nav class="nav-buttons local-nav">
                    <a href="#home" class="btn">HOME</a>
                    <a href="#about" class="btn">ABOUT US</a>
                    <a href="#sponsors" class="btn">SPONSORS</a>
                    <a href="#results" class="btn">RESULTS</a>
                    <a href="#events" class="btn">EVENTS</a>
                    <a href="#gallery" class="btn selected">GALLERY</a>
                    <a href="#members" class="btn">MEMBERS</a>
                </nav>
                <div class="map-container local-map">
                    <a href="#map" class="btn btn-map">MAP</a>
                </div>
            </div>
        </div>

        <!-- Right Column: Image Grid -->
        <div
            class="right-column"
            bind:this={rightColumn}
            bind:clientWidth={containerWidth}
            bind:clientHeight={containerHeight}
        >
            <div class="image-grid">
                {#each visibleImages as image}
                    <div class="gallery-item">
                        <img src={image.src} alt={image.name} loading="lazy" />
                    </div>
                {/each}
            </div>

            {#if showViewAll}
                <a href="/gallery-view" class="view-all-btn">
                    <span>VIEW ALL IMAGES</span>
                </a>
            {/if}
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

    .local-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        direction: ltr;
        justify-content: flex-start;
    }

    .local-map {
        margin-top: 0;
        padding-right: 0;
        justify-content: flex-start;
        width: 100%;
        direction: ltr;
    }

    /* Right Column */
    .right-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden; /* Hide overflow */
        height: 100%;
        border-radius: 1rem;
    }

    .image-grid {
        display: grid;
        /* Default to 3 columns for larger screens */
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        width: 100%;
        height: 100%;
        align-content: start;
    }

    .gallery-item {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        overflow: hidden;
        aspect-ratio: 16/9;
        transition: transform 0.2s;
    }

    .gallery-item:hover {
        transform: scale(1.02);
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .view-all-btn {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.8);
        border: 1px solid #41dccc;
        color: #41dccc;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-family: "Pirulen", sans-serif;
        text-decoration: none;
        transition: all 0.3s;
        backdrop-filter: blur(5px);
        z-index: 10;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .view-all-btn:hover {
        background: rgba(65, 220, 204, 0.2);
        box-shadow: 0 0 20px rgba(65, 220, 204, 0.4);
        transform: translateY(-2px);
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

        .local-nav {
            justify-content: center;
        }

        .right-column {
            width: 100%;
            height: 500px; /* Fixed height for mobile scroll */
        }

        /* On mobile, maybe 2 columns is still good, or 1? 
           User asked for 2 photos per row for smaller resolutions. */
        .image-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
