// State
let allTeams = [];
let filteredTeams = [];

// DOM Elements (will be assigned after load)
let searchInput, filterToggle, filterPanel, searchResults;
let countrySelect, countySelect, citySelect, schoolCheckbox, clearBtn;

// Filter Data
let schoolCounts = {};
let regions = [], counties = [], cities = [];

// Initialize Map
const map = L.map('map', { zoomControl: false }).setView([45.94, 24.97], 7);
L.control.zoom({ position: 'bottomleft' }).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Close overlay when clicking on map
map.on('click', () => {
    const details = document.getElementById('teamDetails');
    if (details && details.classList.contains('visible')) {
        details.classList.remove('visible');
        details.removeAttribute('data-team-id');
    }
});


// Marker cluster setup
const markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    chunkedLoading: true,
    maxClusterRadius: 40,
    iconCreateFunction(cluster) {
        const count = cluster.getChildCount();
        return L.divIcon({
            html: `<div class="custom-cluster-icon">${count}</div>`,
            className: 'custom-cluster',
            iconSize: [40, 40]
        });
    }
});

// Helper to create a marker using an icon URL
function createTeamMarker(team, iconUrl) {
    if (!team.coordinates || team.coordinates.length !== 2) {
        return;
    }

    const html = `
    <div class="team-icon-wrapper">
      <img src="${iconUrl}" alt="${team.teamName}" />
    </div>
  `;
    const icon = L.divIcon({
        html,
        className: '',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });

    const marker = L.marker(team.coordinates, { icon });

    marker.on('click', (e) => {
        // Prevent map click from firing and immediately closing the overlay
        L.DomEvent.stopPropagation(e);
        openTeamDetails(team);
    });

    marker.addTo(markers);
}

// Helper to open team details panel
function openTeamDetails(team) {
    const details = document.getElementById('teamDetails');
    const content = document.getElementById('teamContent');

    // Toggle logic: Close if clicking the same team
    if (details.classList.contains('visible') && details.getAttribute('data-team-id') == team.id) {
        details.classList.remove('visible');
        details.removeAttribute('data-team-id');
        return;
    }

    const iconUrl = team.icon || 'team-icons/default.png';
    // Use city from JSON or fallback to "Romania"
    const city = team.city || "Romania";

    // Format numbers helper
    function formatNumbers(text) {
        if (!text) return "";
        return String(text).replace(
            /[0-9]+([.,][0-9]+)?/g,
            match => `<span class="modern-num" style="font-family: 'CocoNumberMix', sans-serif;">${match}</span>`
        );
    }

    content.innerHTML = `
        <div class="team-header">
            <img src="${iconUrl}" class="team-logo-large" alt="Logo" onerror="this.onerror=null;this.src='team-icons/default.png';">
            <div class="team-title-group">
                <h2>${formatNumbers(team.teamName)}</h2>
                <h3>${formatNumbers(team.schoolName)}</h3>
            </div>
        </div>
        
        <div class="team-info-row">
            <strong>Team Number:</strong> ${formatNumbers(team["team-number"])}
        </div>
        <div class="team-info-row">
            <strong>RO Number:</strong> ${formatNumbers(team["ro-number"])}
        </div>
         <div class="team-info-row">
            <strong>City:</strong> ${formatNumbers(city)}
        </div>
        <div class="team-info-row">
            <strong>County:</strong> ${formatNumbers(team.county || 'Unknown')}
        </div>
        <div class="team-info-row">
            <strong>Region:</strong> ${formatNumbers(team.region || 'Unknown')}
        </div>
        <div class="team-info-row">
            <strong>School:</strong> ${formatNumbers(team.schoolName)}
        </div>
        ${team.website1 ? `
        <div class="team-info-row">
            <strong>Website:</strong> <a href="${team.website1}" target="_blank">${formatNumbers(team.website1)}</a>
        </div>` : ''}
        ${team.website2 ? `
        <div class="team-info-row">
            <strong>ftcscout:</strong> <a href="${team.website2}" target="_blank">View Profile</a>
        </div>` : ''}
    `;

    // Show details
    details.setAttribute('data-team-id', team.id);
    details.classList.add('visible');
}

// Map Rendering Logic
function renderMap(teams) {
    markers.clearLayers();
    map.addLayer(markers); // Ensure markers layer is added to map

    teams.forEach(team => {
        const iconPath = team.icon || 'team-icons/default.png';
        const img = new Image();
        img.onload = () => createTeamMarker(team, iconPath);
        img.onerror = () => createTeamMarker(team, 'team-icons/default.png');
        img.src = iconPath;
    });

    updateCityCounts(teams);
}

// Update City Counts Panel (Bottom Left)
function updateCityCounts(teams) {
    const cityCounts = {};
    teams.forEach(team => {
        const key = team.schoolName || 'Unknown';
        cityCounts[key] = (cityCounts[key] || 0) + 1;
    });

    const htmlContent = `<h4>Teams per School:</h4>${Object.entries(cityCounts)
        .sort((a, b) => b[1] - a[1]) // Sort desc
        .slice(0, 100) // Limit display
        .map(([school, count]) => `${school}: ${count}`)
        .join('<br>')}`;

    const existingControl = document.querySelector('.city-counts');
    if (existingControl) {
        existingControl.innerHTML = htmlContent;
    } else {
        L.control({
            position: 'bottomleft',
            onAdd: function () {
                const div = L.DomUtil.create('div', 'city-counts');
                div.innerHTML = htmlContent;
                return div;
            }
        }).addTo(map);
    }
}

// Filter Logic
function applyFilters() {
    if (!allTeams.length) return; // Ensure data is loaded

    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedRegion = countrySelect.value;
    const selectedCounty = countySelect.value;
    const selectedCity = citySelect.value;
    const showMultiSchool = schoolCheckbox.checked;

    filteredTeams = allTeams.filter(team => {
        // Text Search 
        const searchMatch = !searchTerm ||
            (team.teamName && team.teamName.toLowerCase().includes(searchTerm)) ||
            (team["team-number"] && team["team-number"].includes(searchTerm)) ||
            (team.schoolName && team.schoolName.toLowerCase().includes(searchTerm));

        // Dropdown Filters
        const regionMatch = !selectedRegion || team.region === selectedRegion;
        const countyMatch = !selectedCounty || team.county === selectedCounty;
        const cityMatch = !selectedCity || team.city === selectedCity;

        // Same School Filter
        const schoolMatch = !showMultiSchool || (team.schoolName && schoolCounts[team.schoolName] > 1);

        return searchMatch && regionMatch && countyMatch && cityMatch && schoolMatch;
    });

    renderMap(filteredTeams);
}

function updateDropdowns() {
    // Update County based on Region
    const selectedRegion = countrySelect.value;

    // Filter available counties based on selected region
    const availableCounties = selectedRegion
        ? [...new Set(allTeams.filter(t => t.region === selectedRegion).map(t => t.county).filter(Boolean))].sort()
        : counties;

    // Save current selection if possible
    const currentCounty = countySelect.value;

    countySelect.innerHTML = '<option value="">All Counties</option>';
    availableCounties.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        countySelect.appendChild(opt);
    });

    countySelect.disabled = availableCounties.length === 0;
    if (availableCounties.includes(currentCounty)) {
        countySelect.value = currentCounty;
    }

    // Update City based on County (and Region implicitly)
    const selectedCounty = countySelect.value;

    // Filter cities
    let availableCities = cities;
    if (selectedCounty) {
        availableCities = [...new Set(allTeams.filter(t => t.county === selectedCounty).map(t => t.city).filter(Boolean))].sort();
    } else if (selectedRegion) {
        availableCities = [...new Set(allTeams.filter(t => t.region === selectedRegion).map(t => t.city).filter(Boolean))].sort();
    }

    const currentCity = citySelect.value;

    citySelect.innerHTML = '<option value="">All Cities</option>';
    availableCities.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        citySelect.appendChild(opt);
    });

    citySelect.disabled = availableCities.length === 0;
    if (availableCities.includes(currentCity)) {
        citySelect.value = currentCity;
    }
}

// Event Listeners Setup
function setupEventListeners() {
    filterToggle.addEventListener('click', () => {
        filterPanel.classList.toggle('visible');
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();

        applyFilters(); // Apply general filters on map

        // Trigger if 3 or more letters (length >= 3)
        if (term.length < 3) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }

        // Search Dropdown Logic
        if (allTeams.length === 0) return; // Ensure data is loaded

        // Filter logic: Name starts with OR Number starts with
        const matches = allTeams.filter(t => {
            const name = (t.teamName || '').toLowerCase();
            const number = (t['team-number'] || '').toString();
            // User requirement: "start with those 3 letters [term]"
            return name.startsWith(term) || number.startsWith(term);
        }).slice(0, 8); // Limit result count



        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(t => `
                <div class="search-result-item" data-id="${t.id}">
                    <img src="${t.icon || 'team-icons/default.png'}" class="search-result-icon" alt="Icon" onerror="this.onerror=null;this.src='team-icons/default.png';">
                    <div class="search-result-text">
                        <span class="search-result-name">${t.teamName}</span>
                        <span class="search-result-sub">#${t['team-number']}</span>
                    </div>
                </div>
            `).join('');
            searchResults.style.display = 'block';

            // Add click listeners
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const teamId = item.getAttribute('data-id');
                    const team = allTeams.find(t => t.id == teamId);
                    if (team) {
                        if (team.coordinates) map.setView(team.coordinates, 18); // Zoom to school
                        openTeamDetails(team); // Open team details directly
                        searchResults.style.display = 'none';
                        searchInput.value = team.teamName;
                    }
                });
            });
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (searchInput && !searchInput.contains(e.target) && searchResults && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    countrySelect.addEventListener('change', () => {
        updateDropdowns(); // Update cascades
        applyFilters();
    });

    countySelect.addEventListener('change', () => {
        updateDropdowns(); // Cascades to city
        applyFilters();
    });

    citySelect.addEventListener('change', applyFilters);

    schoolCheckbox.addEventListener('change', applyFilters);

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        countrySelect.value = '';
        // Reset others via updateDropdowns logic or manually
        updateDropdowns(); // Resets county/city lists
        countySelect.value = '';
        updateDropdowns();
        citySelect.value = '';
        schoolCheckbox.checked = false;
        applyFilters();
    });
}

// Initialization Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM Elements
    searchInput = document.getElementById('teamSearch');
    filterToggle = document.getElementById('filterToggle');
    filterPanel = document.getElementById('filterPanel');
    searchResults = document.getElementById('searchResults');

    countrySelect = document.getElementById('countryFilter');
    countySelect = document.getElementById('countyFilter');
    citySelect = document.getElementById('cityFilter');
    schoolCheckbox = document.getElementById('schoolFilter');
    clearBtn = document.getElementById('clearFilters');

    // 2. Setup Listeners
    setupEventListeners();

    // 3. Fetch Data
    fetch('teams.json')
        .then(res => res.json())
        .then(data => {

            allTeams = data.teams;
            filteredTeams = [...allTeams];

            // Process unique values for filters
            regions = [...new Set(allTeams.map(t => t.region).filter(Boolean))].sort();
            counties = [...new Set(allTeams.map(t => t.county).filter(Boolean))].sort();
            cities = [...new Set(allTeams.map(t => t.city).filter(Boolean))].sort();

            // Count teams per school for "Same School" filter
            schoolCounts = {};
            allTeams.forEach(t => {
                if (t.schoolName) schoolCounts[t.schoolName] = (schoolCounts[t.schoolName] || 0) + 1;
            });

            // Populate Regions dropdown
            regions.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r;
                opt.textContent = r;
                countrySelect.appendChild(opt);
            });

            // Initial Render of the map with all teams
            renderMap(allTeams);
        })
        .catch(err => console.error('Error loading teams.json:', err));
});
