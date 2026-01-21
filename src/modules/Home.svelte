<script lang="ts">
  import "../styles/main.css";
  import { onMount } from "svelte";
  import { language, type Language } from "$lib/stores/settings.js";

  export let title = "Home";

  let isExpanded = false;
  let isMobile = false;

  const text1 = `We are the second FTC team formed in Romania, composed of students from the "Moise Nicoară" National College in Arad, and we are excited to be part of this prestigious competition that encourages innovation, collaboration, and the development of technical skills.`;
  const text2 = `We are excited to participate in the tenth FTC season, continuing to promote the principles of FIRST and demonstrate our passion for robotics and technology.`;
  const text1_ro = `Suntem a doua echipă FTC formată în România, compusă din elevi ai Colegiului Național "Moise Nicoară" din Arad, și suntem încântați să facem parte din această competiție de prestigiu care încurajează inovația, colaborarea și dezvoltarea abilităților tehnice.`;
  const text2_ro = `Participăm cu entuziasm la cel de-al zecelea sezon FTC, continuând să promovăm principiile FIRST și să demonstrăm pasiunea noastră pentru robotică și pentru tehnologie.`;

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

  $: currentText1 = $language === "ro" ? text1_ro : text1;
  $: showFullText = !isMobile || isExpanded;
  $: displayedText1 = showFullText ? currentText1 : currentText1.slice(0, 120);

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
      subtitle1: "ACEASTA ESTE",
      subtitle2: "ECHIPA 20912 / RO 002",
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
      subtitle1: "THIS IS",
      subtitle2: "TEAM 20912 / RO 002",
    },
  };
</script>

<div class="hero">
  <div class="content-wrapper">
    <div class="left">
      <div class="important-image {isExpanded ? 'shrunk' : ''}">
        <img src="/assets/robots/fuego.png" alt="Robot" />
      </div>
    </div>

    <div class="right">
      <div class="pirulen-text">
        <h2 class="subtitle">{navLabels[$language as Language].subtitle1}</h2>
        <h1 class="title">HARAMBE</h1>
        <h1 class="title">CARTEL</h1>
        <h2 class="subtitle">
          {@html formatNumbers(navLabels[$language as Language].subtitle2)}
        </h2>
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
          ></p>
        {/if}
      </div>

      <nav class="nav-buttons">
        <a href="#home" class="btn selected"
          >{navLabels[$language as Language].home}</a
        >
        <a href="#about" class="btn">{navLabels[$language as Language].about}</a
        >
        <a href="#sponsors" class="btn"
          >{navLabels[$language as Language].sponsors}</a
        >
        <a href="#members" class="btn"
          >{navLabels[$language as Language].members}</a
        >
        <a href="#events" class="btn"
          >{navLabels[$language as Language].events}</a
        >
        <a href="#results" class="btn"
          >{navLabels[$language as Language].results}</a
        >
        <a href="#gallery" class="btn"
          >{navLabels[$language as Language].gallery}</a
        >
      </nav>
      <div class="map-container local-map">
        <a href="/map" class="btn btn-map"
          >{navLabels[$language as Language].map}</a
        >
      </div>
    </div>
  </div>
</div>

<style>
  /* Local overrides for Home page */
  @media (max-width: 768px) {
    .title {
      font-size: clamp(1.5rem, 10vw, 3.5rem) !important;
      line-height: 1.1;
      width: 100%;
      text-align: right;
      white-space: normal;
    }
    .subtitle {
      white-space: normal;
    }
  }
</style>
