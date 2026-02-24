<script lang="ts">
    import Home from "../modules/Home.svelte";
    import About from "../modules/About.svelte";
    import Sponsors from "../modules/Sponsors.svelte";
    import Results from "../modules/Results.svelte";
    import Events from "../modules/Events.svelte";
    import Gallery from "../modules/Gallery.svelte";
    import Members from "../modules/Members.svelte";
    import "../styles/main.css";
    import { onMount } from "svelte";
    import Sidebar from "../lib/components/Sidebar.svelte";
    import Settings from "../lib/components/Settings.svelte";
    import BackgroundSplashes from "../lib/components/BackgroundSplashes.svelte";

    const sections = [
        "home",
        "about",
        "sponsors",
        "members",
        "events",
        "results",
        "gallery",
    ];
    let currentSectionIndex = $state(0);
    let isScrolling = $state(false);
    let isSidebarOpen = $state(false);

    let container: HTMLDivElement | undefined = $state();

    function scrollToSection(index: number) {
        if (index < 0 || index >= sections.length) return;

        currentSectionIndex = index;
        const sectionId = sections[index];
        const element = document.getElementById(sectionId);

        if (element && container) {
            container.scrollTo({
                top: element.offsetTop,
                behavior: "smooth",
            });
            // Update URL hash without triggering hashchange
            history.pushState(null, "", `#${sectionId}`);
        }
    }

    function handleWheel(event: WheelEvent) {
        // Prevent default native scroll behavior on desktop
        if (window.innerWidth > 768) {
            event.preventDefault();
        }

        if (isScrolling) return;

        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 800); // Slightly faster debounce for better feel

        if (event.deltaY > 0) {
            scrollToSection(currentSectionIndex + 1);
        } else {
            scrollToSection(currentSectionIndex - 1);
        }
    }

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        const index = sections.indexOf(hash);
        if (index !== -1 && index !== currentSectionIndex) {
            scrollToSection(index);
        }
    }

    $effect(() => {
        // Add scroll-lock class to html for desktop snapping
        if (window.innerWidth > 768) {
            document.documentElement.classList.add("scroll-locked");
        }

        // Handle initial hash
        handleHashChange();
        if (currentSectionIndex !== 0) {
            setTimeout(() => scrollToSection(currentSectionIndex), 100);
        }

        const handleWheelEvent = (e: WheelEvent) => {
            handleWheel(e);
        };

        window.addEventListener("wheel", handleWheelEvent, { passive: false });
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            document.documentElement.classList.remove("scroll-locked");
            window.removeEventListener("wheel", handleWheelEvent);
            window.removeEventListener("hashchange", handleHashChange);
        };
    });
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

<div class="container" bind:this={container}>
    <section id="home"><Home /></section>
    <section id="about"><About /></section>
    <section id="sponsors"><Sponsors /></section>
    <section id="members"><Members /></section>
    <section id="events"><Events /></section>
    <section id="results"><Results /></section>
    <section id="gallery"><Gallery /></section>
</div>
