// handling the map
const mymap = L.map('map').setView([0, 0], 1);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(mymap);

//making satellite icon
const satelliteIcon = L.icon({
    iconUrl: 'iss-image.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
});

//creating the marker on the map
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

        // center the satellite in the map and the view changes while satellite moving
        mymap.setView(L.latLng(data.latitude, data.longitude), mymap.getZoom());

        // drawing a circle to indicate the path of the satellite
        L.circle([data.latitude, data.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 100
        }).addTo(mymap);


    } catch (error) {
        console.clear();
        console.log('This error may be because of that maximum amount of request per second reached. Report otherwise');
        console.log(error);
    }


}

setInterval(fetchData, 2500);

