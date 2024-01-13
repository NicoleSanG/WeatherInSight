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
