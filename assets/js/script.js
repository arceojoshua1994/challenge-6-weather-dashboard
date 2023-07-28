const apiKey = '786f43eb470747904b392cc38a0feff7';
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('search-history');

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

// Function to display current weather data
function displayCurrentWeather(data) {
  // Display the city name, date, weather icon, temperature, humidity, and wind speed
}

// Function to display 5-day forecast data
function displayForecast(data) {
  // Display the 5-day forecast data
}

// Function to update the search history
function updateSearchHistory(city) {
  // Add the city to the search history section
  // Save the updated search history to localStorage
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city === '') return;

  try {
    const weatherData = await getWeatherData(city);

    // Display the current weather data and 5-day forecast data
    displayCurrentWeather(weatherData);
    displayForecast(weatherData);

    // Update the search history and localStorage
    updateSearchHistory(city);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to handle search history item clicks
function handleSearchHistoryClick(event) {
  const clickedCity = event.target.textContent;
  cityInput.value = clickedCity;
  cityForm.dispatchEvent(new Event('submit'));
}

// Add event listeners
cityForm.addEventListener('submit', handleFormSubmit);
searchHistorySection.addEventListener('click', handleSearchHistoryClick);