<script>
    import "../../styles/main.css";

    // Import all images
    const imageModules = import.meta.glob(
        "/src/assets/gallery images/*.{jpg,jpeg,png,webp,gif}",
        { eager: true, as: "url" },
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

<div class="full-gallery-container">
    <div class="header">
        <a href="/#gallery" class="back-btn"> &lt; BACK </a>
        <h1 class="page-title">FULL GALLERY</h1>
    </div>

    <div class="gallery-grid">
        {#each images as image}
            <div class="image-card">
                <img src={image.src} alt={image.name} loading="lazy" />
                <div class="image-name">{image.name}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .full-gallery-container {
        min-height: 100vh;
        background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
        padding: 2rem;
        color: white;
        font-family: "Coco Gothic", sans-serif;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .back-btn {
        font-family: "Pirulen", sans-serif;
        color: #41dccc;
        text-decoration: none;
        font-size: 1.2rem;
        border: 1px solid #41dccc;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
    }

    .back-btn:hover {
        background: rgba(65, 220, 204, 0.2);
        box-shadow: 0 0 10px rgba(65, 220, 204, 0.4);
    }

    .page-title {
        font-family: "Pirulen", sans-serif;
        font-size: 2rem;
        margin: 0;
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

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
    }

    .image-card {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 1rem;
        overflow: hidden;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        aspect-ratio: 16/9;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    .image-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .image-card:hover img {
        transform: scale(1.05);
    }

    .image-name {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        padding: 0.5rem;
        font-size: 0.8rem;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .image-card:hover .image-name {
        opacity: 1;
    }

    @keyframes shine {
        to {
            background-position: 200% center;
        }
    }
</style>
