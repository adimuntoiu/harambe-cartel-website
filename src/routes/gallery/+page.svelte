<script>
    import "../../styles/main.css";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";
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
    <!-- Top Section: Title and Navigation -->
    <div class="header-section">
        <div class="title-group">
            <h1 class="page-title">FULL GALLERY</h1>
            <h2 class="subtitle">ALL CAPTURED MOMENTS</h2>
        </div>

        <div class="nav-wrapper">
            <Navigation activeSection="gallery" />
        </div>
    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid">
        {#each images as image}
            <div class="gallery-item">
                <img src={image.src} alt={image.name} loading="lazy" />
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

    .header-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        width: 100%;
        text-align: center;
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: center;
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

    .nav-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    /* Override Navigation styles for centered layout if needed */
    :global(.nav-wrapper .nav-area) {
        align-items: center !important;
    }
    :global(.nav-wrapper .local-nav) {
        justify-content: center !important;
    }
    :global(.nav-wrapper .local-map) {
        justify-content: center !important;
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
        width: 100%;
        max-width: 1600px; /* Limit max width for large screens */
    }

    .gallery-item {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        overflow: hidden;
        position: relative;
        aspect-ratio: 16/9; /* Fixed aspect ratio for uniform grid */
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

    @media (max-width: 768px) {
        .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
    }
</style>
