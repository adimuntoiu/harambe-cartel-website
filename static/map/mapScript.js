const map = L.map('map', { zoomControl: false }).setView([45.94, 24.97], 7);
L.control.zoom({ position: 'bottomleft' }).addTo(map);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

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

    marker.bindPopup(`
        <b>${team.teamName}</b><br>
        ${team.schoolName}<br>
        ${team.website1 ? `<a href="${team.website1}" target="_blank">Website</a>` : ''}
    `).addTo(markers);
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

