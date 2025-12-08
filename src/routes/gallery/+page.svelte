<script lang="ts">
    import "../../styles/main.css";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";

    import Sidebar from "$lib/components/Sidebar.svelte";
    import Settings from "$lib/components/Settings.svelte";

    // Import all images
    const imageModules = import.meta.glob(
        "/src/assets/gallery images/*.{jpg,jpeg,png,webp,gif}",
        { eager: true, query: "?url", import: "default" },
    ) as Record<string, string>;

    let images = Object.entries(imageModules)
        .map(([path, src]) => {
            return {
                name: path.split("/").pop() || "",
                src: src,
            };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }

    const fullText = `Explore the moments that define us. From intense competitions to late-night build sessions, our gallery showcases the dedication, teamwork, and spirit of our robotics family.`;

    let isSidebarOpen = false;
</script>

<video
    class="background-video"
    src="/src/assets/background_lines.mp4"
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
        </div>

        <!-- Right Column: Content (Title, Text, Nav) -->
        <div class="content-column">
            <div class="content-wrapper">
                <div class="title-group">
                    <h1 class="page-title">GALLERY</h1>
                    <h2 class="subtitle">CAPTURING OUR JOURNEY</h2>
                </div>

                <div class="text-area">
                    <p class="description">
                        {@html formatNumbers(fullText)}
                    </p>
                </div>

                <div class="nav-area" data-sveltekit-reload>
                    <nav class="nav-buttons">
                        <a href="/#home" class="btn">HOME</a>
                        <a href="/#about" class="btn">ABOUT US</a>
                        <a href="/#sponsors" class="btn">SPONSORS</a>
                        <a href="/#members" class="btn">MEMBERS</a>
                        <a href="/#events" class="btn">EVENTS</a>
                        <a href="/#results" class="btn">RESULTS</a>
                        <a href="/#gallery" class="btn selected">GALLERY</a>
                    </nav>
                    <div class="map-container">
                        <a href="/#map" class="btn btn-map">MAP</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
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
        white-space: nowrap;
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
        .content-container {
            flex-direction: column-reverse;
            /* 
               HTML: Images first, Content second.
               column-reverse: Content (bottom) becomes Top. Images (top) become Bottom.
               So Yes: Content First, then Images.
            */
            padding: 1rem;
            padding-top: 8rem; /* Move content even lower as requested */
            gap: 2rem;
        }

        .content-column {
            width: 100%;
            min-width: 0;
            align-items: center;
        }

        .content-wrapper {
            position: static; /* No sticky on mobile */
            align-items: center;
            text-align: center;
            gap: 1rem;
        }

        .title-group {
            align-items: center;
            text-align: center;
            width: 100%;
        }

        .page-title {
            font-size: 3rem;
            white-space: normal; /* Allow wrap on very small screens? Or scale down */
            text-align: center;
            direction: rtl; /* Requested orientation */
        }

        .subtitle {
            text-align: center;
            font-size: 1.2rem;
        }

        .text-area {
            text-align: justify;
        }

        .nav-area {
            display: none; /* Hide nav on mobile like module? */
            /* Module hid nav area on mobile: .nav-area { display: none; } */
            /* But this is a standalone page. Users need to go back! */
            /* Module had a sidebar/hamburger. 
               The Main Layout has a Sidebar.
               We can rely on that.
            */
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
