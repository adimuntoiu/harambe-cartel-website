<script lang="ts">
    import Home from "../modules/Home.svelte";
    import About from "../modules/About.svelte";
    import Sponsors from "../modules/Sponsors.svelte";
    import Results from "../modules/Results.svelte";
    import Events from "../modules/Events.svelte";
    import Gallery from "../modules/Gallery.svelte";
    import Members from "../modules/Members.svelte";
    import BackgroundSplashes from "$lib/components/BackgroundSplashes.svelte";
    import "../styles/main.css";
    import { onMount } from "svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import Settings from "$lib/components/Settings.svelte";

    const sections = [
        "home",
        "about",
        "sponsors",
        "members",
        "events",
        "results",
        "gallery",
    ];
    let currentSectionIndex = 0;
    let isScrolling = false;
    let isSidebarOpen = false;

    let container: HTMLDivElement;

    function scrollToSection(index: number) {
        if (index < 0 || index >= sections.length) return;

        currentSectionIndex = index;
        const sectionId = sections[index];
        const element = document.getElementById(sectionId);

        if (element && container) {
            // Use container.scrollTo for more reliable scrolling with overflow: hidden
            container.scrollTo({
                top: element.offsetTop,
                behavior: "smooth",
            });
            // Update URL hash without triggering hashchange
            history.pushState(null, "", `#${sectionId}`);
        }
    }

    function handleWheel(event: WheelEvent) {
        if (isScrolling) return;

        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 1 second debounce

        if (event.deltaY > 0) {
            scrollToSection(currentSectionIndex + 1);
        } else {
            scrollToSection(currentSectionIndex - 1);
        }
    }

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        const index = sections.indexOf(hash);
        if (index !== -1) {
            currentSectionIndex = index;
        }
    }

    onMount(() => {
        // Handle initial hash
        handleHashChange();
        // distinct from scrollToSection to avoid animation on load if desired,
        // but consistency is fine here.
        if (currentSectionIndex !== 0) {
            setTimeout(() => scrollToSection(currentSectionIndex), 100);
        }

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("hashchange", handleHashChange);
        };
    });
</script>

<video
    class="background-video"
    src="src/assets/background_lines.mp4"
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

<div class="container" bind:this={container}>
    <section id="home"><Home /></section>
    <section id="about"><About /></section>
    <section id="sponsors"><Sponsors /></section>
    <section id="members"><Members /></section>
    <section id="events"><Events /></section>
    <section id="results"><Results /></section>
    <section id="gallery"><Gallery /></section>
</div>
