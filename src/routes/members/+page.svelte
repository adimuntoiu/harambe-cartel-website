<script lang="ts">
    import { language, type Language } from "$lib/stores/settings.js";
    import "../../styles/main.css";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Settings from "$lib/components/Settings.svelte";

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }

    const fullText_ro = `Echipa noastră este compusă din studenți dedicați care sunt pasionați de robotică, inginerie și inovație. Fiecare membru aduce abilități și perspective unice, contribuind la succesul nostru colectiv. Împreună, învățăm, construim și creștem, străduindu-ne să avem un impact pozitiv în comunitatea noastră și nu numai.`;
    const fullText_en = `Our team is composed of dedicated students who are passionate about robotics, engineering, and innovation. Each member brings unique skills and perspectives, contributing to our collective success. Together, we learn, build, and grow, striving to make a positive impact in our community and beyond.`;

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
            title: "MEMBRI",
            subtitle: "FĂ CUNOŞTINŢĂ CU",
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
            title: "MEMBERS",
            subtitle: "MEET OUR",
        },
    };

    let isSidebarOpen = false;
</script>

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

<div class="members-page">
    <div class="top-grid">
        <!-- Row 1: Subtitle (Right) -->
        <div class="subtitle-area">
            <h2 class="subtitle">
                {navLabels[$language as Language].subtitle}
            </h2>
        </div>

        <!-- Row 2: Nav (Left) + Title (Right) -->
        <div class="nav-area">
            <nav class="nav-buttons local-nav" data-sveltekit-reload>
                <a href="/#home" class="btn"
                    >{navLabels[$language as Language].home}</a
                >
                <a href="/#about" class="btn"
                    >{navLabels[$language as Language].about}</a
                >
                <a href="/#sponsors" class="btn"
                    >{navLabels[$language as Language].sponsors}</a
                >
                <a href="/#members" class="btn selected"
                    >{navLabels[$language as Language].members}</a
                >
                <a href="/#events" class="btn"
                    >{navLabels[$language as Language].events}</a
                >
                <a href="/#results" class="btn"
                    >{navLabels[$language as Language].results}</a
                >
                <a href="/#gallery" class="btn"
                    >{navLabels[$language as Language].gallery}</a
                >
            </nav>
            <div class="map-container local-map">
                <a href="/#map" class="btn btn-map"
                    >{navLabels[$language as Language].map}</a
                >
            </div>
        </div>

        <div class="title-area" class:shift-right={$language === "en"}>
            <h1 class="title">{navLabels[$language as Language].title}</h1>
        </div>

        <!-- Row 3: Description (Right) -->
        <div class="text-area">
            <p class="description">
                {@html formatNumbers(
                    $language === "ro" ? fullText_ro : fullText_en,
                )}
            </p>
        </div>
    </div>

    <div class="bottom-section">
        <div class="members-grid">
            <!-- 20 Placeholders -->
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>

            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>

            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
            <div class="member-card member-placeholder"></div>
        </div>
    </div>
</div>

<style>
    .members-page {
        display: flex;
        flex-direction: column;
        width: 98%;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: flex-start; /* Align top for full page */
        gap: 1rem;
        background-color: transparent; /* Remove fallback */
    }

    .top-grid {
        display: grid;
        grid-template-columns: max-content 1fr; /* Left is sized by content, Right takes remaining */
        grid-template-rows: auto auto auto auto;
        column-gap: 2rem;
        row-gap: 0.5rem;
        width: 100%;
        justify-items: end; /* Align everything to the right side of their cells */
        align-items: start;
    }

    .subtitle-area {
        grid-column: 2;
        grid-row: 1;
        text-align: right;
        width: 100%;
    }

    .nav-area {
        grid-column: 1;
        grid-row: 2 / span 3;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        padding-top: 0;
        padding-left: 0;
        justify-self: start;
        width: fit-content;
        margin-right: auto;
    }

    .title-area {
        grid-column: 2;
        grid-row: 2;
        text-align: right;
        transition: transform 0.3s ease;
    }

    .title-area.shift-right {
        transform: translateX(2rem); /* Move English title to the right */
    }

    .text-area {
        grid-column: 2;
        grid-row: 3;
        width: 100%;
    }

    .text-area .description {
        margin-top: 0.5rem;
    }

    .local-nav {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        justify-content: start;
        gap: 0.5rem;
        margin-top: 0;
        width: 100%;
        max-width: none; /* Remove constraint as grid handles it */
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
        justify-content: flex-start;
        display: flex;
        width: 100%;
    }

    .local-map .btn-map {
        width: 100%;
        box-sizing: border-box;
        text-align: center;
    }

    .bottom-section {
        width: 100%;
        margin-top: 2rem;
    }

    .members-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
    }

    /* First item centered on its own row */
    .member-card:nth-child(1) {
        grid-column: 3;
        grid-row: 1;
    }

    /* Ensure 2nd item starts on the next row */
    .member-card:nth-child(2) {
        grid-row-start: 2;
        grid-column-start: 1;
    }

    .member-card {
        background: rgba(0, 0, 0, 0.4);
        border-radius: 1rem;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 3/2;
        transition:
            transform 0.3s,
            background 0.3s;
    }

    .member-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
    }

    .member-placeholder {
        background: rgba(200, 200, 200, 0.2);
    }

    @media (max-width: 1200px) {
        .members-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (max-width: 768px) {
        .members-page {
            height: 100vh;
            overflow-y: auto;
            padding-top: 10rem; /* Lower title/content */
            display: block;
        }

        .top-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            margin-top: 0;
        }

        .subtitle-area,
        .title-area,
        .text-area,
        .nav-area {
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            text-align: left;
            align-items: flex-start;
            transform: none !important; /* Reset any desktop shifts */
        }

        .nav-area {
            display: none;
        }

        .subtitle-area {
            order: 1;
        }
        .title-area {
            order: 2;
        }
        .text-area {
            order: 3;
        }

        .title {
            font-family: "Pirulen", sans-serif;
            font-size: clamp(3rem, 10vw, 8rem);
            margin: 0;
            line-height: 1.1;
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
            text-align: left;
        }

        .members-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .local-nav {
            justify-content: center;
        }

        .local-map {
            justify-content: center;
        }
    }
</style>
