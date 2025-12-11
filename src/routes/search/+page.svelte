<script>
    import { onMount } from "svelte";

    let allTeams = [];
    let searchTerm = "";
    let filteredTeams = [];

    onMount(async () => {
        try {
            const res = await fetch("/map/teams.json");
            const data = await res.json();
            allTeams = data.teams;
        } catch (error) {
            console.error("Failed to load teams:", error);
        }
    });

    // Reactive filtering
    $: {
        const term = normalizeText(searchTerm.trim());
        if (term.length >= 3 && allTeams.length > 0) {
            filteredTeams = allTeams.filter((t) => {
                const name = normalizeText(t.teamName || "");
                const number = normalizeText(
                    (t["team-number"] || "").toString(),
                );
                // Match Start With logic as per map
                return name.startsWith(term) || number.startsWith(term);
            });
        } else {
            filteredTeams = [];
        }
    }

    function normalizeText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    function formatNumber(text) {
        return text; // For now keeping simple, or use font class in HTML
    }
</script>

<div class="search-page-container">
    <div class="search-wrapper">
        <h1 class="page-title">Find a Team</h1>
        <div class="input-container">
            <input
                type="text"
                bind:value={searchTerm}
                class="search-input"
                placeholder="Search Team Name (e.g. Xeo), Number..."
            />
        </div>

        {#if filteredTeams.length > 0}
            <div class="results-list">
                {#each filteredTeams as team}
                    <div class="result-item">
                        <img
                            src={team.icon
                                ? `/map/${team.icon}`
                                : "/map/team-icons/default.png"}
                            alt={team.teamName}
                            class="team-icon"
                            on:error={(e) =>
                                (e.target.src = "/map/team-icons/default.png")}
                        />
                        <div class="team-info">
                            <span class="team-name">{team.teamName}</span>
                            <span class="team-number"
                                >#{team["team-number"]}</span
                            >
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        {#if searchTerm.length >= 3 && filteredTeams.length === 0}
            <div class="no-results">
                No teams found starting with "{searchTerm}"
            </div>
        {/if}
    </div>
</div>

<style>
    /* Fonts should be global, but ensuring fallback */
    @font-face {
        font-family: "CocoNumberMix";
        src: local("Arial"); /* Fallback if not loaded globally */
    }

    .search-page-container {
        display: flex;
        justify-content: center;
        padding-top: 100px; /* Space from top */
        min-height: 100vh;
        background-color: #f5f5f5; /* Light generic background */
    }

    .search-wrapper {
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .page-title {
        font-family: "Pirulen", sans-serif; /* Assumption on global font */
        margin-bottom: 30px;
        color: #333;
    }

    .input-container {
        width: 100%;
        position: relative;
        margin-bottom: 20px;
    }

    .search-input {
        width: 100%;
        padding: 15px 20px;
        border-radius: 30px;
        border: 2px solid #ccc;
        font-size: 1.2rem;
        outline: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: "CocoNumberMix", sans-serif;
        transition: border-color 0.3s;
    }

    .search-input:focus {
        border-color: #007bff; /* Example focus color */
    }

    .results-list {
        width: 100%;
        background: white;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .result-item {
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: background 0.2s;
    }

    .result-item:last-child {
        border-bottom: none;
    }

    .result-item:hover {
        background-color: #f9f9f9;
        padding-left: 20px; /* Slide effect */
    }

    .team-icon {
        width: 40px;
        height: 40px;
        object-fit: contain;
        margin-right: 15px;
        border-radius: 5px;
    }

    .team-info {
        display: flex;
        flex-direction: column;
    }

    .team-name {
        font-weight: bold;
        font-size: 1.1rem;
        font-family: "CocoNumberMix", sans-serif;
    }

    .team-number {
        color: #666;
        font-size: 0.9rem;
        font-family: "CocoNumberMix", sans-serif;
    }

    .no-results {
        color: #888;
        margin-top: 20px;
        font-style: italic;
    }
</style>
