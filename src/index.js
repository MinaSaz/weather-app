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
let dateElement = document.querySelector("#time-text");
dateElement.innerHTML = `${
  week[now.getDay()]
} ${now.getHours()}:${now.getMinutes()}, ${
  month[now.getMonth()]
} ${now.getDate()}, ${now.getFullYear()}`;

//conversion between celsius and fahrenheit------------------------------------------------------------------

let celsiusUnit = document.querySelector("#celsius");
let fahrenheitUnit = document.querySelector("#fahrenheit");
let unit = "celsius";
celsiusUnit.style.fontWeight = "bolder";
function celsiusClicked(event) {
  event.preventDefault();
  if (unit !== "celsius") {
    celsiusUnit.style.fontWeight = "bolder";
    fahrenheitUnit.style.fontWeight = "normal";
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
    fahrenheitUnit.style.fontWeight = "bolder";
    celsiusUnit.style.fontWeight = "normal";
    unit = "fahrenheit";
    let allDegrees = document.querySelectorAll(".degree");
    allDegrees.forEach(function (degree) {
      degree.innerHTML = Math.round(parseInt(degree.innerHTML, 10) * 1.8 + 32);
    });
  }
}
celsiusUnit.addEventListener("click", celsiusClicked);
fahrenheitUnit.addEventListener("click", fahrenheitClicked);
//function to get the weather data from api and update the document from response----------------
function callWatherApi(apiUrl) {
  axios.get(apiUrl).then(function (response) {
    console.log(response);
    let currentWeather = document.querySelector(".current-weather span");
    currentWeather.innerHTML = Math.round(response.data.main.temp);
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let weatherDate = new Date(response.data.dt);
    let dateElement = document.querySelector("#time-text");
    dateElement.innerHTML = `${
      week[weatherDate.getDay()]
    } ${weatherDate.getHours()}:${weatherDate.getMinutes()}, ${
      month[weatherDate.getMonth()]
    } ${weatherDate.getDate()}, ${weatherDate.getFullYear()}`;
  });
}
//Search Engine fetch real weather data by calling weather api by city name-------------------------
function searchFormFunction(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city-name").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  callWatherApi(apiUrl);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormFunction);

//Search Engine fetch real weather data by calling weather api by current location------------------------
function manageLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  callWatherApi(apiUrl);
}
function searchcurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(manageLocation);
}
let currentRequest = document.querySelector("#current");
currentRequest.addEventListener("click", searchcurrentWeather);

//at first load, get the current location and display it's weather---------------------------------------
navigator.geolocation.getCurrentPosition(manageLocation);
