// handling the map
const mymap = L.map('map').setView([0, 0], 1);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

const satelliteIcon = L.icon({
    iconUrl: 'iss-image.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
});

let satelliteMarker = L.marker([0, 0], {icon: satelliteIcon}).addTo(mymap);


// handling the api requests
let apiURL = 'https://api.wheretheiss.at/v1/satellites/25544';

async function fetchData() {
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        document.getElementById('longitude').innerText = 'longitude: ' + data.longitude;
        document.getElementById('latitude').innerText = 'latitude: ' + data.latitude;
        document.getElementById('velocity').innerText = 'velocity: ' + data.velocity + '\nunits: ' + data.units;

        satelliteMarker.setLatLng([data.latitude, data.longitude]);

        L.circle([data.latitude, data.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(mymap);


    } catch (error) {
        console.log('Maximum amount of request per second reached!');
    }


}

setInterval(fetchData, 1500);

