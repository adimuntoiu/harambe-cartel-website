<script>
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    // State Variables
    let map;
    let markers;
    let allTeams = [];
    let filteredTeamsMap = []; // For the map pins
    let dropdownResults = []; // For the search dropdown (from search page logic)

    // Search & Filter State
    let searchTerm = "";
    let selectedRegion = "";
    let selectedCounty = "";
    let selectedCity = "";
    let showMultiSchool = false;
    let isFilterPanelVisible = false;

    // Data for dropdowns
    let regions = [];
    let counties = [];
    let cities = [];

    // UI Elements References
    let searchResultsElement;
    let searchInputElement;

    let teamDetailsVisible = false;
    let selectedTeam = null;

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
                markers = L.markerClusterGroup({
                    spiderfyOnMaxZoom: true,
                    showCoverageOnHover: false,
                    zoomToBoundsOnClick: true,
                    chunkedLoading: true,
                    maxClusterRadius: 40,
                    iconCreateFunction(cluster) {
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
                    if (teamDetailsVisible) {
                        closeDetails();
                    }
                });

                // Fetch Data
                try {
                    const res = await fetch("/map/teams.json");
                    const data = await res.json();
                    allTeams = data.teams;
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
        if (term.length >= 3 && allTeams.length > 0) {
            dropdownResults = allTeams
                .filter((t) => {
                    const name = normalizeText(t.teamName || "");
                    const number = normalizeText(
                        (t["team-number"] || "").toString(),
                    );
                    return name.includes(term) || number.includes(term);
                })
                .slice(0, 3); // Limit like mapScript did
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

    function normalizeText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    // Improved Similarity Helpers
    function getLevenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];

        // increment along the first column of each row
        var i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        var j;
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

    function getDistance(coord1, coord2) {
        // Simple Euclidean for "very close" checking (on same scale lat/lng)
        // 1 deg lat is ~111km. 0.001 is ~111m.
        const dLat = coord1[0] - coord2[0];
        const dLng = coord1[1] - coord2[1];
        return Math.sqrt(dLat * dLat + dLng * dLng);
    }

    function areSchoolsSimilar(name1, name2) {
        const n1 = normalizeText(name1 || "").replace(/[^a-z0-9]/g, "");
        const n2 = normalizeText(name2 || "").replace(/[^a-z0-9]/g, "");

        // Exact match short-circuit
        if (n1 === n2) return true;

        // Length check optimization
        if (Math.abs(n1.length - n2.length) > 5) return false;

        return getLevenshteinDistance(n1, n2) <= 3;
    }

    function precomputeMultiSchoolTeams(teams) {
        // O(N^2) but N is small (~200)
        teams.forEach((t1) => {
            t1.isMultiSchool = false; // Reset

            // Should have coordinates to be co-located
            if (!t1.coordinates || t1.coordinates.length !== 2) return;

            const hasNeighbor = teams.some((t2) => {
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

        filteredTeamsMap = allTeams.filter((team) => {
            // Text Search (Includes map-specific loose matching)
            const teamName = normalizeText(team.teamName || "");
            const teamNumber = normalizeText(
                (team["team-number"] || "").toString(),
            );
            const schoolName = normalizeText(team.schoolName || "");

            const searchMatch =
                !term ||
                teamName.includes(term) ||
                teamNumber.includes(term) ||
                schoolName.includes(term);

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

    function renderMap(L) {
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

            marker.on("click", (e) => {
                L.DomEvent.stopPropagation(e);
                openTeamDetails(team);
            });

            markers.addLayer(marker);
        });
    }

    // --- Interactions ---

    function onSearchResultClick(team) {
        if (team) {
            searchTerm = team.teamName; // Set input to team name
            dropdownResults = []; // Hide dropdown

            if (map && team.coordinates) {
                map.setView(team.coordinates, 18);
            }
            openTeamDetails(team);
        }
    }

    function openTeamDetails(team) {
        if (selectedTeam && selectedTeam.id === team.id && teamDetailsVisible) {
            closeDetails();
            return;
        }
        selectedTeam = team;
        teamDetailsVisible = true;
    }

    function closeDetails() {
        teamDetailsVisible = false;
        selectedTeam = null;
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
        applyFilters();
    }

    // Helpers
    function formatNumbers(text) {
        if (!text) return "";
        return String(text).replace(
            /[0-9]+([.,][0-9]+)?/g,
            (match) =>
                `<span class="modern-num" style="font-family: 'CocoNumberMix', sans-serif;">${match}</span>`,
        );
    }
</script>

<svelte:head>
    <title>FTC Romania Map</title>
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
    <!-- Nav Overlay -->
    <div class="nav-overlay">
        <div class="controls-container">
            <div class="search-bar-row">
                <!-- Home Button -->
                <a
                    href="/"
                    class="btn filter-btn"
                    aria-label="Home"
                    data-sveltekit-reload
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
                    style="flex: 1; position: relative;"
                >
                    <input
                        type="text"
                        class="search-input"
                        placeholder="Search Team Name, Number..."
                        bind:value={searchTerm}
                        bind:this={searchInputElement}
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
                                        on:error={(e) =>
                                            (e.target.src = DEFAULT_ICON)}
                                    />
                                    <div class="search-result-text">
                                        <span class="search-result-name"
                                            >{team.teamName}</span
                                        >
                                        <span class="search-result-sub"
                                            >#{team["team-number"]}</span
                                        >
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>

                <button class="btn filter-btn" on:click={toggleFilterPanel}>
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
            >
                <div class="filter-row">
                    <select
                        bind:value={selectedRegion}
                        on:change={updateDropdowns}
                        class="filter-select"
                    >
                        <option value="">All Regions</option>
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
                        <option value="">All Counties</option>
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
                        <option value="">All Cities</option>
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
                        >Show only multi-team schools</label
                    >
                </div>
                <div class="filter-row" style="text-align: right;">
                    <button on:click={clearFilters} class="btn small-btn"
                        >Clear</button
                    >
                </div>
            </div>
        </div>
    </div>

    <!-- Team Details Overlay -->
    <div
        id="teamDetails"
        class:visible={teamDetailsVisible}
        class="team-overlay-ported"
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
                        on:error={(e) => (e.target.src = DEFAULT_ICON)}
                    />
                    <div class="team-title-group">
                        <h2>{@html formatNumbers(selectedTeam.teamName)}</h2>
                        <h3>{@html formatNumbers(selectedTeam.schoolName)}</h3>
                    </div>
                </div>

                <div class="team-info-row">
                    <strong>Team Number:</strong>
                    {@html formatNumbers(selectedTeam["team-number"])}
                </div>
                <div class="team-info-row">
                    <strong>RO Number:</strong>
                    {@html formatNumbers(selectedTeam["ro-number"])}
                </div>
                <div class="team-info-row">
                    <strong>City:</strong>
                    {@html formatNumbers(selectedTeam.city || "Romania")}
                </div>
                <div class="team-info-row">
                    <strong>County:</strong>
                    {@html formatNumbers(selectedTeam.county || "Unknown")}
                </div>
                <div class="team-info-row">
                    <strong>Region:</strong>
                    {@html formatNumbers(selectedTeam.region || "Unknown")}
                </div>
                <div class="team-info-row">
                    <strong>School:</strong>
                    {@html formatNumbers(selectedTeam.schoolName)}
                </div>

                {#if selectedTeam.website1}
                    <div class="team-info-row">
                        <strong>Website:</strong>
                        <a href={selectedTeam.website1} target="_blank"
                            >{@html formatNumbers(selectedTeam.website1)}</a
                        >
                    </div>
                {/if}
                {#if selectedTeam.website2}
                    <div class="team-info-row">
                        <strong>ftcscout:</strong>
                        <a href={selectedTeam.website2} target="_blank"
                            >View Profile</a
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
        left: 20px;
        right: 20px;
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
        /* Matches #teamDetails in CSS */
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
