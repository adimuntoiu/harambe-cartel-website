<script lang="ts">
    import { onMount } from "svelte";
    import { language, type Language } from "$lib/stores/settings.js";
    import membersData from "../members.json" with { type: "json" };

    interface Member {
        name: string;
        role: string;
        rookie_year: string;
        end_year?: string;
        image: string;
        leader?: string;
    }

    const { members } = membersData as { members: Member[] };

    const homepageImageNames = [
        "M1.png",
        "m1.png",
        "m2.png",
        "m3.png",
        "m4.png",
        "m5.png",
        "m6.png",
        "m7.png",
        "p1.jpeg",
        "p2.jpeg",
        // Ensure ONLY members are dynamically appended, no peer mentors.
        "m8.png",
        "m9.png",
        "m10.png",
        "m11.png",
        "m12.png",
        "m13.png",
        "m14.png",
        "m16.png",
    ];

    const homepageMembers = homepageImageNames
        .map((imgName) => members.find((m) => m.image.endsWith(imgName)))
        .filter((m): m is Member => !!m);

    let innerWidth = 1920;

    // Dynamically calculate the number of items per row based on screen width.
    $: cols =
        innerWidth > 1400
            ? 8
            : innerWidth > 1100
              ? 6
              : innerWidth > 768
                ? 4
                : 3;

    // Always render exactly 2 filled rows.
    $: displayedHomepageMembers = homepageMembers.slice(0, cols * 2);

    let activeMember: string | null = null;

    let isMobile = false;
    let isExpanded = false;

    const fullText_ro =
        "În acest sezon, echipa noastră este alcătuită din 15 membri și 20 de voluntari. Împreună, învățăm, construim și creștem, străduindu-ne să avem un impact pozitiv în comunitatea noastră și nu numai. Echipa se împarte în 5 departamente, precum: Proiectare 3D, Mecanică, Programare, Design și PR. Aceștia sunt membrii echipei:";

    const fullText_en =
        "This season, our team consists of 15 members and 20 volunteers. Together, we learn, build, and grow, striving to have a positive impact on our community and beyond. The team is divided into 5 departments: 3D Design, Mechanics, Programming, Design, and PR. These are the team members:";

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match: string) => `<span class="modern-num">${match}</span>`,
        );
    }

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
    $: displayedText = showFullText ? currentText : currentText.slice(0, 120);

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
            subtitle: "FĂ CUNOŞTINŢĂ CU",
            title: "MEMBRII<br />NOŞTRI",
            viewAll: "VEZI TOŢI MEMBRII",
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
            subtitle: "MEET OUR",
            title: "MEMBERS",
            viewAll: "VIEW ALL MEMBERS",
        },
    };
</script>

<svelte:window bind:innerWidth />

<div class="members-page">
    <div class="top-grid">
        <div class="subtitle-area">
            <h2 class="subtitle">
                {navLabels[$language as Language].subtitle}
            </h2>
        </div>

        <div class="nav-area">
            <nav class="nav-buttons local-nav">
                <div class="nav-row">
                    <a href="#home" class="btn"
                        >{navLabels[$language as Language].home}</a
                    >
                    <a href="#about" class="btn"
                        >{navLabels[$language as Language].about}</a
                    >
                </div>
                <div class="nav-row">
                    <a href="#sponsors" class="btn"
                        >{navLabels[$language as Language].sponsors}</a
                    >
                    <a href="#members" class="btn selected"
                        >{navLabels[$language as Language].members}</a
                    >
                </div>
                <div class="nav-row">
                    <a href="#events" class="btn"
                        >{navLabels[$language as Language].events}</a
                    >
                    <a href="#results" class="btn"
                        >{navLabels[$language as Language].results}</a
                    >
                </div>
                <div class="nav-row">
                    <a href="#gallery" class="btn"
                        >{navLabels[$language as Language].gallery}</a
                    >
                </div>
            </nav>
            <div class="map-container local-map">
                <a href="/map" class="btn btn-map"
                    >{navLabels[$language as Language].map}</a
                >
            </div>
        </div>

        <div class="title-area">
            <h1 class="title">
                {@html navLabels[$language as Language].title}
            </h1>
        </div>

        <div class="text-area">
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
        </div>
    </div>

    <div class="bottom-section" id="members">
        <div
            class="members-grid"
            style="--cols: {cols}"
            class:shrunk={isExpanded}
        >
            {#each displayedHomepageMembers as member (member.name)}
                <div
                    class="member-card {member.leader === 'true'
                        ? 'leader'
                        : ''}"
                    on:mouseenter={() =>
                        !isMobile && (activeMember = member.name)}
                    on:mouseleave={() => !isMobile && (activeMember = null)}
                    on:click={() =>
                        isMobile &&
                        (activeMember =
                            activeMember === member.name ? null : member.name)}
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
                                {#if member.end_year}
                                    {member.rookie_year} - {member.end_year}
                                {:else}
                                    {$language === "ro"
                                        ? "din "
                                        : "since "}{member.rookie_year}
                                {/if}
                            </p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="view-all-container">
            <a href="/members" class="btn view-all-btn">
                {navLabels[$language as Language].viewAll}
            </a>
        </div>
    </div>
</div>

<style>
    .members-page {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 100vw;
        min-height: 100vh;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: center;
        gap: 1rem;
        overflow-x: hidden;
    }

    .top-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(250px, 0.8fr);
        grid-template-rows: auto auto auto;
        column-gap: 2rem;
        width: 100%;
        align-items: start;
    }

    .subtitle-area {
        grid-column: 1;
        grid-row: 1;
        justify-self: start;
    }

    .title-area {
        grid-column: 1;
        grid-row: 2;
        min-width: 0;
        justify-self: start;
    }

    .text-area {
        grid-column: 1;
        grid-row: 3;
        max-width: 100%;
    }

    .nav-area {
        grid-column: 2;
        grid-row: 2 / span 2;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-self: end;
        width: 100%;
    }

    .title {
        font-size: clamp(2rem, 6.5vw, 6rem);
        line-height: 0.85;
        margin: 0;
        text-transform: uppercase;
        word-wrap: break-word;
        text-align: left;
        justify-self: start;
    }

    .subtitle {
        font-size: clamp(1.2rem, 3.5vw, 3.5rem);
        font-weight: 300;
        margin-bottom: -0.2rem;
        text-align: left;
        justify-self: start;
    }

    @media (min-width: 1920px) {
        .top-grid {
            column-gap: 5rem;
        }

        .title {
            font-size: 10rem;
        }

        .subtitle {
            font-size: 4.8rem;
        }
    }

    @media (max-width: 1300px) and (min-width: 900px) {
        .local-nav {
            display: grid;
            grid-template-columns: repeat(2, max-content);
            justify-content: end;
            gap: 0.75rem 1rem;
        }

        .nav-row {
            display: contents;
        }
    }

    .local-nav {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
    }

    .nav-row {
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        flex-wrap: nowrap;
    }

    .btn {
        padding: 0.9rem 1.6rem;
        white-space: nowrap;
        font-size: clamp(0.8rem, 1.5vw, 1.5rem);
    }

    .bottom-section {
        width: 100%;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .members-grid {
        display: grid;
        grid-template-columns: repeat(var(--cols, 5), 1fr);
        gap: 1rem;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
    }

    .member-card {
        border-radius: 1rem;
        aspect-ratio: 3 / 4;
        transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

    @media (max-width: 1024px) {
        .top-grid {
            grid-template-columns: 1fr 300px;
        }
    }

    @media (max-width: 768px) {
        .top-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 4rem;
        }

        .nav-area {
            display: none;
        }

        .members-grid {
            gap: 0.8rem;
            max-height: none;
            overflow-y: visible;
        }

        .member-card {
            width: 85%;
            margin: 0 auto;
        }

        .members-grid.shrunk {
            max-height: none;
        }
    }
</style>
