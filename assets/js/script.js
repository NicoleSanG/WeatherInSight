var searchInput = $('#search-input');
var searchButton = $('#search-button');
var currentWeather = $('#today');
var forecastWeather = $('#forecast');
var searchHistory = $('#history');
var locationHistory = $('.location-history');
var apiKey = 'f46a857eb755caad4e4a0e240e4969af';
var localStorageArray = [];

//Function to clear previous search
function clearSearch() {
    localStorage.removeItem('location');
    searchHistory.empty();
}
//Function to display current weather
function displayCurrentWeather(currentData) {
    console.log(currentData);
    currentWeather.html(''); //Clear any existing content within the element before adding new information.
    //Get date and weather conditions icons
    var currentDay = dayjs().format('DD/MM/YYYY');
    var weatherIcon = currentData.weather[0];
    console.log(currentDay);
    //Display current weather information in HTML
    currentWeather.append(`
        <div class="mt-3 jumbotron jumbotron-fluid p-4">
            <div class="container">
                <h2 class="ml-2">${currentData.name} (${currentDay})<img class="ml-4" src="https://openweathermap.org/img/w/${weatherIcon.icon}.png" alt="${weatherIcon.description}"/></h2>
                <p class="ml-2">Temp: ${Math.round(currentData.main.temp)} °C</p>
                <p class="ml-2">Wind: ${Math.round(currentData.wind.speed)} KPH</p>
                <p class="ml-2">Humidity: ${currentData.main.humidity}%</p>
            </div>
        </div>
    `);
}
//Function to display forecast weather for the next 5 days
function displayForecastWeather(forecastData) {
    console.log(forecastData);
    forecastWeather.html(''); //Clear any existing content within the element before adding new information
    //Filters the forecast data to show only information relevant to 12:00 noon.
    var forecastDays = forecastData.list.filter(filterByDateTime);
    console.log(forecastDays);

    var output = '';
    //For loop  to iterate through the forecast days that have been filtered.
    for (let index = 0; index < forecastDays.length; index++) {
        var forecast = forecastDays[index];
        var forecastDay = dayjs(forecast.dt * 1000).format('DD/MM/YYYY');
        var weatherIcon = forecast.weather[0];
        // Add HTML structure for forecast day
        output += `
            <div class="forecast-item shadow-lg p-3 rb-5 bg-white rounded">
                <p class="text-center mb-4 font-weight-bold">${forecastDay}</p>
                <img src="https://openweathermap.org/img/w/${weatherIcon.icon}.png" alt="${weatherIcon.description}"/>
                <p class="mt-4">Temp: ${Math.round(forecast.main.temp)} °C</p>
                <p>Wind: ${Math.round(forecast.wind.speed)} M/S</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
            </div>
        `;
    }
    //Add full forecast to the HTML. 
    forecastWeather.append(`
        <h3 class="d-flex flex-wrap">5 Day Forecast:</h3>
        <div class="forecast-days d-flex flex-row">${output}</div>
    `);
}
//Filters the forecast data to show only information relevant to 12:00 noon
function filterByDateTime(forecastDate) {
    return dayjs(forecastDate.dt_txt).hour() === 12;
}

function addToSearchHistory() {
    var location = searchInput.val();
    //Check if the search field is empty. If so, the function stops and takes no further action.
    if (location == '') {
        return;
    }
    //Check if the location is already in the search history (localStorageArray). If it already exists, the function stops.
    if (localStorageArray.indexOf(location) > -1) {
        return;
    }
    //Checks if there is no search history stored in localStorage. If so, add the current location to the localStorageArray array.
    if (localStorage.getItem('location') == null) {
        localStorageArray.push(location);
    } else {
        localStorageArray = JSON.parse(localStorage.getItem('location'));

        if (localStorageArray.indexOf(location) === -1) {
            localStorageArray.push(location);
        }
    }
    //Add a new button to the search history in the html.
    searchHistory.append(`
        <button data-location="${location}" type="button" class="location-history btn btn-secondary btn-block">${location}</button>
    `);
    //Store search history in local storage
    localStorage.setItem('location', JSON.stringify(localStorageArray));

    clickEventToPreviousButtons();
}
//Function to load previous search terms from local storage.
function localPreviousSearches() {
    if (localStorage.getItem('location') != null) {
        //if there is history in localStorage, get the array and assign it to localStorageArray
        localStorageArray = JSON.parse(localStorage.getItem('location'));
        //For loop to iterate over the array and add buttons to the search history in the HTML
        for (var i = 0; i < localStorageArray.length; i++) {
            var place = localStorageArray[i];
            searchHistory.append(`
                <button data-location="${place}" type="button" class="location-history btn btn-secondary btn-block">${place}</button>
            `);
        }
    }
    clickEventToPreviousButtons();
}

