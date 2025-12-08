<script>
  export let title = "Home";
  import "../styles/main.css";
  import { onMount } from "svelte";

  let isExpanded = false;
  let isMobile = false;

  const text1 = `Suntem a doua echipă FTC formată în România, compusă din elevi ai Colegiului Național "Moise Nicoară" din Arad, și suntem încântați să facem parte din această competiție de prestigiu care încurajează inovația, colaborarea și dezvoltarea abilităților tehnice.`;
  const text2 = `Numele echipei noastre, "Harambe Cartel", este alcătuit din două elemente cu o semnificație profundă pentru noi: Harambe și termenul cartel. Harambe a fost o gorilă vest-africană care trăia în grădina zoologică din Cincinnati.`;

  function formatNumbers(text) {
    if (!text) return "";
    return text.replace(
      /[0-9,.$]+/g,
      (match) => `<span class="modern-num">${match}</span>`,
    );
  }

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth <= 1024;
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  $: showFullText = !isMobile || isExpanded;
  $: displayedText1 = showFullText ? text1 : text1.slice(0, 120);
</script>

<div class="hero">
  <div class="content-wrapper">
    <div class="left">
      <div class="important-image {isExpanded ? 'shrunk' : ''}">
        <img src="src/assets/robots/fuego.png" alt="Robot" />
      </div>
    </div>

    <div class="right">
      <div class="pirulen-text">
        <h2 class="subtitle">THIS IS</h2>
        <h1 class="title">HARAMBE</h1>
        <h1 class="title">CARTEL</h1>
        <h2 class="subtitle">TEAM 20912 / RO 002</h2>
      </div>

      <div class="text-content">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p
          class="description clickable"
          on:click={() => {
            if (isMobile) isExpanded = !isExpanded;
          }}
          role="article"
        >
          {@html formatNumbers(displayedText1)}
          {#if isMobile && !isExpanded}
            <span class="expand-dots">...</span>
          {/if}
        </p>

        {#if showFullText}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <p
            class="description clickable"
            on:click={() => {
              if (isExpanded) isExpanded = false;
            }}
            role="article"
          >
            {@html formatNumbers(text2)}
          </p>
        {/if}
      </div>

      <nav class="nav-buttons">
        <a href="#home" class="btn">HOME</a>
        <a href="#about" class="btn">ABOUT US</a>
        <a href="#sponsors" class="btn">SPONSORS</a>
        <a href="#members" class="btn">MEMBERS</a>
        <a href="#events" class="btn">EVENTS</a>
        <a href="#results" class="btn">RESULTS</a>
        <a href="#gallery" class="btn">GALLERY</a>
      </nav>
      <div class="map-container">
        <a href="#map" class="btn btn-map">MAP</a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Local overrides for Home page */
  @media (max-width: 768px) {
    .title {
      font-size: clamp(1.5rem, 10vw, 3.5rem) !important; /* Reduced from 15vw */
      line-height: 1;
      width: 100%;
      text-align: right; /* Maintain alignment if needed, usually right or center */
    }
  }
</style>
