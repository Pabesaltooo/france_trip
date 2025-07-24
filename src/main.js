// Main map logic
import { routes, locations, checkpoints } from '../data/tripData.js';

// Expose ORS_API_KEY from apikey.js (should be loaded globally)
// import { ORS_API_KEY } from '../data/apikey.js';

window.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map', {
        zoomControl: true,
        attributionControl: false
    }).setView([45, 0], 6);
    const initialView = [45, 0];
    const initialZoom = 6;

    // Use CartoDB Voyager tiles for a modern look
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add Reset View button
    const resetBtn = L.control({ position: 'topleft' });
    resetBtn.onAdd = function () {
        const btn = L.DomUtil.create('button', 'reset-view-btn');
        btn.innerHTML = '🔄 Vista inicial';
        btn.style.background = '#fff';
        btn.style.border = '1.5px solid #d0d6e0';
        btn.style.borderRadius = '10px';
        btn.style.padding = '7px 14px';
        btn.style.margin = '12px';
        btn.style.fontSize = '1.08em';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 2px 8px rgba(60,60,90,0.10)';
        btn.onclick = () => map.setView(initialView, initialZoom);
        return btn;
    };
    resetBtn.addTo(map);

    // Custom marker icon for start/end
    const startIcon = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
        iconSize: [28, 42],
        iconAnchor: [14, 42],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });
    const endIcon = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
        iconSize: [28, 42],
        iconAnchor: [14, 42],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    // Info panel update helper
    function updateInfoPanel(html) {
        const panel = document.querySelector('.info-panel .info-panel-content');
        if (panel) panel.innerHTML = html;
    }
    // Restore default info
    function restoreInfoPanel() {
        updateInfoPanel('🗺️ <b>Ruta Francia Julio 2025</b> &mdash; Explora los castillos y pueblos del Loira.<br>Toca los iconos para ver detalles. Haz zoom para descubrir más.');
    }

    async function fetchWikipediaInfo(title) {
        const cleanTitle = title.replace(/\s*\(.+\)/, '');
        const cached = getCachedWiki(cleanTitle);
        if (cached) return cached;

        const apiUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTitle)}`;
        try {
            const res = await fetch(apiUrl);
            if (!res.ok) return null;
            const data = await res.json();
            const parsed = {
                title: data.title,
                extract: data.extract,
                img: data.thumbnail ? data.thumbnail.source : null,
                url: data.content_urls?.desktop?.page ?? null
            };
            setCachedWiki(cleanTitle, parsed);
            return parsed;
        } catch {
            return null;
        }
    }


    function addCheckpoints() {
        for (const cp of checkpoints) {
            const marker = L.marker(cp.coords, {
                icon: L.divIcon({
                    html: `<div style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;background:rgba(255,255,255,0.85);border-radius:50%;border:2px solid #e0e6ef;box-shadow:0 2px 8px #bbb2;filter:drop-shadow(0 0 4px #fff);font-size:2.1rem;">${cp.emoji}</div>`,
                    className: '',
                    iconSize: [44, 44],
                    iconAnchor: [22, 22]
                })
            })
                .bindTooltip(`<b>${cp.name}</b>`, { permanent: false, direction: 'top', className: 'custom-tooltip' })
                .bindPopup(`<div style='font-size:1.13em;'><b>${cp.emoji} ${cp.name}</b></div>`);
            // On marker click, show Wikipedia info in panel
            marker.on('click', async function () {
                updateInfoPanel(`<div class='panel-loading'><b>${cp.emoji} ${cp.name}</b><br>Cargando descripción...</div>`);
                let wiki = null;
                try {
                    wiki = await fetchWikipediaInfo(cp.wiki || cp.name);
                } catch { }
                if (wiki) {
                    updateInfoPanel(`
            <div class='panel-title'><b>${cp.emoji} <a href='${wiki.url}' target='_blank' style='color:#2d3557;text-decoration:underline;'>${wiki.title}</a></b></div>
            ${wiki.img ? `<div class='panel-img-wrap'><img src='${wiki.img}' alt='${wiki.title}' class='panel-img'></div>` : ''}
            <div class='panel-desc'>${wiki.extract}</div>
            <div class='panel-link'><a href='${wiki.url}' target='_blank'>Ver en Wikipedia</a></div>
          `);
                } else {
                    updateInfoPanel(`<div class='panel-title'><b>${cp.emoji} ${cp.name}</b></div><div class='panel-desc'>No se encontró descripción en Wikipedia.<br>Coordenadas: ${cp.coords[0].toFixed(4)}, ${cp.coords[1].toFixed(4)}</div>`);
                }
            });
            marker.on('popupclose', restoreInfoPanel);
            marker.addTo(map);
        }
    }

    addCheckpoints();

    async function fetchRoute(coords) {
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
        const body = {
            coordinates: coords.map(([lat, lng]) => [lng, lat])
        };
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': ORS_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) return null;
        return res.json();
    }

    async function drawRoutes() {
        for (const r of routes) {
            const latlngs = r.points.map(p => locations[p]);
            // Draw markers
            latlngs.forEach((latlng, i) => {
                let marker;
                if (i === 0) {
                    marker = L.marker(latlng, { icon: startIcon });
                } else if (i === latlngs.length - 1) {
                    marker = L.marker(latlng, { icon: endIcon });
                } else {
                    marker = L.circleMarker(latlng, {
                        radius: 10,
                        color: r.color,
                        fillColor: "#fff",
                        fillOpacity: 0.98,
                        weight: 3,
                        opacity: 1,
                        className: 'route-marker'
                    });
                }
                marker.bindPopup(`<div style='font-size:1.08em;'><b>${r.points[i]}</b><br><button class='show-route-on-panel' style='margin-top:7px;padding:4px 10px;border-radius:7px;border:1px solid #d0d6e0;background:#f3f6fa;cursor:pointer;'>Ver etapa</button></div>`).addTo(map);
                marker.on('popupopen', function (e) {
                    setTimeout(() => {
                        const btn = document.querySelector('.show-route-on-panel');
                        if (btn) btn.onclick = () => {
                            updateInfoPanel(`<b>Etapa: ${r.date}</b><br>${r.points.map((p, idx) => `${idx === 0 ? '🚩' : idx === r.points.length - 1 ? '🏁' : '•'} ${p}`).join('<br>')}`);
                        };
                    }, 100);
                });
                marker.on('popupclose', restoreInfoPanel);
            });
            // Fetch and draw real route
            if (latlngs.length > 1) {
                const geojson = await fetchRoute(latlngs);
                const lineStyle = { color: r.color, weight: 5, opacity: 0.95, dashArray: "6 6" };
                const outlineStyle = { color: '#000', weight: 10, opacity: 0.25, dashArray: "6 6" };
                if (geojson && geojson.features && geojson.features[0]) {
                    // Draw outline first
                    L.geoJSON(geojson, { style: outlineStyle }).addTo(map);
                    // Then draw colored line
                    L.geoJSON(geojson, { style: lineStyle })
                        .bindPopup(`<b>${r.date}</b><br>${r.points.join(" → ")}`)
                        .addTo(map);
                } else {
                    // fallback to straight line if API fails
                    L.polyline(latlngs, outlineStyle).addTo(map);
                    L.polyline(latlngs, lineStyle)
                        .bindPopup(`<b>${r.date}</b><br>${r.points.join(" → ")}`)
                        .addTo(map);
                }
            }
        }
    }

    drawRoutes();

    // Add a floating legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.background = 'rgba(255,255,255,0.95)';
        div.style.borderRadius = '12px';
        div.style.boxShadow = '0 2px 12px rgba(60,60,90,0.10)';
        div.style.padding = '12px 18px 10px 18px';
        div.style.fontSize = '1.05em';
        div.innerHTML = `
      <b>Leyenda</b><br>
      <span style='font-size:1.3em;'>🏰</span> Castillo<br>
      <span style='font-size:1.3em;'>🏘️</span> Pueblo<br>
      <span style='font-size:1.3em;'>🌿</span> Naturaleza<br>
      <span style='font-size:1.3em;'>⛪</span> Monumento<br>
      <span style='font-size:1.3em;'>🍄</span> Curioso<br>
      <span style='font-size:1.3em;'>🏡</span> Lodge<br>
      <img src='https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png' style='height:18px;vertical-align:middle;'> Inicio<br>
      <img src='https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png' style='height:18px;vertical-align:middle;'> Fin<br>
    `;
        return div;
    };
    //legend.addTo(map);

    function getCachedWiki(title) {
        const key = `wiki_${title}`;
        const cached = localStorage.getItem(key);
        if (!cached) return null;
        try {
            const { data, timestamp } = JSON.parse(cached);
            // Opcional: invalida después de 7 días
            const age = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
            if (age > 7) {
                localStorage.removeItem(key);
                return null;
            }
            return data;
        } catch {
            return null;
        }
    }

    function setCachedWiki(title, data) {
        const key = `wiki_${title}`;
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    }


});



export { locations, routes };
