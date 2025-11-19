function refreshWeatherData(response) {
  let temperatureELement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="weather-app-icon"
              />`;

  let windSpeedMs = response.data.wind.speed;
  let windSpeedKmh = (windSpeedMs * 3.6).toFixed(1);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${windSpeedKmh} km/h`;
  temperatureELement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}, `;
}

function searchCity(city) {
  let apiKey = "0ef1f93t64c8bao485ffda3401a92d04";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

/*function displayForecast() {
  let forecast = document.querySelector("#forecast");

  forecast.innerHTML = `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">Tue</div>
    <div class="weather-forecast-icon">☀️</div>
    <div class="weather-forecast-temps">
      <div class="weather-forecast-temp">
        <strong>15°</strong>
      </div>
      <div class="weather-forecast-temp">9°</div>
    </div>
  </div>
  `;
}*/ //this isn't working somehow - ask in Slack when you get back from Thailand

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Berlin");
/*displayForecast();*/
