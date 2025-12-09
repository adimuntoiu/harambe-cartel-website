const map = L.map('map', { zoomControl: false }).setView([45.94, 24.97], 7);
L.control.zoom({ position: 'bottomleft' }).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Close overlay when clicking on map
map.on('click', () => {
    const details = document.getElementById('teamDetails');
    if (details.classList.contains('visible')) {
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

    const marker = L.marker(team.coordinates, { icon })

    let currentOpenTeamId = null; // Track open team globally (or outside this scope in real app)

    marker.on('click', (e) => {
        // Prevent map click from firing and immediately closing the overlay
        L.DomEvent.stopPropagation(e);

        const details = document.getElementById('teamDetails');
        const content = document.getElementById('teamContent');

        // Toggle logic: Close if clicking the same team
        if (details.classList.contains('visible') && details.getAttribute('data-team-id') === team.id) {
            details.classList.remove('visible');
            details.removeAttribute('data-team-id');
            return;
        }

        // Populate content
        // Infer city from school name or use placeholder since it's not in JSON
        // Simple heuristic: check if schoolName contains common city names or just use "Romania" as fallback
        const city = "Romania";

        content.innerHTML = `
            <div class="team-header">
                <img src="${team.icon || 'team-icons/default.png'}" class="team-logo-large" alt="Logo">
                <div class="team-title-group">
                    <h2>${team.teamName}</h2>
                    <h3>${team.schoolName}</h3>
                </div>
            </div>
            
            <div class="team-info-row">
                <strong>Team Number:</strong> ${team["team-number"]}
            </div>
            <div class="team-info-row">
                <strong>RO Number:</strong> ${team["ro-number"]}
            </div>
             <div class="team-info-row">
                <strong>City:</strong> ${city}
            </div>
            <div class="team-info-row">
                <strong>School:</strong> ${team.schoolName}
            </div>
            ${team.website1 ? `
            <div class="team-info-row">
                <strong>Website:</strong> <a href="${team.website1}" target="_blank">${team.website1}</a>
            </div>` : ''}
            ${team.website2 ? `
            <div class="team-info-row">
                <strong>ftcscout:</strong> <a href="${team.website2}" target="_blank">View Profile</a>
            </div>` : ''}
            <div class="team-info-row">
                <strong>Region:</strong> ${team.region || 'Unknown'}
            </div>
        `;

        // Show details
        details.setAttribute('data-team-id', team.id);
        details.classList.add('visible');
    });

    marker.addTo(markers);
}

fetch('teams.json')
    .then(res => res.json())
    .then(data => {
        const cityCounts = {};

        data.teams.forEach(team => {
            const iconPath = team.icon || 'team-icons/default.png'; // Updated path
            const img = new Image();
            img.onload = () => {
                createTeamMarker(team, iconPath);
            };
            img.onerror = () => {
                createTeamMarker(team, 'team-icons/default.png'); // Updated path
            };
            img.src = iconPath;

            const key = team.schoolName;
            cityCounts[key] = (cityCounts[key] || 0) + 1;
        });

        map.addLayer(markers);

        L.control({
            position: 'bottomleft',
            onAdd: () => {
                const div = L.DomUtil.create('div', 'city-counts');
                div.innerHTML = `<h4>Teams per School:</h4>${Object.entries(cityCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([school, count]) => `${school}: ${count}`)
                    .join('<br>')
                    }`;
                return div;
            }
        }).addTo(map);
    })
    .catch(err => console.error('Error loading teams.json:', err));

