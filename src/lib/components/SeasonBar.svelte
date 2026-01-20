<script lang="ts">
    import { onMount } from "svelte";
    import {
        seasons,
        selectedSeasonIndex,
        menuStartIndex,
    } from "$lib/stores/season.js";
    import { language, type Language } from "$lib/stores/settings.js";

    export let itemsPerPageDesktop = 5;

    let itemsPerPage = 3;
    let menuContainerWidth: number;

    let isMobile = false;

    function selectSeason(index: number) {
        $selectedSeasonIndex = index;
    }

    function scrollMenu(direction: "left" | "right") {
        if (direction === "left") {
            if ($menuStartIndex > 0) {
                $menuStartIndex--;
            }
        } else {
            if ($menuStartIndex < seasons.length - itemsPerPage) {
                $menuStartIndex++;
            }
        }
    }

    function updateItemsPerPage() {
        if (isMobile) {
            itemsPerPage = seasons.length; // Show all items on mobile for scrolling
        } else {
            itemsPerPage = itemsPerPageDesktop; // Show configured items on desktop
        }

        if ($menuStartIndex > seasons.length - itemsPerPage) {
            $menuStartIndex = Math.max(0, seasons.length - itemsPerPage);
        }
    }

    $: visibleSeasons = seasons.slice(
        $menuStartIndex,
        $menuStartIndex + itemsPerPage,
    );

    $: {
        // Only center when the selection changes, not when the menu scrolls
        if ($selectedSeasonIndex !== undefined && !isMobile) {
            const targetStart =
                $selectedSeasonIndex - Math.floor((itemsPerPage - 1) / 2);
            $menuStartIndex = Math.max(
                0,
                Math.min(targetStart, seasons.length - itemsPerPage),
            );
        }
    }

    onMount(() => {
        const handleResize = () => {
            isMobile = window.innerWidth <= 768;
            updateItemsPerPage();
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
</script>

<div class="season-menu-container" bind:clientWidth={menuContainerWidth}>
    <button
        class="arrow-btn left"
        on:click={() => scrollMenu("left")}
        disabled={$menuStartIndex === 0}
        class:hidden={isMobile}
    >
        &lt;
    </button>

    <div class="season-menu">
        {#each visibleSeasons as season, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="season-item {seasons[$selectedSeasonIndex].id ===
                season.id
                    ? 'active'
                    : ''}"
                on:click={() =>
                    selectSeason(isMobile ? i : $menuStartIndex + i)}
                role="button"
                tabindex="0"
            >
                <img
                    src={season.logo}
                    alt={$language === "ro" ? season.name_ro : season.name_en}
                />
            </div>
        {/each}
    </div>

    <button
        class="arrow-btn right"
        on:click={() => scrollMenu("right")}
        disabled={$menuStartIndex >= seasons.length - itemsPerPage}
        class:hidden={isMobile}
    >
        &gt;
    </button>
</div>

<style>
    .season-menu-container {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.2);
        padding: 1rem;
        border-radius: 1rem;
        gap: 1rem;
        backdrop-filter: blur(5px);
        max-width: 100%;
        width: auto;
        margin-top: 0;
        direction: ltr;
        position: relative;
    }

    .season-menu {
        display: flex;
        gap: 1rem;
        overflow: hidden;
    }

    .season-item {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s;
        opacity: 0.7;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.5rem;
        padding: 5px;
        flex-shrink: 0;
    }

    .season-item:hover {
        transform: scale(1.1);
        opacity: 1;
    }

    .season-item.active {
        opacity: 1;
        border: 2px solid #41dccc;
        background: rgba(65, 220, 204, 0.2);
    }

    .season-item img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .arrow-btn {
        background: none;
        border: none;
        color: white;
        font-family: "Pirulen", sans-serif;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 0.5rem;
        transition: color 0.2s;
    }

    .arrow-btn:hover:not(:disabled) {
        color: #41dccc;
    }

    .arrow-btn:disabled {
        color: rgba(255, 255, 255, 0.2);
        cursor: default;
    }

    .arrow-btn.hidden {
        display: none;
    }

    @media (max-width: 768px) {
        .season-menu-container {
            padding: 0.5rem;
            gap: 0; /* Remove gap between container edges and menu */
            justify-content: center;
            width: 100%; /* Take full width */
            max-width: 100%;
            overflow: hidden; /* Container hides overflow */
        }

        .season-menu {
            gap: 0.5rem;
            overflow-x: auto; /* Enable horizontal scroll */
            width: 100%;
            padding: 0.5rem; /* Add padding inside for scroll space */
            justify-content: flex-start; /* items start from left */
            align-items: center;
            /* Hide scrollbar for cleaner look */
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }

        .season-menu::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
        }

        .season-item {
            width: 50px;
            height: 50px;
            padding: 3px;
        }
    }
</style>
