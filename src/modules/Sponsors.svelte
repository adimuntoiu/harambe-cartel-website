<script>
    export let title = "Sponsors";
    import "../styles/main.css";
</script>

<div class="sponsors-page">
    <div class="top-grid">
        <!-- Row 1: Subtitle (Right) -->
        <div class="subtitle-area">
            <h2 class="subtitle">THESE ARE OUR</h2>
        </div>

        <!-- Row 2: Nav (Left) + Title (Right) -->
        <div class="nav-area">
            <nav class="nav-buttons local-nav">
                <a href="#home" class="btn">HOME</a>
                <a href="#about" class="btn">ABOUT US</a>
                <a href="#sponsors" class="btn selected">SPONSORS</a>
                <a href="#events" class="btn">EVENTS</a>
                <a href="#members" class="btn">MEMBERS</a>
                <a href="#results" class="btn">RESULTS</a>
                <a href="#gallery" class="btn">GALLERY</a>
            </nav>
            <div class="map-container local-map">
                <a href="#map" class="btn btn-map">MAP</a>
            </div>
        </div>

        <div class="title-area">
            <h1 class="title">SPONSORS</h1>
        </div>

        <!-- Row 3: Description (Right) -->
        <div class="text-area">
            <p class="description">
                We are incredibly grateful to all our sponsors for your generous
                support in helping our FTC team reach the milestone of $20,000!
                Your belief in our mission and commitment to STEM education has
                made a tremendous impact on our journey. With your
                contributions, we've been able to purchase essential equipment,
                attend competitions, and continue inspiring innovation and
                teamwork. Thank you for investing in our future—we couldn't have
                reached this goal without you. We're excited to make the most of
                this opportunity and represent our community with pride!
            </p>
        </div>
    </div>

    <div class="bottom-section">
        <div class="sponsors-grid">
            <div class="sponsor-card">
                <img src="src/assets/sponsors/panduit.png" alt="Panduit" />
            </div>
            <div class="sponsor-card">
                <img
                    src="src/assets/sponsors/joyson.png"
                    alt="Joyson Safety Systems"
                />
            </div>
            <div class="sponsor-card">
                <img src="src/assets/sponsors/filip.png" alt="Filip" />
            </div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
            <div class="sponsor-card sponsor-placeholder"></div>
        </div>
    </div>
</div>

<style>
    .sponsors-page {
        display: flex;
        flex-direction: column;
        width: 98%;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: center;
        gap: 1rem;
    }

    .top-grid {
        display: grid;
        grid-template-columns: 1fr min-content; /* Left space takes remaining, Right is sized by content */
        grid-template-rows: auto auto auto;
        column-gap: 2rem;
        row-gap: 0.5rem;
        width: 100%;
        justify-items: end; /* Align everything to the right side of their cells */
        align-items: start; /* Prevent rows from stretching to fill height */
    }

    .subtitle-area {
        grid-column: 2;
        grid-row: 1;
        text-align: right;
        width: 100%;
    }

    .nav-area {
        grid-column: 1;
        grid-row: 2 / span 2; /* Span across Title and Text rows */
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* Align buttons to the right, next to the title */
        gap: 1rem;
        padding-top: 1rem; /* Visual adjustment to align with large title text baseline/center if needed */
    }

    .title-area {
        grid-column: 2;
        grid-row: 2;
        text-align: right;
        /* The width of this element will define the column width */
    }

    .text-area {
        grid-column: 2;
        grid-row: 3;
        width: 100%;
    }

    .text-area .description {
        margin-top: 0.5rem; /* Override global 2rem margin */
    }

    .local-nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start; /* Align left as per previous request (LTR) */
        gap: 0.5rem;
        margin-top: 0;
        width: 100%;
    }

    .local-nav .btn {
        direction: ltr;
        flex: 1 0 auto; /* Allow growing but respect content */
        min-width: 120px; /* Ensure minimum width */
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
        width: 100%;
    }

    .local-map .btn-map {
        width: 100%;
        box-sizing: border-box;
        text-align: center;
    }

    .bottom-section {
        width: 100%;
        margin-top: 0;
    }

    .sponsors-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 1rem;
        width: 100%;
    }

    .sponsor-card {
        background: rgba(
            0,
            0,
            0,
            0.4
        ); /* Darker background for active sponsors */
        border-radius: 1rem;
        padding: 0.5rem; /* Reduced padding to make images bigger */
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 3/2;
        transition:
            transform 0.3s,
            background 0.3s;
    }

    .sponsor-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
    }

    .sponsor-card img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .sponsor-placeholder {
        background: rgba(200, 200, 200, 0.2);
    }

    @media (max-width: 1200px) {
        .sponsors-grid {
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
            order: 4; /* Move buttons to bottom on mobile */
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

        .sponsors-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .local-nav {
            grid-template-columns: repeat(2, 1fr);
            direction: ltr;
        }

        .local-map {
            justify-content: center;
        }
    }

    @media (max-height: 850px) and (min-width: 768px) {
        .sponsors-page {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 1rem 4rem;
            gap: 4rem;
        }

        .top-grid {
            width: 40%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-end;
            justify-items: end;
        }

        .subtitle-area,
        .title-area,
        .text-area,
        .nav-area {
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            text-align: right;
        }

        .nav-area {
            align-items: flex-end;
            margin-top: 1rem;
        }

        .local-nav {
            justify-content: flex-end;
        }

        .bottom-section {
            width: 50%;
            margin-top: 0;
        }

        .sponsors-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
        }

        .sponsor-card {
            padding: 0.25rem;
        }

        .text-area .description {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: 0.8rem; /* Smaller font */
        }

        .title-area .title {
            font-size: 2rem; /* Smaller title */
        }
    }
</style>
