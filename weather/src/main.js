import './style.css';
import html from './index.html';

const OPEN_WEATHER_API_KEY = '990c092bd44d1732829bfc49163e7e24';

class Weather {
  fetchCoords(city) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=990c092bd44d1732829bfc49163e7e24`
    )
      .then((response) => response.json())
      .then((data) => this.fetchWeather(data));
  }

  fetchWeather(data) {
    const lat = data[0].lat;
    const lon = data[0].lon;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  }
  displayWeather(data) {
    const description = data.weather[0].main;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const icon = data.weather[0].icon;

    document.getElementById('city').innerText = `Weather In ${search.value}`;
    document.getElementById('temp').innerText = `${temp}°C`;
    document.getElementById('description').innerText = `${description}`;
    document.getElementById('humidity').innerText = `Humidty: ${humidity}%`;
    document.getElementById(
      'wind-speed'
    ).innerText = `Wind Speed: ${windSpeed}km/h`;
  }
}
const search = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
let app = new Weather();

searchBtn.addEventListener('click', () => {
  app.fetchCoords(search.value);
});
