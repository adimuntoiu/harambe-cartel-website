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
    import {onMount} from "svelte";

    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setTimeout(() => scrollToSection(hash), 100);
        }
    }

    onMount(() => {
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
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