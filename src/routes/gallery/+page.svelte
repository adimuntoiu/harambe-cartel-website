<script lang="ts">
    import { language, type Language } from "$lib/stores/settings.js";
    import "../../styles/main.css";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";

    import Sidebar from "$lib/components/Sidebar.svelte";
    import Settings from "$lib/components/Settings.svelte";

    // List of images in static/assets/gallery images
    const galleryImages = [
        "490027551_1166251011960343_414434399631237384_n.jpg",
        "490299565_1166250878627023_5855502590373265408_n.jpg",
        "499794126_1217400383421301_5277578256040011901_n.jpg",
        "507655618_1216909130227864_1320428628378065934_n.jpg",
        "571134860_1340578201103518_6611979056082107899_n.jpg",
        "585145058_10240291039477448_449635422555850016_n.jpg",
        "585263377_10240291062918034_7079265406105563270_n.jpg",
        "589814151_1368302321664439_2244211975594743123_n.jpg",
        "629497850_18420992092139212_836001345063701629_n.jpg",
        "91054462_2101361183342775_2536958304672808960_n.jpg",
        "WhatsApp Image 2026-01-21 at 00.14.08.jpeg",
        "WhatsApp Image 2026-01-21 at 00.14.09(1).jpeg",
        "WhatsApp Image 2026-01-21 at 00.14.09(2).jpeg",
        "WhatsApp Image 2026-01-21 at 00.14.09(3).jpeg",
        "WhatsApp Image 2026-01-21 at 00.14.09(4).jpeg",
        "WhatsApp Image 2026-01-21 at 00.14.09(5).jpeg",
        "WhatsApp Image 2026-01-21 at 00.14.09.jpeg",
        "WhatsApp Image 2026-01-21 at 00.14.10(1).jpeg",
        "WhatsApp Image 2026-01-21 at 00.14.10.jpeg",
        "WhatsApp Image 2026-02-20 at 14.54.51.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.34(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.34(2).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.34.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.35(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.35.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.36(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.36(2).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.36(3).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.36.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.37(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.37(2).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.37(3).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.37(4).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.37.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.39.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.40(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.40.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.41(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.41.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.49.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.50(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.50.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.51(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.51(2).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.51.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.52.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.53(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.53(2).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.53(3).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.53.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.54(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.54(2).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.54(3).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.54.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.55(1).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.55(2).jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.55.jpeg",
        "WhatsApp Image 2026-02-26 at 21.54.56.jpeg",
    ];

    let images = galleryImages
        .map((name) => ({
            name,
            src: `/assets/gallery images/${name}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }

    const fullText_ro = `Explorează momentele care ne definesc. De la competiții intense la sesiuni de construcție până târziu în noapte, galeria noastră prezintă dedicarea, munca în echipă și spiritul familiei noastre de robotică.`;
    const fullText_en = `Explore the moments that define us. From intense competitions to late-night build sessions, our gallery showcases the dedication, teamwork, and spirit of our robotics family.`;

    const navLabels: Record<Language, any> = {
        ro: {
            home: "ACASĂ",
            about: "DESPRE NOI",
            sponsors: "SPONSORI",
            members: "MEMBRI",
            events: "EVENIMENTE",
            results: "REZULTATE",
            gallery: "GALERIE",
            map: "HARTĂ",
            title: "GALERIE",
            subtitle: "SURPRINZÂND<br />CĂLĂTORIA NOASTRĂ",
        },
        en: {
            home: "HOME",
            about: "ABOUT US",
            sponsors: "SPONSORS",
            members: "MEMBERS",
            events: "EVENTS",
            results: "RESULTS",
            gallery: "GALLERY",
            map: "MAP",
            title: "GALLERY",
            subtitle: "CAPTURING<br />OUR JOURNEY",
        },
    };

    let isSidebarOpen = false;

    /* Lightbox Logic */
    let selectedImageIndex: number | null = null;
    let touchStartX = 0;
    let touchEndX = 0;

    function openImage(index: number) {
        selectedImageIndex = index;
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    function closeImage() {
        selectedImageIndex = null;
        document.body.style.overflow = ""; // Restore scrolling
    }

    function nextImage(e?: Event) {
        if (e) e.stopPropagation();
        if (selectedImageIndex !== null) {
            selectedImageIndex = (selectedImageIndex + 1) % images.length;
        }
    }

    function prevImage(e?: Event) {
        if (e) e.stopPropagation();
        if (selectedImageIndex !== null) {
            selectedImageIndex =
                (selectedImageIndex - 1 + images.length) % images.length;
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (selectedImageIndex === null) return;

        if (e.key === "Escape") closeImage();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    }

    function handleTouchStart(e: TouchEvent) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e: TouchEvent) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextImage();
        if (touchEndX > touchStartX + 50) prevImage();
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<video
    class="background-video"
    src="/assets/background_lines.mp4"
    autoplay
    loop
    muted
    playsinline
>
</video>

<BackgroundSplashes />

<Settings />
<Sidebar isOpen={isSidebarOpen} on:close={() => (isSidebarOpen = false)} />

<!-- Hamburger Button (Mobile Only) -->
<button
    class="hamburger-btn"
    on:click={() => (isSidebarOpen = true)}
    aria-label="Toggle Menu"
>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
</button>

<!-- LIGHTBOX OVERLAY -->
{#if selectedImageIndex !== null}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="lightbox-overlay"
        on:click={closeImage}
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}
    >
        <button class="close-btn" on:click={closeImage}>&times;</button>

        <button class="nav-btn prev" on:click={prevImage}>&lt;</button>

        <div class="lightbox-image-container" on:click|stopPropagation>
            <img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].name}
            />
        </div>

        <button class="nav-btn next" on:click={nextImage}>&gt;</button>
    </div>
{/if}

<div class="gallery-page">
    <div class="content-container">
        <!-- Left Column: Image Grid -->
        <div class="image-column">
            <div class="image-grid">
                {#each images as image, i}
                    <!-- Logic for 2-1, 1-2 pattern on 3-column grid -->
                    <!-- 
                       i % 4 == 0: span 2 (Wide)
                       i % 4 == 1: span 1 (Narrow) -> End of row 1
                       i % 4 == 2: span 1 (Narrow)
                       i % 4 == 3: span 2 (Wide) -> End of row 2
                    -->
                    <div
                        class="gallery-item"
                        class:wide={i % 4 === 0 || i % 4 === 3}
                    >
                        <a
                            href={image.src}
                            on:click|preventDefault={() => openImage(i)}
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
        </div>

        <!-- Right Column: Content (Title, Text, Nav) -->
        <div class="content-column">
            <div class="content-wrapper">
                <div class="title-group">
                    <h1 class="page-title">
                        {navLabels[$language as Language].title}
                    </h1>
                    <h2 class="subtitle">
                        {@html navLabels[$language as Language].subtitle}
                    </h2>
                </div>

                <div class="text-area">
                    <p class="description">
                        {@html formatNumbers(
                            $language === "ro" ? fullText_ro : fullText_en,
                        )}
                    </p>
                </div>

                <div class="nav-area">
                    <nav class="nav-buttons" data-sveltekit-reload>
                        <a href="/#home" class="btn"
                            >{navLabels[$language as Language].home}</a
                        >
                        <a href="/#about" class="btn"
                            >{navLabels[$language as Language].about}</a
                        >
                        <a href="/#sponsors" class="btn"
                            >{navLabels[$language as Language].sponsors}</a
                        >
                        <a href="/#members" class="btn"
                            >{navLabels[$language as Language].members}</a
                        >
                        <a href="/#events" class="btn"
                            >{navLabels[$language as Language].events}</a
                        >
                        <a href="/#results" class="btn"
                            >{navLabels[$language as Language].results}</a
                        >
                        <a href="/#gallery" class="btn selected"
                            >{navLabels[$language as Language].gallery}</a
                        >
                    </nav>
                    <div class="map-container">
                        <a href="/map" class="btn btn-map"
                            >{navLabels[$language as Language].map}</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Lightbox Styles */
    .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000; /* Above sidebar and everything */
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
    }

    .lightbox-image-container {
        max-width: 90%;
        max-height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .lightbox-image-container img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .close-btn {
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        z-index: 2001;
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .close-btn:hover {
        opacity: 1;
        color: #41dccc;
    }

    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        font-size: 2rem;
        padding: 1rem;
        cursor: pointer;
        z-index: 2001;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
            background 0.2s,
            color 0.2s;
        font-family: "Pirulen", sans-serif;
    }

    .nav-btn:hover {
        background: rgba(65, 220, 204, 0.3);
        color: #41dccc;
    }

    .nav-btn.prev {
        left: 20px;
    }

    .nav-btn.next {
        right: 20px;
    }

    /* Main Layout */
    .gallery-page {
        width: 100%;
        min-height: 100vh;
        position: relative;
        box-sizing: border-box;
        overflow-x: auto; /* Allow horizontal scroll as requested */
    }

    .content-container {
        display: flex;
        flex-direction: row; /* Desktop: Row */
        width: 98%;
        margin: 0 auto;
        padding: 2rem;
        box-sizing: border-box;
        gap: 2rem;
        min-height: 100vh;
    }

    /* RIGHT COLUMN: Content (Sticky on Desktop) */
    .content-column {
        width: 40%;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center; /* Vertically center content if short, or start */
    }

    .content-wrapper {
        position: sticky;
        top: 2rem; /* Stick to top */
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* Right align everything */
        gap: 2rem;
        text-align: right;
    }

    .title-group {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .page-title {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(5rem, 6vw, 8rem);
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
        white-space: normal;
        word-wrap: break-word;
    }

    .subtitle {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(1.2rem, 2vw, 2.5rem);
        color: #636363;
        margin: 0;
        line-height: 1.2;
    }

    .text-area {
        width: 100%;
        text-align: justify;
        direction: rtl; /* Trick for right-aligned justify? No, just keep simple or normal justify */
        direction: ltr;
        text-align: right; /* Use right align for neatness with right-aligned title/nav */
    }

    /* Module used justify. Let's stick to justify but maybe wrapper aligned right. */
    .description {
        font-family: "Coco Gothic", sans-serif;
        font-size: clamp(1.2rem, 1.4vw, 1.6rem);
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
        align-items: flex-end;
        width: 100%;
    }

    .nav-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 0.5rem;
        max-width: 420px;
        direction: ltr;
    }

    .nav-buttons .btn {
        direction: ltr; /* Reset direction for text */
        width: auto;
        flex-grow: 0;
        /* Ensure buttons don't stretch weirdly in grid */
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
        width: fit-content;
        min-width: 100px;
        text-align: center;
    }

    /* LEFT COLUMN: Images */
    .image-column {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        width: 100%;
    }

    .gallery-item {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        overflow: hidden;
        position: relative;
        aspect-ratio: 4/3; /* Standard aspect ratio */
        transition: transform 0.2s;
        cursor: pointer;
    }

    .gallery-item.wide {
        grid-column: span 2;
        /* Aspect ratio for wide items? 
           If narrow is 1fr width, wide is 2fr + gap. 
           To keep heights aligned, maybe let height be automatic based on aspect ratio?
           Or enforce height? 
           Original module relied on grid row height.
           Here we have auto rows.
           Let's just use aspect-ratio and object-fit cover.
        */
        aspect-ratio: 8/3; /* Double width roughly? (4/3 * 2 = 8/3) */
        /* Actually simpler: 2 columns wide. If height is fixed by the row, aspect ratio determines height. 
           If we want consistent row height:
           We can't easily force row height with mixed spans unless we use explicit rows.
           But auto-grid is safer for dynamic content.
           Let's try standard aspect ratio for the ITEM itself.
           If item spans 2 cols, its width doubles. If aspect ratio stays 4/3, it gets TALLER.
           We want it to be same height as the 1-col item.
           So wide item aspect ratio ~ 8/3? (Double width, same height)
        */
        aspect-ratio: 2.66; /* approx 8/3 */
    }

    .gallery-item:hover {
        transform: scale(1.02);
        z-index: 1;
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Responsive */
    @media (max-width: 1200px) {
        .image-grid {
            /* Maybe 2 cols? */
            /* If 2 cols, the 3-col brick logic breaks. */
            /* switch to 2 cols: just 1, 1, 1, 1? */
            grid-template-columns: repeat(2, 1fr);
        }
        .gallery-item.wide {
            grid-column: span 1; /* Reset to normal on tablet if needed, or keep logic if it fits */
            aspect-ratio: 4/3;
        }
    }

    @media (max-width: 768px) {
        .nav-btn {
            padding: 0.5rem;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
        }

        .nav-btn.prev {
            left: 10px;
        }

        .nav-btn.next {
            right: 10px;
        }

        .gallery-page {
            height: 100vh;
            overflow-y: auto;
            display: block;
        }

        .content-container {
            flex-direction: column-reverse; /* Content on top (visually, if HTML order allows) or bottom? Original code comment said content second in HTML. column-reverse puts content first visually. Wait, if I want title from left, I just align items. */
            flex-direction: column-reverse;
            padding: 1rem;
            padding-top: 8rem; /* Move content lower */
            gap: 2rem;
        }

        .content-column {
            width: 100%;
            min-width: 0;
            align-items: flex-end; /* Right align */
        }

        .content-wrapper {
            position: static;
            align-items: flex-end; /* Right align */
            text-align: right; /* Right align */
            gap: 1rem;
            width: 100%;
        }

        .title-group {
            align-items: flex-end; /* Right align */
            text-align: right; /* Right align */
            width: 100%;
        }

        .page-title {
            font-size: clamp(2.5rem, 6vw, 4rem);
            white-space: normal;
            word-wrap: break-word;
            text-align: right; /* Right align */
            direction: rtl; /* Right align */
        }

        .subtitle {
            text-align: right; /* Right align */
            font-size: 1.2rem;
        }

        .text-area {
            text-align: justify;
        }

        .nav-area {
            display: none;
        }

        .image-grid {
            grid-template-columns: repeat(1, 1fr);
        }

        .gallery-item.wide {
            grid-column: span 1;
            aspect-ratio: 4/3;
        }
    }
</style>
