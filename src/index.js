//show current date and time:
let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
let week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let now = new Date();
let date = document.querySelector("#time-text");
date.innerHTML = `${
  week[now.getDay()]
} ${now.getHours()}:${now.getMinutes()}, ${
  month[now.getMonth()]
} ${now.getDate()}, ${now.getFullYear()}`;

//conversion between celsius and fahrenheit------------------------------------------------------------------
let unit = "celsius";
let celsiusUnit = document.querySelector("#celsius");
let fahrenheitUnit = document.querySelector("#fahrenheit");

function celsiusClicked(event) {
  event.preventDefault();
  if (unit !== "celsius") {
    unit = "celsius";
    let allDegrees = document.querySelectorAll(".degree");
    allDegrees.forEach(function (degree) {
      degree.innerHTML = Math.round(
        (parseInt(degree.innerHTML, 10) - 32) / 1.8
      );
    });
  }
}

function fahrenheitClicked(event) {
  event.preventDefault();
  if (unit !== "fahrenheit") {
    unit = "fahrenheit";
    let allDegrees = document.querySelectorAll(".degree");
    allDegrees.forEach(function (degree) {
      degree.innerHTML = Math.round(parseInt(degree.innerHTML, 10) * 1.8 + 32);
    });
  }
}

celsiusUnit.addEventListener("click", celsiusClicked);
fahrenheitUnit.addEventListener("click", fahrenheitClicked);
//Search Engine fetch real weather data - weather by city name-----------------------------------
function searchFormFunction(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city-name").value;
  let city = document.querySelector("#city");
  city.innerHTML = searchedCity;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    let temp = response.data.main.temp;
    let currentWeather = document.querySelector(".current-weather span");
    currentWeather.innerHTML = Math.round(temp);
  });
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormFunction);

//Search Engine fetch real weather data - weather by current location-----------------------------------

function manageLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    console.log(response);
    let temp = response.data.main.temp;
    let currentWeather = document.querySelector(".current-weather span");
    currentWeather.innerHTML = Math.round(temp);
    let searchedCity = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = searchedCity;
  });
}

function searchcurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(manageLocation);
}
let currentRequest = document.querySelector("#current");
currentRequest.addEventListener("click", searchcurrentWeather);
