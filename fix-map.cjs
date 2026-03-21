const fs = require('fs');
const path = 'src/routes/map/+page.svelte';
let code = fs.readFileSync(path, 'utf8');

// Replace let map: any; let markers: any;
code = code.replace(
  `    let map: any;
    let markers: any;`,
  `    // Non-reactive to prevent Svelte 5 proxies from crashing Leaflet
    const mRefs: { map: any, markers: any } = { map: null, markers: null };
    let mapReady = false; // reactive boolean so we know when map is ready`
);

code = code.replace(/map = L\.map/g, 'mRefs.map = L.map');
code = code.replace(/map\.on\(/g, 'mRefs.map.on(');
code = code.replace(/map\.remove\(/g, 'mRefs.map.remove(');
code = code.replace(/L\.control\.zoom\(\{ position: "bottomleft" \}\)\.addTo\(map\);/g, 'L.control.zoom({ position: "bottomleft" }).addTo(mRefs.map);');
code = code.replace(/L\.tileLayer\(\n                    "https:\/\/{s}\.tile\.openstreetmap\.org\/{z}\/{x}\/{y}\.png",\n                \)\.addTo\(map\);/g, 'L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mRefs.map);');
code = code.replace(/markers = \(L as any\)\.markerClusterGroup/g, 'mRefs.markers = (L as any).markerClusterGroup');
code = code.replace(/if \(map\) \{/g, 'if (mRefs.map) {');
code = code.replace(/if \(browser && map\) \{/g, 'if (browser && mapReady) {');
code = code.replace(/if \(!allTeams\.length \|\| !map\) return;/g, 'if (!allTeams.length || !mRefs.map) return;');
code = code.replace(/if \(!markers \|\| !map\) return;/g, 'if (!mRefs.markers || !mRefs.map) return;');
code = code.replace(/markers\.clearLayers\(\);/g, 'mRefs.markers.clearLayers();');
code = code.replace(/map\.addLayer\(markers\);/g, 'mRefs.map.addLayer(mRefs.markers);');
code = code.replace(/markers\.addLayer\(marker\);/g, 'mRefs.markers.addLayer(marker);');
code = code.replace(/if \(map && target\.coordinates\) \{/g, 'if (mRefs.map && target.coordinates) {');
code = code.replace(/map\.setView\(/g, 'mRefs.map.setView(');

// Set mapReady to true after initialization
code = code.replace(/renderMap\(L\);/g, 'renderMap(L);\n                    mapReady = true;');

fs.writeFileSync(path, code);
