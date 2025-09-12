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
    import { onMount, onDestroy } from "svelte";
   
</script>

<video class="background-video" src="src/assets/background_lines.mp4" autoplay loop muted playsinline> </video>

<div class="container">
  <section> <Home /> </section>
  <section> <About/> </section>
  <section> <Sponsors/></section>
  <section> <Results/> </section>
  <section> <Events/> </section>
  <section> <Gallery/> </section>
  <section> <Members/> </section>
  <section> <Map/> </section>
</div>