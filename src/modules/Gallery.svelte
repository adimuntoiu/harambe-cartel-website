<script lang="ts">
    import "../styles/main.css";
    import { onMount } from "svelte";
    import { language, type Language } from "$lib/stores/settings.js";

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

    // Reactive layout: first 6 images normally, 4 if expanded on mobile
    $: visibleImages =
        isMobile && isExpanded ? images.slice(0, 4) : images.slice(0, 6);

    let contentHeight: number;

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match: string) => `<span class="modern-num">${match}</span>`,
        );
    }

    let isMobile = false;
    let isExpanded = false;

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

    const fullText_ro =
        "Explorează momentele care ne definesc. De la competiții intense la sesiuni de construcție nocturne, galeria noastră prezintă dăruirea, munca în echipă și spiritul familiei noastre de robotică.";
    const fullText_en = `Explore the moments that define us. From intense competitions to late-night build sessions, our gallery showcases the dedication, teamwork, and spirit of our robotics family.`;

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth <= 768;
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    $: currentText = $language === "ro" ? fullText_ro : fullText_en;
    $: showFullText = !isMobile || isExpanded;
    $: displayedText = showFullText ? currentText : currentText.slice(0, 100);

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
            subtitle: "SURPRINZÂND<br />CĂLĂTORIA NOASTRĂ",
            title: "GALERIE",
            viewAll: "VEZI TOATE IMAGINILE",
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
            subtitle: "CAPTURING<br />OUR JOURNEY",
            title: "GALLERY",
            viewAll: "VIEW ALL IMAGES",
        },
    };
</script>

<svelte:window on:keydown={handleKeydown} />

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
                    {#each visibleImages as image, i}
                        <div class="gallery-item">
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

                <a href="/gallery" class="view-all-btn btn desktop-only">
                    <span>{navLabels[$language as Language].viewAll}</span>
                </a>
            </div>
        </div>

        <!-- Right Column: Content -->
        <div class="content-column">
            <div class="content-wrapper" bind:clientHeight={contentHeight}>
                <div class="trying-height-centering">
                    <div class="title-group">
                        <h1 class="page-title">
                            {navLabels[$language as Language].title}
                        </h1>
                        <h2 class="subtitle">
                            {@html navLabels[$language as Language].subtitle}
                        </h2>
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
                            <span
                                >{navLabels[$language as Language]
                                    .viewAll}</span
                            >
                        </a>
                    </div>

                    <div class="nav-area">
                        <nav class="nav-buttons">
                            <a href="#home" class="btn"
                                >{navLabels[$language as Language].home}</a
                            >
                            <a href="#about" class="btn"
                                >{navLabels[$language as Language].about}</a
                            >
                            <a href="#sponsors" class="btn"
                                >{navLabels[$language as Language].sponsors}</a
                            >
                            <a href="#members" class="btn"
                                >{navLabels[$language as Language].members}</a
                            >
                            <a href="#events" class="btn"
                                >{navLabels[$language as Language].events}</a
                            >
                            <a href="#results" class="btn"
                                >{navLabels[$language as Language].results}</a
                            >
                            <a href="#gallery" class="btn selected"
                                >{navLabels[$language as Language].gallery}</a
                            >
                        </nav>
                        <div class="map-container local-map">
                            <a href="/map" class="btn btn-map"
                                >{navLabels[$language as Language].map}</a
                            >
                        </div>
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
        font-size: clamp(4rem, 5vw, 6.5rem); /* Reduced size slightly */
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
    }

    @media (min-width: 1920px) {
        .page-title {
            font-size: 8.5rem;
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
        cursor: pointer;
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

        .gallery-container {
            padding: 1rem;
            justify-content: flex-start; /* Move content higher (top aligned) */
            min-height: 100dvh;
            height: auto;
            overflow-y: auto;
        }

        .top-section {
            flex-direction: column-reverse;
            align-items: flex-start; /* Left align */
            overflow: visible;
            gap: 1rem; /* Add some gap between text and images */
            justify-content: flex-start; /* Move content higher */
            height: auto;
        }

        .content-column {
            width: 100%;
            align-items: center;
            min-width: 0;
            justify-content: flex-start;
            gap: 0; /* Remove gap */
            margin-bottom: 1rem; /* Small margin before images if needed, or 0 */
            height: auto;
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
