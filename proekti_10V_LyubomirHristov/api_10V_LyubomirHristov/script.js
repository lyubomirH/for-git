function getCity() {
    fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=42.6977&longitude=23.3242&localityLanguage=en")
        .then(response => response.json())
        .then(data => {

            document.getElementById('city').textContent = data.city || "N/A";
            document.getElementById('country').textContent = data.countryName || "N/A";
            document.getElementById('latitude').textContent = data.latitude || "N/A";
            document.getElementById('longitude').textContent = data.longitude || "N/A";
            document.getElementById('locality').textContent = data.locality || "N/A";
        })
        .catch(error => {
            document.getElementById('city').textContent = "Error loading data";
            document.getElementById('country').textContent = "Error loading data";
            document.getElementById('latitude').textContent = "Error loading data";
            document.getElementById('longitude').textContent = "Error loading data";
            document.getElementById('locality').textContent = "Error loading data";
        });
}

getCity();