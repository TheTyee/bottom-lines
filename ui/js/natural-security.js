//= require leaflet.js

function showMap(data) {
    var map = L.map(data.dom).setView([data.lon, data.lat], data.zoom);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}
