<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { language, type Language } from "$lib/stores/settings.js";
    import MapSettings from "../../lib/components/MapSettings.svelte";

    // State Variables
    let map: any;
    let markers: any;
    let allTeams: any[] = [];
    let inactiveTeams: any[] = []; // Store inactive teams separately
    let filteredTeamsMap: any[] = []; // For the map pins
    let dropdownResults: any[] = []; // For the search dropdown (from search page logic)

    // Search & Filter State
    let searchTerm = "";
    let selectedRegion = "";
    let selectedCounty = "";
    let selectedCity = "";
    let showMultiSchool = false;
    let showInactive = false; // New filter state
    let isFilterPanelVisible = false;

    // Data for dropdowns
    let regions: any[] = [];
    let counties: any[] = [];
    let cities: any[] = [];

    // UI Elements References
    let searchResultsElement: HTMLElement;
    let searchInputElement: HTMLInputElement;

    let teamDetailsVisible = false;
    let selectedTeam: any = null;

    let uiScale = 1;

    // Constants
    const DEFAULT_ICON = "/map/team-icons/default.png";

    onMount(async () => {
        if (browser) {
            // Dynamic import to avoid SSR issues with Leaflet
            const L = (await import("leaflet")).default;
            await import("leaflet.markercluster");

            // Initialize Map
            // Check if map container exists
            if (document.getElementById("map")) {
                map = L.map("map", { zoomControl: false }).setView(
                    [45.94, 24.97],
                    7,
                );
                L.control.zoom({ position: "bottomleft" }).addTo(map);
                L.tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                ).addTo(map);

                // Markers Cluster Group
                markers = (L as any).markerClusterGroup({
                    spiderfyOnMaxZoom: true,
                    showCoverageOnHover: false,
                    zoomToBoundsOnClick: true,
                    chunkedLoading: true,
                    maxClusterRadius: 40,
                    iconCreateFunction(cluster: any) {
                        const count = cluster.getChildCount();
                        return L.divIcon({
                            html: `<div class="custom-cluster-icon">${count}</div>`,
                            className: "custom-cluster",
                            iconSize: [40, 40],
                        });
                    },
                });

                // Map Click Handler (Close Details)
                map.on("click", () => {
                    dropdownResults = [];
                    closeDetails();
                });

                // Fetch Data
                try {
                    const res = await fetch("/map/teams.json");
                    const data = await res.json();
                    allTeams = data.teams;

                    // Fetch inactive teams
                    try {
                        const resInactive = await fetch(
                            "/map/inactive_teams.json",
                        );
                        const dataInactive = await resInactive.json();
                        inactiveTeams = dataInactive.teams.map((t: any) => ({
                            ...t,
                            icon: "team-icons/inactive.png", // Force inactive icon
                            isInactive: true, // Marker to identify them easily
                        }));
                    } catch (e) {
                        console.warn("Could not load inactive teams", e);
                        inactiveTeams = [];
                    }

                    filteredTeamsMap = [...allTeams];

                    // Precompute Multi-School flag
                    precomputeMultiSchoolTeams(allTeams);

                    // Initialize Filters
                    regions = [
                        ...new Set(
                            allTeams.map((t) => t.region).filter(Boolean),
                        ),
                    ].sort();
                    counties = [
                        ...new Set(
                            allTeams.map((t) => t.county).filter(Boolean),
                        ),
                    ].sort();
                    cities = [
                        ...new Set(allTeams.map((t) => t.city).filter(Boolean)),
                    ].sort();

                    // Initial Render
                    renderMap(L);
                } catch (err) {
                    console.error("Error loading teams:", err);
                }
            }
        }
    });

    onDestroy(() => {
        if (map) {
            map.remove();
        }
    });

    // --- Search Logic (Ported from /search + map integration) ---
    $: {
        const term = normalizeText(searchTerm.trim());

        // 1. Dropdown Logic (Exact copy of /search logic)
        // Combine active and inactive if showInactive is true, or just use active for dropdowns?
        // User didn't specify, but usually if I filter for inactive, I want to see them in search too.
        // Let's assume search considers the currently "active" set of teams based on filters?
        // Actually, typical search behavior searches EVERYTHING or just what's visible.
        // Let's assume search respects the "Show Inactive" toggle.
        const dataset = showInactive
            ? [...allTeams, ...inactiveTeams]
            : allTeams;

        if (term.length >= 3 && dataset.length > 0) {
            let results: any[] = [];
            dataset.forEach((t: any) => {
                const name = normalizeText(t.teamName || "");
                const number = normalizeText(
                    (t["team-number"] || "").toString(),
                );

                // 1. Main Match
                if (name.includes(term) || number.includes(term)) {
                    results.push({
                        ...t,
                        displayName: t.teamName,
                        displaySubtitle: `#${t["team-number"]}`,
                        originalTeam: t,
                    });
                }

                // 2. Alias Matches
                if (t.alias) {
                    t.alias.forEach((alias: string) => {
                        if (normalizeText(alias).includes(term)) {
                            results.push({
                                ...t,
                                displayName: alias, // Search result title is the Alias
                                displaySubtitle: t.teamName, // Subtitle is the Real Team Name
                                icon: "team-icons/inactive.png", // Force inactive icon
                                originalTeam: t,
                                isAlias: true,
                            });
                        }
                    });
                }
            });

            // unique results? Maybe filter dupes if name matches alias?
            // But usually alias != name.

            dropdownResults = results.slice(0, 3);
        } else {
            dropdownResults = [];
        }

        // 2. Map Filtering Logic (From mapScript.js)
        // We trigger this whenever filters change or search term changes
        if (browser && map) {
            applyFilters();
        }
    }

    // --- Actions ---

    function normalizeText(text: string) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    // Improved Similarity Helpers
    function getLevenshteinDistance(a: string, b: string) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix: number[][] = [];

        // increment along the first column of each row
        var i: number;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        var j: number;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(
                            matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1, // deletion
                        ),
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }

    function getDistance(coord1: number[], coord2: number[]) {
        // Simple Euclidean for "very close" checking (on same scale lat/lng)
        // 1 deg lat is ~111km. 0.001 is ~111m.
        const dLat = coord1[0] - coord2[0];
        const dLng = coord1[1] - coord2[1];
        return Math.sqrt(dLat * dLat + dLng * dLng);
    }

    function areSchoolsSimilar(name1: string, name2: string) {
        const n1 = normalizeText(name1 || "").replace(/[^a-z0-9]/g, "");
        const n2 = normalizeText(name2 || "").replace(/[^a-z0-9]/g, "");

        // Exact match short-circuit
        if (n1 === n2) return true;

        // Length check optimization
        if (Math.abs(n1.length - n2.length) > 5) return false;

        return getLevenshteinDistance(n1, n2) <= 3;
    }

    function precomputeMultiSchoolTeams(teams: any[]) {
        // O(N^2) but N is small (~200)
        teams.forEach((t1: any) => {
            t1.isMultiSchool = false; // Reset

            // Should have coordinates to be co-located
            if (!t1.coordinates || t1.coordinates.length !== 2) return;

            const hasNeighbor = teams.some((t2: any) => {
                if (t1.id === t2.id) return false;
                if (!t2.coordinates || t2.coordinates.length !== 2)
                    return false;

                const dist = getDistance(t1.coordinates, t2.coordinates);
                const similarName = areSchoolsSimilar(
                    t1.schoolName,
                    t2.schoolName,
                );

                // Threshold: ~0.002 degrees (approx 200m)
                return dist < 0.002 && similarName;
            });

            if (hasNeighbor) {
                t1.isMultiSchool = true;
            }
        });
    }

    function applyFilters() {
        if (!allTeams.length || !map) return;

        const term = normalizeText(searchTerm.trim());

        // Combine pools based on filter
        const sourceTeams = showInactive
            ? [...allTeams, ...inactiveTeams]
            : allTeams;

        filteredTeamsMap = sourceTeams.filter((team) => {
            // Text Search (Includes map-specific loose matching)
            const teamName = normalizeText(team.teamName || "");
            const teamNumber = normalizeText(
                (team["team-number"] || "").toString(),
            );
            const schoolName = normalizeText(team.schoolName || "");

            const aliasMatch =
                team.alias &&
                team.alias.some((a: string) => normalizeText(a).includes(term));

            const searchMatch =
                !term ||
                teamName.includes(term) ||
                teamNumber.includes(term) ||
                schoolName.includes(term) ||
                aliasMatch;

            // Dropdown Filters
            const regionMatch =
                !selectedRegion || team.region === selectedRegion;
            const countyMatch =
                !selectedCounty || team.county === selectedCounty;
            const cityMatch = !selectedCity || team.city === selectedCity;

            // Multi School Filter using pre-computed flag
            const schoolMatch = !showMultiSchool || team.isMultiSchool;

            return (
                searchMatch &&
                regionMatch &&
                countyMatch &&
                cityMatch &&
                schoolMatch
            );
        });

        // Re-render map
        import("leaflet").then((module) => {
            renderMap(module.default);
        });
    }

    function renderMap(L: any) {
        if (!markers || !map) return;

        markers.clearLayers();
        map.addLayer(markers);

        filteredTeamsMap.forEach((team) => {
            if (!team.coordinates || team.coordinates.length !== 2) return;

            const iconUrl = team.icon ? `/map/${team.icon}` : DEFAULT_ICON;

            const html = `
            <div class="team-icon-wrapper">
              <img src="${iconUrl}" alt="${team.teamName}" onerror="this.src='${DEFAULT_ICON}'"/>
            </div>
            `;
            const icon = L.divIcon({
                html,
                className: "",
                iconSize: [50, 50],
                iconAnchor: [25, 25],
            });

            const marker = L.marker(team.coordinates, { icon });

            marker.on("click", (e: any) => {
                L.DomEvent.stopPropagation(e);
                openTeamDetails(team);
            });

            markers.addLayer(marker);
        });
    }

    // --- Interactions ---

    // --- UI Methods ---
    function onSearchResultClick(team: any) {
        // If it's an alias wrapper, get the real team
        const target = team.originalTeam || team;

        searchTerm = "";
        dropdownResults = [];

        // Center map
        if (map && target.coordinates) {
            map.setView(target.coordinates, 15);
            // Open marker logic?
            // Need to find marker in cluster layer
            // This is complex with ClusterGroup. Usually zoom is enough.
            // But we should open details.

            // Just open details directly
            selectedTeam = target;
            teamDetailsVisible = true;
        }
    }

    function openTeamDetails(team: any) {
        selectedTeam = team;
        teamDetailsVisible = true;
    }

    function closeDetails() {
        teamDetailsVisible = false;
        selectedTeam = null;
        dropdownResults = [];
    }

    function toggleFilterPanel() {
        isFilterPanelVisible = !isFilterPanelVisible;
    }

    // Cascading Filters
    function updateDropdowns() {
        // Cascading logic for counties and cities
        if (selectedRegion) {
            // Only regions logic for now if needed or rely on applyFilters
        }
        applyFilters();
    }

    function clearFilters() {
        searchTerm = "";
        selectedRegion = "";
        selectedCounty = "";
        selectedCity = "";
        showMultiSchool = false;
        showInactive = false;
        applyFilters();
    }

    const labels: Record<Language, any> = {
        ro: {
            searchPlaceholder: "Caută Nume Echipă, Număr...",
            allRegions: "Toate Regiunile",
            allCounties: "Toate Județele",
            allCities: "Toate Orașele",
            showMultiSchool: "Arată doar școlile cu mai multe echipe",
            showInactive: "Arată Echipe Inactive",
            clear: "Șterge",
            teamNumber: "Număr Echipă:",
            roNumber: "Număr RO:",
            city: "Oraș:",
            county: "Județ:",
            region: "Regiune:",
            school: "Școală:",
            alias: "Alias:",
            website: "Website:",
            ftcscout: "ftcscout:",
            viewProfile: "Vezi Profil",
            pageTitle: "Harta FTC Romania",
        },
        en: {
            searchPlaceholder: "Search Team Name, Number...",
            allRegions: "All Regions",
            allCounties: "All Counties",
            allCities: "All Cities",
            showMultiSchool: "Show only multi-team schools",
            showInactive: "Show Inactive Teams",
            clear: "Clear",
            teamNumber: "Team Number:",
            roNumber: "RO Number:",
            city: "City:",
            county: "County:",
            region: "Region:",
            school: "School:",
            alias: "Alias:",
            website: "Website:",
            ftcscout: "ftcscout:",
            viewProfile: "View Profile",
            pageTitle: "FTC Romania Map",
        },
    };

    // Helpers
    function formatNumbers(text: any) {
        if (!text) return "";
        return String(text).replace(
            /[0-9]+([.,][0-9]+)?/g,
            (match: string) =>
                `<span class="modern-num" style="font-family: 'CocoNumberMix', sans-serif;">${match}</span>`,
        );
    }
</script>

<svelte:head>
    <title>{labels[$language as Language].pageTitle}</title>
    <!-- Leaftlet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css"
    />
    <!-- Existing Styles -->
    <link rel="stylesheet" href="/map/styles.css" />
</svelte:head>

<div class="map-page-container">
    <div
        style="zoom: {uiScale}; position: absolute; top: 0; right: 0; width: 0; height: 0; overflow: visible; pointer-events: none; z-index: 2000;"
    >
        <MapSettings bind:scale={uiScale} />
    </div>
    <!-- Nav Overlay -->
    <div class="nav-overlay" style="zoom: {uiScale}; pointer-events: none;">
        <div class="controls-container">
            <div class="search-bar-row">
                <!-- Home Button -->
                <a
                    href="/"
                    class="btn filter-btn"
                    aria-label="Home"
                    data-sveltekit-reload
                    style="pointer-events: auto;"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        ></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </a>

                <div
                    class="search-container"
                    style="flex: 1; position: relative; pointer-events: auto;"
                >
                    <input
                        type="text"
                        class="search-input"
                        placeholder={labels[$language as Language]
                            .searchPlaceholder}
                        bind:value={searchTerm}
                        bind:this={searchInputElement}
                        on:keydown={(e) => {
                            if (
                                e.key === "Enter" &&
                                dropdownResults.length > 0
                            ) {
                                e.preventDefault();
                                onSearchResultClick(dropdownResults[0]);
                            }
                        }}
                    />
                    <!-- Custom Search Results Dropdown -->
                    {#if dropdownResults.length > 0}
                        <div
                            class="search-results visible"
                            bind:this={searchResultsElement}
                        >
                            {#each dropdownResults as team}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div
                                    class="search-result-item"
                                    on:click|stopPropagation={() =>
                                        onSearchResultClick(team)}
                                >
                                    <img
                                        src={team.icon
                                            ? `/map/${team.icon}`
                                            : DEFAULT_ICON}
                                        class="search-result-icon"
                                        alt="Icon"
                                        on:error={(e) => {
                                            const target =
                                                e.target as HTMLImageElement;
                                            if (target)
                                                target.src = DEFAULT_ICON;
                                        }}
                                    />
                                    <div class="search-result-text">
                                        <span class="search-result-name"
                                            >{team.displayName}</span
                                        >
                                        <span class="search-result-sub"
                                            >{team.displaySubtitle}</span
                                        >
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>

                <button
                    class="btn filter-btn"
                    on:click={toggleFilterPanel}
                    style="pointer-events: auto;"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polygon
                            points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
                        ></polygon>
                    </svg>
                </button>
            </div>

            <!-- Filter Panel -->
            <div
                class="filter-panel"
                class:visible={isFilterPanelVisible}
                id="filterPanel"
                style="pointer-events: auto;"
            >
                <div class="filter-row">
                    <select
                        bind:value={selectedRegion}
                        on:change={updateDropdowns}
                        class="filter-select"
                    >
                        <option value=""
                            >{labels[$language as Language].allRegions}</option
                        >
                        {#each regions as r}
                            <option value={r}>{r}</option>
                        {/each}
                    </select>
                </div>
                <div class="filter-row">
                    <select
                        bind:value={selectedCounty}
                        on:change={updateDropdowns}
                        class="filter-select"
                        disabled={!selectedRegion && counties.length === 0}
                    >
                        <option value=""
                            >{labels[$language as Language].allCounties}</option
                        >
                        {#each counties as c}
                            <option value={c}>{c}</option>
                        {/each}
                    </select>
                </div>
                <div class="filter-row">
                    <select
                        bind:value={selectedCity}
                        on:change={updateDropdowns}
                        class="filter-select"
                        disabled={!selectedCounty && !selectedRegion}
                    >
                        <option value=""
                            >{labels[$language as Language].allCities}</option
                        >
                        {#each cities as c}
                            <option value={c}>{c}</option>
                        {/each}
                    </select>
                </div>
                <div class="filter-row checkbox-row">
                    <input
                        type="checkbox"
                        id="schoolFilter"
                        bind:checked={showMultiSchool}
                        on:change={applyFilters}
                        class="filter-checkbox"
                    />
                    <label for="schoolFilter"
                        >{labels[$language as Language].showMultiSchool}</label
                    >
                </div>
                <!-- Inactive Teams Toggle -->
                <div class="filter-row checkbox-row">
                    <input
                        type="checkbox"
                        id="inactiveFilter"
                        bind:checked={showInactive}
                        on:change={applyFilters}
                        class="filter-checkbox"
                    />
                    <label for="inactiveFilter"
                        >{labels[$language as Language].showInactive}</label
                    >
                </div>
                <div class="filter-row" style="text-align: right;">
                    <button on:click={clearFilters} class="btn small-btn"
                        >{labels[$language as Language].clear}</button
                    >
                </div>
            </div>
        </div>
    </div>

    <!-- Team Details Overlay -->
    <div
        id="teamDetails"
        class:visible={teamDetailsVisible && selectedTeam}
        style="zoom: {uiScale}; pointer-events: auto;"
    >
        <div class="close-btn" on:click={closeDetails} on:keydown={() => {}}>
            ×
        </div>
        {#if selectedTeam}
            <div id="teamContent">
                <div class="team-header">
                    <img
                        src={selectedTeam.icon
                            ? `/map/${selectedTeam.icon}`
                            : DEFAULT_ICON}
                        class="team-logo-large"
                        alt="Logo"
                        on:error={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target) target.src = DEFAULT_ICON;
                        }}
                    />
                    <div class="team-title-group">
                        <h2>{@html formatNumbers(selectedTeam.teamName)}</h2>
                        <h3>{@html formatNumbers(selectedTeam.schoolName)}</h3>
                    </div>
                </div>

                <div class="team-info-row">
                    <strong>{labels[$language as Language].teamNumber}</strong>
                    {@html formatNumbers(selectedTeam["team-number"])}
                </div>
                <div class="team-info-row">
                    <strong>{labels[$language as Language].roNumber}</strong>
                    {@html formatNumbers(selectedTeam["ro-number"])}
                </div>
                <div class="team-info-row">
                    <strong>{labels[$language as Language].city}</strong>
                    {@html formatNumbers(selectedTeam.city || "Romania")}
                </div>
                <div class="team-info-row">
                    <strong>{labels[$language as Language].county}</strong>
                    {@html formatNumbers(selectedTeam.county || "Unknown")}
                </div>
                <div class="team-info-row">
                    <strong>{labels[$language as Language].region}</strong>
                    {@html formatNumbers(selectedTeam.region || "Unknown")}
                </div>
                <div class="team-info-row">
                    <strong>{labels[$language as Language].school}</strong>
                    {@html formatNumbers(selectedTeam.schoolName)}
                </div>
                {#if selectedTeam.alias && selectedTeam.alias.length > 0}
                    <div class="team-info-row">
                        <strong>{labels[$language as Language].alias}</strong>
                        {@html formatNumbers(selectedTeam.alias.join(", "))}
                    </div>
                {/if}

                {#if selectedTeam.website1}
                    <div class="team-info-row">
                        <strong>{labels[$language as Language].website}</strong>
                        <a href={selectedTeam.website1} target="_blank"
                            >{@html formatNumbers(selectedTeam.website1)}</a
                        >
                    </div>
                {/if}
                {#if selectedTeam.website2}
                    <div class="team-info-row">
                        <strong>{labels[$language as Language].ftcscout}</strong
                        >
                        <a href={selectedTeam.website2} target="_blank"
                            >{labels[$language as Language].viewProfile}</a
                        >
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    <!-- Map Container -->
    <div id="map"></div>
</div>

<style>
    /* Ensure the map container takes full space */
    .map-page-container {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    #map {
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    /* Overlay positioning contexts */
    .nav-overlay {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: auto;
        max-width: 90vw;
        z-index: 1000;
        pointer-events: none;
        display: flex;
        justify-content: center;
    }

    .controls-container {
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 600px;
    }

    /* Re-apply crucial styles here to ensure scoped CSS doesn't break everything, 
       although we imported styles.css globally. 
       Basic layout fixes if styles.css relied on specific DOM structure that changed slightly.
    */

    /* Specific overrides for Svelte port if needed */
    .team-overlay-ported {
        display: none;
        position: absolute;
        top: 20px;
        left: 20px;
        width: 350px;
        max-width: 90vw;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        padding: 20px;
        transition: opacity 0.3s ease;
        font-family: "Coco Gothic", sans-serif;
    }

    .search-bar-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        width: 100%;
    }
</style>
