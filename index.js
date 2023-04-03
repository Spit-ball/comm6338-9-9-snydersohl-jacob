const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const key = "1571522051a8ada1791d1447e733a8b1";
const form = document.querySelector('form');

// Weather form input
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityLoc = document.getElementById('weather-search').value;
    try {
        const response = await fetch(`${URL}${cityLoc}&appid=${key}`);
        console.log(response)
        const data = await response.json();
        const cityName = `${data.name},`;
        const countryCode = data.sys.country;
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const weatherDesc = data.weather[0].description;
        const actualTemp = ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2);
        const feelsLike = ((data.main.feels_like - 273.15) * 9 / 5 + 32).toFixed(2);
        const timeLastUpdated = data.dt;

        displayWeatherData(cityName, countryCode, googleMapsLink, weatherIconUrl, weatherDesc, actualTemp, feelsLike, timeLastUpdated);
    } catch (err) {
        const weatherSection = document.getElementById('weather');
        weatherSection.innerHTML = "";
        const ccDisplay = document.createElement('h2');
        ccDisplay.textContent = "Location Not Found";
        weatherSection.appendChild(ccDisplay);
        console.log(err);
    }
    form.reset();
});

const displayWeatherData = (cityName, countryCode, googleMapsLink, weatherIconUrl, weatherDesc, actualTemp, feelsLike, timeLastUpdated) => {
    const weatherSection = document.getElementById('weather');
    weatherSection.innerHTML = "";

    if (!cityName) {
        const ccDisplay = document.createElement('h2');
        ccDisplay.textContent = "Location Not Found";
        weatherSection.appendChild(ccDisplay);
    } else {
        // City & Country Display
        const ccDisplay = document.createElement('h2');
        ccDisplay.textContent = `${cityName} ${countryCode}`;
        weatherSection.appendChild(ccDisplay);

        // Click to view map display
        const mapLink = document.createElement('a');
        mapLink.href = googleMapsLink;
        mapLink.target = '_blank';
        mapLink.textContent = 'Click to view map';
        const mapLinkContainer = document.createElement('p');
        mapLinkContainer.appendChild(mapLink);
        weatherSection.appendChild(mapLinkContainer);

        // Weather icon display
        const weatherIcon = document.createElement('img');
        weatherIcon.src = weatherIconUrl;
        weatherSection.appendChild(weatherIcon);

        // Weather description display
        const weatherDescDisplay = document.createElement('p');
        weatherDescDisplay.textContent = weatherDesc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        weatherSection.appendChild(weatherDescDisplay);

        // Actual temp display
        const actualTempDisplay = document.createElement('p');
        actualTempDisplay.textContent = `Temperature: ${actualTemp} F`;
        weatherSection.appendChild(actualTempDisplay);

        // Feels like display
        const feelsLikeDisplay = document.createElement('p');
        feelsLikeDisplay.textContent = `Feels like: ${feelsLike} F`;
        weatherSection.appendChild(feelsLikeDisplay);

        // Last update display
        const timeLastUpdatedDisplay = document.createElement('p');
        timeLastUpdatedDisplay.textContent = `Last updated: ${new Date(timeLastUpdated * 1000).toLocaleString()}`;
        weatherSection.appendChild(timeLastUpdatedDisplay);
    }
};
