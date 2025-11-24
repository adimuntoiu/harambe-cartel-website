<script>
    export let title = "Sponsors";
    import "../styles/main.css";
</script>

<div class="sponsors-container">
    <div class="sponsors-left">
        <nav class="nav-buttons">
            <a href="#home" class="btn">HOME</a>
            <a href="#about" class="btn">ABOUT US</a>
            <a href="#sponsors" class="btn selected">SPONSORS</a>
            <a href="#results" class="btn">RESULTS</a>
            <a href="#events" class="btn">EVENTS</a>
            <a href="#gallery" class="btn">GALLERY</a>
            <a href="#members" class="btn">MEMBERS</a>
            <a href="#map" class="btn">DONATE</a>
        </nav>
    </div>

    <div class="sponsors-right">
        <div class="sponsors-header">
            <h2 class="sponsors-subtitle">THESE ARE OUR</h2>
            <h1 class="sponsors-title">SPONSORS</h1>
        </div>

        <p class="sponsors-description">
            We are incredibly grateful to all our sponsors for your generous
            support in helping our FTC team reach the milestone of $20,000! Your
            belief in our mission and commitment to STEM education has made a
            tremendous impact on our journey. With your contributions, we've
            been able to purchase essential equipment, attend competitions, and
            continue inspiring innovation and teamwork. Thank you for investing
            in our future—we couldn't have reached this goal without you. We're
            excited to make the most of this opportunity and represent our
            community with pride!
        </p>

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
    .sponsors-container {
        display: flex;
        width: 100%;
        min-height: 100vh;
        padding: 2rem;
        gap: 3rem;
        box-sizing: border-box;
    }

    .sponsors-left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 2rem;
    }

    .sponsors-left .nav-buttons {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }

    .sponsors-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-top: 2rem;
    }

    .sponsors-header {
        text-align: right;
        margin-bottom: 1.5rem;
    }

    .sponsors-subtitle {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        color: #636363;
        margin: 0;
        line-height: 1.2;
    }

    .sponsors-title {
        font-family: "Pirulen", sans-serif;
        font-size: clamp(3rem, 6vw, 5rem);
        margin: 0;
        line-height: 1.1;
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

    .sponsors-description {
        font-family: "Coco Gothic", sans-serif;
        font-size: clamp(0.9rem, 1.2vw, 1.2rem);
        color: #949494;
        text-align: justify;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .sponsors-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        width: 100%;
    }

    .sponsor-card {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 1rem;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 120px;
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

    @keyframes shine {
        0% {
            background-position: -200% center;
        }
        10% {
            background-position: 200% center;
        }
        100% {
            background-position: 200% center;
        }
    }

    @media (max-width: 1200px) {
        .sponsors-container {
            flex-direction: column;
            gap: 2rem;
        }

        .sponsors-left .nav-buttons {
            flex-direction: row;
            flex-wrap: wrap;
        }

        .sponsors-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .sponsors-grid {
            grid-template-columns: 1fr;
        }

        .sponsors-header {
            text-align: center;
        }

        .sponsors-description {
            text-align: left;
        }
    }
</style>
