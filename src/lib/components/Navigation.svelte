<script>
    export let activeSection = "";
</script>

<div class="nav-area">
    <nav class="nav-buttons local-nav">
        <a href="/#home" class="btn" class:selected={activeSection === "home"}
            >HOME</a
        >
        <a href="/#about" class="btn" class:selected={activeSection === "about"}
            >ABOUT US</a
        >
        <a
            href="/#sponsors"
            class="btn"
            class:selected={activeSection === "sponsors"}>SPONSORS</a
        >
        <a
            href="/#results"
            class="btn"
            class:selected={activeSection === "results"}>RESULTS</a
        >
        <a
            href="/#events"
            class="btn"
            class:selected={activeSection === "events"}>EVENTS</a
        >
        <a
            href="/#gallery"
            class="btn"
            class:selected={activeSection === "gallery"}>GALLERY</a
        >
        <a
            href="/#members"
            class="btn"
            class:selected={activeSection === "members"}>MEMBERS</a
        >
    </nav>
    <div class="map-container local-map">
        <a href="/#map" class="btn btn-map">MAP</a>
    </div>
</div>

<style>
    .nav-area {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        align-items: flex-start;
    }

    .local-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        direction: ltr;
        justify-content: flex-start;
    }

    .btn {
        font-family: "Pirulen", sans-serif;
        color: #41dccc;
        text-decoration: none;
        font-size: 1rem;
        border: 1px solid #41dccc;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }

    .btn:hover,
    .btn.selected {
        background: rgba(65, 220, 204, 0.2);
        box-shadow: 0 0 10px rgba(65, 220, 204, 0.4);
    }

    .local-map {
        margin-top: 0;
        padding-right: 0;
        justify-content: flex-start;
        width: 100%;
        direction: ltr;
    }

    .btn-map {
        width: 100%;
        text-align: center;
        box-sizing: border-box;
    }

    @media (max-width: 1024px) {
        .nav-area {
            align-items: center;
            text-align: center;
        }

        .local-nav {
            justify-content: center;
        }
    }
</style>
