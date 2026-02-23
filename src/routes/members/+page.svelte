<script lang="ts">
    import { language, type Language } from "$lib/stores/settings.js";
    import "../../styles/main.css";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Settings from "$lib/components/Settings.svelte";
    import membersData from "../../members.json" with { type: "json" };

    interface Member {
        name: string;
        role: string;
        rookie_year: string;
        end_year?: string;
        image: string;
        leader?: string;
    }

    const { members } = membersData as { members: Member[] };

    const categoryData = {
        mentors: members.filter((m) =>
            m.image.split("/").pop()?.startsWith("M"),
        ),
        regular: members.filter((m) =>
            m.image.split("/").pop()?.startsWith("m"),
        ),
        peer: members.filter((m) => m.image.split("/").pop()?.startsWith("p")),
    };

    const categoryLabels: Record<Language, any> = {
        ro: {
            mentors: "MENTORI",
            regular: "MEMBRI",
            peer: "PEER-MENTORI",
        },
        en: {
            mentors: "MENTORS",
            regular: "MEMBERS",
            peer: "PEER-MENTORS",
        },
    };

    let activeMember: string | null = null;
    let isMobile = false;

    import { onMount } from "svelte";
    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth <= 768;
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

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
        {#each ["mentors", "regular", "peer"] as catKey}
            {#if categoryData[catKey as keyof typeof categoryData].length > 0}
                <div class="category-section">
                    <div class="category-header">
                        <h2 class="category-title">
                            {categoryLabels[$language as Language][catKey]}
                        </h2>
                        <div class="category-line"></div>
                    </div>

                    <div class="members-grid">
                        {#each categoryData[catKey as keyof typeof categoryData] as member (member.name)}
                            <div
                                class="member-card {member.leader === 'true'
                                    ? 'leader'
                                    : ''}"
                                on:mouseenter={() =>
                                    !isMobile && (activeMember = member.name)}
                                on:mouseleave={() =>
                                    !isMobile && (activeMember = null)}
                                on:click={() =>
                                    isMobile &&
                                    (activeMember =
                                        activeMember === member.name
                                            ? null
                                            : member.name)}
                            >
                                <div
                                    class="image-wrapper"
                                    class:active={activeMember === member.name}
                                >
                                    <img
                                        src="/assets{member.image}"
                                        alt={member.name}
                                        class="member-photo"
                                    />
                                    <div class="info-overlay">
                                        <h3>{member.name}</h3>
                                        <p class="role">{member.role}</p>
                                        <p class="years">
                                            {member.rookie_year}
                                            {#if member.end_year}
                                                - {member.end_year}{/if}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</div>

<style>
    :global(body),
    :global(html) {
        overflow: auto !important;
        height: auto !important;
    }

    .members-page {
        display: flex;
        flex-direction: column;
        width: 100%; /* Changed from 98% for better fit */
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: flex-start;
        gap: 1rem;
        background-color: transparent;
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
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        gap: 6rem;
    }

    .category-section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .category-header {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        width: 100%;
        margin-bottom: 1rem;
    }

    .category-title {
        font-size: 1.8rem;
        font-family: "Pirulen", sans-serif;
        letter-spacing: 2px;
        margin: 0;
        white-space: nowrap;
        color: #41dccc;
    }

    .category-line {
        height: 1px;
        flex: 1;
        background: linear-gradient(90deg, #41dccc 0%, transparent 100%);
        opacity: 0.3;
    }

    .members-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1.5rem;
        width: 100%;
        max-width: 1400px;
        margin: 0;
    }

    .member-card {
        border-radius: 1rem;
        aspect-ratio: 3 / 4;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.4s ease;
    }

    .member-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    .info-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem 1rem;
        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.4) 70%,
            transparent 100%
        );
        transform: translateY(100%);
        transition: transform 0.4s ease;
        text-align: center;
        color: white;
    }

    .image-wrapper.active {
        transform: scale(1.05);
    }

    .image-wrapper.active .info-overlay {
        transform: translateY(0);
    }

    .member-card.leader {
        border: 1px solid rgba(65, 220, 204, 0.5);
    }

    .info-overlay h3 {
        font-size: 1rem;
        margin: 0;
        color: #41dccc;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .info-overlay .role {
        font-size: 0.8rem;
        margin: 0.2rem 0;
        opacity: 0.9;
    }

    .info-overlay .years {
        font-size: 0.7rem;
        opacity: 0.7;
    }

    @media (max-width: 1200px) {
        .members-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    .member-card:hover,
    .member-card:active {
        opacity: 1; /* Ensure no opacity change */
    }

    @media (max-width: 768px) {
        .members-page {
            min-height: 100vh;
            padding-top: 6rem;
            display: flex;
            flex-direction: column;
            overflow: visible;
            height: auto; /* Remove explicit height */
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
            transform: none !important;
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

        .category-title {
            font-size: 1.4rem;
        }

        .category-header {
            gap: 1rem;
        }

        .category-section {
            gap: 1.5rem;
        }

        .bottom-section {
            gap: 4rem;
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
