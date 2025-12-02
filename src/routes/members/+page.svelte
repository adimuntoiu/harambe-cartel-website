<script>
    import "../../styles/main.css";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";

    function formatNumbers(text) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match) => `<span class="modern-num">${match}</span>`,
        );
    }
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

<div class="members-page">
    <div class="top-grid">
        <!-- Row 1: Subtitle (Right) -->
        <div class="subtitle-area">
            <h2 class="subtitle">MEET OUR</h2>
        </div>

        <!-- Row 2: Nav (Left) + Title (Right) -->
        <div class="nav-area">
            <nav class="nav-buttons local-nav">
                <a href="/#home" class="btn">HOME</a>
                <a href="/#about" class="btn">ABOUT US</a>
                <a href="/#sponsors" class="btn">SPONSORS</a>
                <a href="/#members" class="btn selected">MEMBERS</a>
                <a href="/#events" class="btn">EVENTS</a>
                <a href="/#results" class="btn">RESULTS</a>
                <a href="/#gallery" class="btn">GALLERY</a>
            </nav>
            <div class="map-container local-map">
                <a href="/#map" class="btn btn-map">MAP</a>
            </div>
        </div>

        <div class="title-area">
            <h1 class="title">MEMBERS</h1>
        </div>

        <!-- Row 3: Description (Right) -->
        <div class="text-area">
            <p class="description">
                {@html formatNumbers(`Our team is composed of dedicated students who are passionate about
                robotics, engineering, and innovation. Each member brings unique skills
                and perspectives, contributing to our collective success. Together, we
                learn, build, and grow, striving to make a positive impact in our
                community and beyond.`)}
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
        grid-template-columns: repeat(3, max-content);
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
        .top-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .subtitle-area,
        .title-area,
        .text-area,
        .nav-area {
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            text-align: center;
            align-items: center;
        }

        .nav-area {
            order: 4;
            margin-top: 2rem;
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
