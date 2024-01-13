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
                <p class="ml-2">Wind: ${Math.round(currentData.wind.speed)} M/S</p>
                <p class="ml-2">Humidity: ${currentData.main.humidity}%</p>
            </div>
        </div>
    `);
}
