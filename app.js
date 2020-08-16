// handling the map
const mymap = L.map('map').setView([0, 0], 1);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

let satelliteMarker = L.marker([0, 0]).addTo(mymap);


// handling the api requests
let apiURL = 'https://api.wheretheiss.at/v1/satellites/25544';

async function fetchData() {
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        document.getElementById('longitude').innerText = 'longitude: ' + data.longitude;
        document.getElementById('latitude').innerText = 'latitude: ' + data.latitude;
        document.getElementById('velocity').innerText = 'velocity: ' + data.velocity + '\nunits: ' + data.units;

        satelliteMarker.setLatLng([data.longitude, data.latitude]);


    } catch (error) {
        console.log('Maximum amount of request per second reached!');
    }


}

setInterval(fetchData, 1500);

