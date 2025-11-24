<script>
    import Home from '../modules/Home.svelte';
    import About from '../modules/About.svelte';
    import Sponsors from '../modules/Sponsors.svelte';
    import Results from '../modules/Results.svelte';
    import Events from '../modules/Events.svelte';
    import Gallery from '../modules/Gallery.svelte';
    import Members from '../modules/Members.svelte'
    import Map from '../modules/Map.svelte';
    import '../styles/main.css';
    import { onMount } from "svelte";

    const sections = ['home', 'about', 'sponsors', 'results', 'events', 'gallery', 'members', 'map'];
    let currentSectionIndex = 0;
    let isScrolling = false;

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        
        currentSectionIndex = index;
        const sectionId = sections[index];
        const element = document.getElementById(sectionId);
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update URL hash without triggering hashchange
            history.pushState(null, null, `#${sectionId}`);
        }
    }

    function handleWheel(event) {
        if (isScrolling) return;

        isScrolling = true;
        setTimeout(() => { isScrolling = false; }, 1000); // 1 second debounce

        if (event.deltaY > 0) {
            scrollToSection(currentSectionIndex + 1);
        } else {
            scrollToSection(currentSectionIndex - 1);
        }
    }

    onMount(() => {
        // Handle initial hash
        const hash = window.location.hash.substring(1);
        const index = sections.indexOf(hash);
        if (index !== -1) {
            currentSectionIndex = index;
            // distinct from scrollToSection to avoid animation on load if desired, 
            // but consistency is fine here.
            setTimeout(() => scrollToSection(index), 100);
        }

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    });
</script>

<video class="background-video" src="src/assets/background_lines.mp4" autoplay loop muted playsinline> </video>

<div class="container">
    <section id="home"> <Home/> </section>
    <section id="about"> <About/> </section>
    <section id="sponsors"> <Sponsors/></section>
    <section id="results"> <Results/> </section>
    <section id="events"> <Events/> </section>
    <section id="gallery"> <Gallery/> </section>
    <section id="members"> <Members/> </section>
    <section id="map"> <Map/> </section>
</div>