const apiKey = '466cd1c8ca0bb020dd46b0ba21dd3374';

function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  if (data.cod === 200) {
    const icon = data.weather[0].icon;
    weatherInfo.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"/>
      <p><strong>${data.weather[0].description}</strong></p>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      <p>🔵 Pressure: ${data.main.pressure} hPa</p>
    `;
  } else {
    weatherInfo.innerHTML = `<p>⚠️ City not found.</p>`;
  }
}

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (city === '') {
    alert("Please enter a city name!");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(displayWeather)
    .catch(error => {
      document.getElementById('weatherInfo').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(displayWeather)
        .catch(error => {
          document.getElementById('weatherInfo').innerHTML = `<p>Error: ${error.message}</p>`;
        });
    }, () => {
      alert("Unable to fetch location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
