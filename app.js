let apiURL = 'https://api.wheretheiss.at/v1/satellites/25544';

async function fetchData() {
    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        document.getElementById('longitude').innerText = 'longitude: ' + data.longitude;
        document.getElementById('latitude').innerText = 'latitude: ' + data.latitude;
        document.getElementById('velocity').innerText = 'velocity: ' + data.velocity + '\nunits: ' + data.units;
    } catch (error) {
        console.log('Maximum amount of request per second reached!');
    }


}

setInterval(fetchData, 1500);
