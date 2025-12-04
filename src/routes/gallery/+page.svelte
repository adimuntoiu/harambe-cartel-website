<script>
    import "../../styles/main.css";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";

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
</script>

<video
    class="background-video"
    autoplay
    muted
    loop
    playsinline
    poster="/src/assets/background_poster.png"
>
    <source src="/src/assets/background_lines.mp4" type="video/mp4" />
</video>

<BackgroundSplashes />

<div class="full-gallery-container">
    <!-- Top Section: Title (Left) and Navigation (Right) -->
    <div class="header-grid">
        <!-- Left Column: Title and Subtitle -->
        <div class="title-column">
            <div class="subtitle-area">
                <h2 class="subtitle">ALL CAPTURED MOMENTS</h2>
            </div>
            <div class="title-area">
                <h1 class="page-title">FULL GALLERY</h1>
            </div>
        </div>

        <!-- Right Column: Navigation -->
        <div class="nav-column">
            <nav class="nav-buttons local-nav">
                <a href="/#home" class="btn">HOME</a>
                <a href="/#about" class="btn">ABOUT US</a>
                <a href="/#sponsors" class="btn">SPONSORS</a>
                <a href="/#members" class="btn">MEMBERS</a>
                <a href="/#events" class="btn">EVENTS</a>
                <a href="/#results" class="btn">RESULTS</a>
                <a href="/#gallery" class="btn selected">GALLERY</a>
            </nav>
            <div class="map-container local-map">
                <a href="/#map" class="btn btn-map">MAP</a>
            </div>
        </div>
    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid">
        {#each images as image}
            <div class="gallery-item">
                <a href={image.src} target="_blank" rel="noopener noreferrer">
                    <img src={image.src} alt={image.name} loading="lazy" />
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    .full-gallery-container {
        min-height: 100vh;
        padding: 2rem;
        color: white;
        font-family: "Coco Gothic", sans-serif;
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
    }

    .header-grid {
        display: grid;
        grid-template-columns: 1fr max-content; /* Left takes available space, Right is sized by content */
        width: 100%;
        max-width: 1600px;
        gap: 2rem;
        align-items: start;
    }

    /* Left Column: Title/Subtitle */
    .title-column {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Align Left */
        text-align: left;
        gap: 0.5rem;
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

    /* Right Column: Navigation */
    .nav-column {
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* Align Right */
        gap: 1rem;
    }

    .local-nav {
        display: grid;
        grid-template-columns: repeat(3, max-content);
        justify-content: end;
        gap: 0.5rem;
        width: 100%;
    }

    .local-nav .btn {
        direction: ltr;
        width: auto;
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

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        width: 100%;
        max-width: 1600px;
    }

    .gallery-item {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        overflow: hidden;
        position: relative;
        aspect-ratio: 16/9;
        transition: transform 0.2s;
    }

    .gallery-item:hover {
        transform: scale(1.02);
        z-index: 1;
        box-shadow: 0 0 20px rgba(65, 220, 204, 0.2);
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }

    .gallery-item:hover img {
        transform: scale(1.1);
    }

    @media (max-width: 1024px) {
        .header-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            justify-items: center;
            text-align: center;
        }

        .title-column {
            align-items: center;
            text-align: center;
            order: 1;
        }

        .nav-column {
            align-items: center;
            order: 2;
            width: 100%;
        }

        .local-nav {
            justify-content: center;
        }

        .local-map {
            justify-content: center;
        }
    }

    @media (max-width: 768px) {
        .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
    }
</style>
