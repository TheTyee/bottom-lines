//= require leaflet.js

function showMap(data) {
    var map = L.map(data.dom).setView([data.lon, data.lat], data.zoom);
        L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
                type: 'sat',
                ext: 'jpg',
                attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
                subdomains: '1234'
        }).addTo(map);
}


