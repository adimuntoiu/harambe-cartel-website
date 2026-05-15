<script lang="ts">
    import { language, type Language } from "$lib/stores/settings.js";
    import "../../styles/main.css";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Settings from "$lib/components/Settings.svelte";

    // ─── Season / Event Data Structure ───────────────────────────────────────
    type GalleryImage = { name: string; src: string; isAward: boolean };
    type Event = { id: string; label_ro: string; label_en: string; images: GalleryImage[] };
    type Season = { id: string; label: string; events: Event[] };

    function makeImages(prefix: string, ext: string, count: number, awardName?: string): GalleryImage[] {
        const imgs: GalleryImage[] = [];
        if (awardName) {
            imgs.push({
                name: awardName,
                src: `/assets/gallery images/${awardName}`,
                isAward: true,
            });
        }
        for (let i = 0; i < count; i++) {
            const name = `${prefix}${i}.${ext}`;
            imgs.push({ name, src: `/assets/gallery images/${name}`, isAward: false });
        }
        return imgs;
    }

    const seasons: Season[] = [
        {
            id: "decode",
            label: "DECODE",
            events: [
                {
                    id: "decode-regio",
                    label_ro: "Regionala",
                    label_en: "Regional",
                    images: [
                        { name: "decode_regio_award.jpeg", src: "/assets/gallery images/Decode/Regionala/decode_regio_award.jpeg", isAward: true },
                        ...Array.from({ length: 38 }, (_, i) => ({
                            name: `decode_regio${i}.jpeg`,
                            src: `/assets/gallery images/Decode/Regionala/decode_regio${i}.jpeg`,
                            isAward: false,
                        })),
                        { name: "decode_regio38.jpg", src: "/assets/gallery images/Decode/Regionala/decode_regio38.jpg", isAward: false },
                    ],
                },
                {
                    id: "decode-natio",
                    label_ro: "Nationala",
                    label_en: "Nationals",
                    images: Array.from({ length: 12 }, (_, i) => ({
                        name: `decode_natio${i}.JPG`,
                        src: `/assets/gallery images/Decode/Nationala/decode_natio${i}.JPG`,
                        isAward: false,
                    })),
                },
                {
                    id: "decode-events",
                    label_ro: "Evenimente",
                    label_en: "Events",
                    images: [
                        { name: "decode_events0.jpg", src: "/assets/gallery images/Decode/Events/decode_events0.jpg", isAward: false },
                        { name: "decode_events1.jpg", src: "/assets/gallery images/Decode/Events/decode_events1.jpg", isAward: false },
                    ],
                },
            ],
        },
        {
            id: "itd",
            label: "INTO THE DEEP",
            events: [
                {
                    id: "itd-regio",
                    label_ro: "Regionala",
                    label_en: "Regional",
                    images: [
                        { name: "itd_regio_award.jpg", src: "/assets/gallery images/Into The Deep/Regionala/itd_regio_award.jpg", isAward: true },
                        { name: "itd_regio1.jpg", src: "/assets/gallery images/Into The Deep/Regionala/itd_regio1.jpg", isAward: false },
                    ],
                },
                {
                    id: "itd-natio",
                    label_ro: "Nationala",
                    label_en: "Nationals",
                    images: [
                        { name: "itd_natio_award.jpeg", src: "/assets/gallery images/Into The Deep/Nationala/itd_natio_award.jpeg", isAward: true },
                    ],
                },
                {
                    id: "itd-btc",
                    label_ro: "Bucharest Twin Cup",
                    label_en: "Bucharest Twin Cup",
                    images: Array.from({ length: 9 }, (_, i) => ({
                        name: `itd_btc${i}.jpeg`,
                        src: `/assets/gallery images/Into The Deep/BTC/itd_btc${i}.jpeg`,
                        isAward: false,
                    })),
                },
                {
                    id: "itd-events",
                    label_ro: "Evenimente",
                    label_en: "Events",
                    images: Array.from({ length: 4 }, (_, i) => ({
                        name: `itd_events${i}.jpg`,
                        src: `/assets/gallery images/Into The Deep/Events/itd_events${i}.jpg`,
                        isAward: false,
                    })),
                },
            ],
        },
        {
            id: "skystone",
            label: "SKYSTONE",
            events: [
                {
                    id: "skystone-regio",
                    label_ro: "Regionala",
                    label_en: "Regional",
                    images: [
                        { name: "skystone_regio0.jpg", src: "/assets/gallery images/Skystone/Regionala/skystone_regio0.jpg", isAward: false },
                    ],
                },
            ],
        },
    ];

    // ─── State ────────────────────────────────────────────────────────────────
    let activeSeason = seasons[0];
    let activeEvent = seasons[0].events[0];

    $: currentImages = activeEvent.images;

    function selectSeason(season: Season) {
        activeSeason = season;
        activeEvent = season.events[0];
    }

    function selectEvent(event: Event) {
        activeEvent = event;
    }

    // ─── Text ─────────────────────────────────────────────────────────────────
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

    // ─── Lightbox ─────────────────────────────────────────────────────────────
    let selectedImageIndex: number | null = null;
    let touchStartX = 0;
    let touchEndX = 0;

    function openImage(index: number) {
        selectedImageIndex = index;
        document.body.style.overflow = "hidden";
    }

    function closeImage() {
        selectedImageIndex = null;
        document.body.style.overflow = "";
    }

    function nextImage(e?: Event) {
        if (e) e.stopPropagation();
        if (selectedImageIndex !== null) {
            selectedImageIndex = (selectedImageIndex + 1) % currentImages.length;
        }
    }

    function prevImage(e?: Event) {
        if (e) e.stopPropagation();
        if (selectedImageIndex !== null) {
            selectedImageIndex =
                (selectedImageIndex - 1 + currentImages.length) % currentImages.length;
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
                src={currentImages[selectedImageIndex].src}
                alt={currentImages[selectedImageIndex].name}
            />
        </div>

        <button class="nav-btn next" on:click={nextImage}>&gt;</button>
    </div>
{/if}

<div class="gallery-page">
    <div class="content-container">
        <!-- LEFT COLUMN: Image Grid -->
        <div class="image-column">

            <!-- Season Tabs -->
            <div class="season-tabs">
                {#each seasons as season}
                    <button
                        class="season-tab"
                        class:active={activeSeason.id === season.id}
                        on:click={() => selectSeason(season)}
                    >
                        {season.label}
                    </button>
                {/each}
            </div>

            <!-- Event Tabs -->
            <div class="event-tabs">
                {#each activeSeason.events as event}
                    <button
                        class="event-tab"
                        class:active={activeEvent.id === event.id}
                        on:click={() => selectEvent(event)}
                    >
                        {$language === "ro" ? event.label_ro : event.label_en}
                    </button>
                {/each}
            </div>

            <!-- Breadcrumb -->
            <div class="breadcrumb">
                <span class="breadcrumb-season">{activeSeason.label}</span>
                <span class="breadcrumb-sep">›</span>
                <span class="breadcrumb-event">
                    {$language === "ro" ? activeEvent.label_ro : activeEvent.label_en}
                </span>
                <span class="breadcrumb-count">
                    (<span class="modern-num">{currentImages.length}</span> {$language === "ro" ? "foto" : "photos"})
                </span>
            </div>

            <!-- Image Grid -->
            <div class="image-grid">
                {#each currentImages as image, i}
                    <div
                        class="gallery-item"
                        class:award={image.isAward}
                        class:wide={!image.isAward && (i % 4 === 0 || i % 4 === 3)}
                    >
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="gallery-item-inner" on:click={() => openImage(i)}>
                            {#if image.isAward}
                                <div class="award-badge">🏆</div>
                            {/if}
                            <img
                                src={image.src}
                                alt={image.name}
                                loading="lazy"
                            />
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- RIGHT COLUMN: Content (Sticky) -->
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
                        <a href="/#home" class="btn">{navLabels[$language as Language].home}</a>
                        <a href="/#about" class="btn">{navLabels[$language as Language].about}</a>
                        <a href="/#sponsors" class="btn">{navLabels[$language as Language].sponsors}</a>
                        <a href="/#members" class="btn">{navLabels[$language as Language].members}</a>
                        <a href="/#events" class="btn">{navLabels[$language as Language].events}</a>
                        <a href="/#results" class="btn">{navLabels[$language as Language].results}</a>
                        <a href="/#gallery" class="btn selected">{navLabels[$language as Language].gallery}</a>
                    </nav>
                    <div class="map-container">
                        <a href="/map" class="btn btn-map">{navLabels[$language as Language].map}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* ── Lightbox ─────────────────────────────────────────────────────────── */
    .lightbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.92);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(12px);
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
        box-shadow: 0 0 40px rgba(65, 220, 204, 0.2);
        border-radius: 4px;
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
        transition: background 0.2s, color 0.2s;
        font-family: "Pirulen", sans-serif;
    }

    .nav-btn:hover {
        background: rgba(65, 220, 204, 0.3);
        color: #41dccc;
    }

    .nav-btn.prev { left: 20px; }
    .nav-btn.next { right: 20px; }

    /* ── Page Layout ─────────────────────────────────────────────────────── */
    .gallery-page {
        width: 100%;
        min-height: 100vh;
        position: relative;
        box-sizing: border-box;
        overflow-x: auto;
    }

    .content-container {
        display: flex;
        flex-direction: row;
        width: 98%;
        margin: 0 auto;
        padding: 2rem;
        box-sizing: border-box;
        gap: 2rem;
        min-height: 100vh;
    }

    /* ── RIGHT COLUMN ─────────────────────────────────────────────────────── */
    .content-column {
        width: 40%;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .content-wrapper {
        position: sticky;
        top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
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
        background: linear-gradient(90deg, #41dccc 0%, #59d3ff 50%, #41dccc 100%);
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
        text-align: right;
    }

    .description {
        font-family: "Coco Gothic", sans-serif;
        font-size: clamp(1.2rem, 1.4vw, 1.6rem);
        color: #949494;
        text-align: justify;
        line-height: 1.6;
        margin: 0;
    }

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
        direction: ltr;
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
        width: fit-content;
        min-width: 100px;
        text-align: center;
    }

    /* ── LEFT COLUMN ──────────────────────────────────────────────────────── */
    .image-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    /* ── Season Tabs ─────────────────────────────────────────────────────── */
    .season-tabs {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .season-tab {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(0.8rem, 1.5vw, 1.5rem);
        letter-spacing: 0.05em;
        padding: clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem);
        border: none;
        border-radius: 2rem;
        background: rgba(0, 0, 0, 0.15);
        color: #999;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
    }

    .season-tab:hover {
        background: #59d3ff;
        color: white;
    }

    .season-tab.active {
        background: rgba(0, 0, 0, 0.15);
        color: #187bcd;
    }

    .season-tab.active:hover {
        background: #59d3ff;
        color: white;
    }

    /* ── Event Tabs ──────────────────────────────────────────────────────── */
    .event-tabs {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
    }

    .event-tab {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(0.7rem, 1.2vw, 1.2rem);
        letter-spacing: 0.04em;
        padding: clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem);
        border: none;
        border-radius: 2rem;
        background: rgba(0, 0, 0, 0.15);
        color: #999;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
    }

    .event-tab:hover {
        background: #59d3ff;
        color: white;
    }

    .event-tab.active {
        background: rgba(0, 0, 0, 0.15);
        color: #187bcd;
    }

    .event-tab.active:hover {
        background: #59d3ff;
        color: white;
    }

    /* ── Breadcrumb ──────────────────────────────────────────────────────── */
    .breadcrumb {
        font-family: "Coco Gothic", sans-serif;
        font-size: 0.8rem;
        color: #888;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.2rem 0;
        border-bottom: 1px solid rgba(65, 220, 204, 0.15);
        padding-bottom: 0.6rem;
    }

    .breadcrumb-season {
        color: #187bcd;
        font-family: "Pirulen", sans-serif;
        font-size: 0.65rem;
        letter-spacing: 0.08em;
    }

    .breadcrumb-sep {
        color: #555;
        font-size: 1rem;
    }

    .breadcrumb-event {
        color: #2196f3;
    }

    .breadcrumb-count {
        color: #555;
        margin-left: 0.2rem;
    }

    .breadcrumb-count .modern-num {
        font-family: "ABeeZee", sans-serif !important;
        font-weight: bold;
    }

    /* ── Image Grid ──────────────────────────────────────────────────────── */
    .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
        width: 100%;
    }

    .gallery-item {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        overflow: hidden;
        position: relative;
        aspect-ratio: 4/3;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
    }

    /* Award photos: span full 3 columns and taller */
    .gallery-item.award {
        grid-column: 1 / -1;
        aspect-ratio: 16/7;
        border: 1.5px solid rgba(255, 210, 60, 0.4);
        box-shadow: 0 0 24px rgba(255, 200, 40, 0.15);
    }

    .gallery-item.award:hover {
        box-shadow: 0 0 40px rgba(255, 200, 40, 0.3);
    }

    /* Wide items (non-award): span 2 columns */
    .gallery-item.wide:not(.award) {
        grid-column: span 2;
        aspect-ratio: 2.66;
    }

    .gallery-item:hover {
        transform: scale(1.02);
        z-index: 1;
    }

    .gallery-item-inner {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: filter 0.2s;
    }

    .gallery-item:hover img {
        filter: brightness(1.08);
    }

    /* Award badge overlay */
    .award-badge {
        position: absolute;
        top: 12px;
        left: 12px;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 210, 60, 0.5);
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 1.1rem;
        z-index: 2;
        pointer-events: none;
    }

    /* ── Responsive ──────────────────────────────────────────────────────── */
    @media (max-width: 1200px) {
        .image-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .gallery-item.wide:not(.award) {
            grid-column: span 1;
            aspect-ratio: 4/3;
        }
        .gallery-item.award {
            grid-column: 1 / -1;
        }
    }

    @media (max-width: 768px) {
        .nav-btn {
            padding: 0.5rem;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
        }
        .nav-btn.prev { left: 10px; }
        .nav-btn.next { right: 10px; }

        .gallery-page {
            height: 100vh;
            overflow-y: auto;
            display: block;
        }

        .content-container {
            flex-direction: column-reverse;
            padding: 1rem;
            padding-top: 8rem;
            gap: 2rem;
        }

        .content-column {
            width: 100%;
            min-width: 0;
            align-items: flex-end;
        }

        .content-wrapper {
            position: static;
            align-items: flex-end;
            text-align: right;
            gap: 1rem;
            width: 100%;
        }

        .title-group {
            align-items: flex-end;
            text-align: right;
            width: 100%;
        }

        .page-title {
            font-size: clamp(2.5rem, 6vw, 4rem);
            white-space: normal;
            word-wrap: break-word;
            text-align: right;
            direction: rtl;
        }

        .subtitle {
            text-align: right;
            font-size: 1.2rem;
        }

        .text-area { text-align: justify; }
        .nav-area { display: none; }

        .image-grid {
            grid-template-columns: repeat(1, 1fr);
        }

        .gallery-item.wide:not(.award),
        .gallery-item.award {
            grid-column: span 1;
            aspect-ratio: 4/3;
        }

        .season-tab {
            font-size: clamp(0.6rem, 1.5vw, 0.9rem);
            padding: 0.5rem 0.9rem;
        }

        .event-tab {
            font-size: clamp(0.5rem, 1.2vw, 0.8rem);
            padding: 0.35rem 0.8rem;
        }
    }
</style>
