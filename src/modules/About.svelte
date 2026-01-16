<script lang="ts">
    import { language, type Language } from "$lib/stores/settings.js";

    function formatNumbers(text: string) {
        if (!text) return "";
        return text.replace(
            /[0-9,.$]+/g,
            (match: string) => `<span class="modern-num">${match}</span>`,
        );
    }

    const text_ro = `Am înființat echipa Harambe Cartel în anul 2016, pornind la drum ca un grup de zece elevi ai Colegiului Național „Moise Nicoară” din Arad. Astăzi, avem deja zece sezoane pline de realizări în spate. Cu peste 30 de evenimente la activ, 7 premii câștigate și peste 100 de noi membri pe care i-am introdus în universul FIRST, ne mândrim cu o moștenire solidă. Am promovat activ valorile STEAM și principiul „Gracious Professionalism” prin peste 100 de acțiuni de outreach, explicându-le tinerilor ce impact major au competițiile de robotică. Dincolo de construcția unui robot inovator, ne concentrăm pe evoluția noastră ca echipă și pe creșterea comunității din care facem parte. Pentru noi, FTC este platforma de dezvoltare personală unde devenim liderii și inovatorii de mâine. Suntem nerăbdători să continuăm această aventură, să inspirăm viitoarele generații și să arătăm cum tehnologia poate modela destine.`;

    const text_en =
        "We founded the Harambe Cartel team in 2016, starting out as a group of ten students from the “Moise Nicoară” National College in Arad. Today, we already have ten seasons full of achievements behind us. With over 30 events to date, 7 awards won, and over 100 new members introduced to the FIRST universe, we are proud of our solid legacy. We have actively promoted STEAM values ​​and the “Gracious Professionalism” principle through over 100 outreach actions, explaining to young people the major impact that robotics competitions have. Beyond building an innovative robot, we focus on our evolution as a team and on growing the community we are part of. For us, FTC is the personal development platform where we become the leaders and innovators of tomorrow. We are eager to continue this adventure, inspire future generations, and show how technology can shape destinies.";

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
            title: "DESPRE NOI",
            subtitle: "ECHIPA 20912 / RO 002",
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
            title: "ABOUT US",
            subtitle: "TEAM 20912 / RO 002",
        },
    };
</script>

<div class="hero">
    <div class="left">
        <div class="title-left">
            <h1>{navLabels[$language as Language].title}</h1>
        </div>
        <h2 class="subtitle">
            {@html formatNumbers(navLabels[$language as Language].subtitle)}
        </h2>

        <p class="description">
            {@html formatNumbers($language === "ro" ? text_ro : text_en)}
        </p>

        <nav class="nav-buttons">
            <a href="#home" class="btn"
                >{navLabels[$language as Language].home}</a
            >
            <a href="#about" class="btn selected"
                >{navLabels[$language as Language].about}</a
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
        <div class="map-container">
            <a href="/map" class="btn btn-map"
                >{navLabels[$language as Language].map}</a
            >
        </div>
    </div>

    <div class="right">
        <div class="important-image team-photo">
            <img src="src/assets/team_photo.png" alt="Team Photo" />
        </div>
    </div>
</div>
