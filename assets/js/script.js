// Declare the API key for OpenWeatherMap
const apiKey = "786f43eb470747904b392cc38a0feff7";

// Get references to various HTML elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const searchHistory = document.getElementById("search-history");
const currentWeatherRow = document.getElementById("current-weather");
const forecastRow = document.getElementById("forecast");

// Attach the searchCity function to the click event of the search button
searchBtn.addEventListener("click", searchCity);

// Function to handle the city search
function searchCity() {
  const cityName = cityInput.value;
  if (cityName) {
    // Call the displayWeather function and clear the input field
    displayWeather(cityName);
    cityInput.value = "";
  }
}

// Function to display weather data
function displayWeather(cityName) {
  // Construct URLs for current weather and forecast API calls
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

  // Fetch current weather data
  fetch(currentUrl)
    .then((response) => response.json())
    .then((currentData) => {
      // Call the displayCurrentWeather function and update search history
      displayCurrentWeather(currentData);
      updateSearchHistory(cityName);
    })
    .catch((error) => console.error("Current Weather Error:", error));

  // Fetch forecast data
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((forecastData) => {
      // Call the displayForecast function
      displayForecast(forecastData);
    })
    .catch((error) => console.error("Forecast Error:", error));
}

// Function to display current weather data
function displayCurrentWeather(currentData) {
  // Construct HTML to display current weather
  const currentWeatherHTML = `
    <div class="col-sm-12">
      <h2>${currentData.name} (${dayjs.unix(currentData.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" alt="${currentData.weather[0].description}"></h2>
      <p>Temperature: ${currentData.main.temp} °F</p>
      <p>Humidity: ${currentData.main.humidity}%</p>
      <p>Wind Speed: ${currentData.wind.speed} MPH</p>
    </div>
  `;

  // Update the current weather row with the generated HTML
  currentWeatherRow.innerHTML = currentWeatherHTML;
}

// Function to display forecast data
function displayForecast(forecastData) {
  // Filter forecast data to only include entries at 12:00 PM (every 8th entry)
  const forecastArr = forecastData.list.filter((_, index) => index % 8 === 0);

  // Generate HTML for each forecast card
  const forecastHTML = forecastArr
    .map((forecast) => `
      <div class="col-sm-2 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${dayjs.unix(forecast.dt).format("MM/DD/YYYY")}</h5>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
            <p class="temp">Temp: ${forecast.main.temp} °F</p>
            <p class="wind">Wind: ${forecast.wind.speed} MPH</p>
            <p class="humidity">Humidity: ${forecast.main.humidity}%</p>
          </div>
        </div>
      </div>
    `).join("");

  // Update the forecast row with the generated HTML
  forecastRow.innerHTML = forecastHTML;
}

// Function to update the search history
function updateSearchHistory(cityName) {
  // Create a new list item with a button for the city name
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerHTML = `<button type="button" class="btn btn-secondary w-100">${cityName}</button>`;

  // Append the new list item to the search history
  searchHistory.appendChild(li);

  // Select all search history buttons
const searchHistoryButtons = searchHistory.querySelectorAll("button");

// Loop through the buttons and attach event listeners
searchHistoryButtons.forEach((button) => {
  button.addEventListener("click", function() {
    const cityName = button.textContent.trim();
    displayWeather(cityName);
  });
});
}


