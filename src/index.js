//show current date and time:
let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
//------------------------------------------------------------------------------------------------------------

//format timestamp into weeek day----------------------------------------------------------------------------
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  return weekShort[date.getDay()];
}
//function to get the forcast data from api and update the document from response-----------------------------
function callForcastApi(coordinates) {
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    let forcastHTML = '<div class="row justify-content-around">';
    response.data.daily.forEach(function (day, index) {
      if (0 < index && index < 7) {
        forcastHTML += `
              <div class="col-6 col-sm-2 forcast-item">
                <span class="day"> ${formatDay(day.dt)} </span>
                <img src="img/${day.weather[0].icon.substr(0, 2)}.png" alt="" />
                <p>
                  <span class="degree max">${Math.round(day.temp.max)}</span>°
                  <span class="degree min">${Math.round(day.temp.min)}</span>°
                </p>
              </div>
        `;
      }
    });
    forcastHTML += "</div>";
    document.querySelector(".forcast").innerHTML = forcastHTML;
  });
}

//function to get the weather data from api and update the document from response----------------
function callWatherApi(apiUrl) {
  axios.get(apiUrl).then(function (response) {
    let currentWeather = document.querySelector(".current-weather span");
    currentWeather.innerHTML = Math.round(response.data.main.temp);

    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;

    let weatherdescription = document.querySelector("#weatherdescription");
    weatherdescription.innerHTML = response.data.weather[0].description;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;

    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);

    let conditionImg = document.querySelector("#currentConditionImg");
    conditionImg.setAttribute(
      "src",
      `img/${response.data.weather[0].icon.substr(0, 2)}.png`
    );
    conditionImg.setAttribute("alt", response.data.weather[0].description);
    let mainElement = document.querySelector(".main-content");
    mainElement.style.backgroundImage = `linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),url(img/${response.data.weather[0].icon.substr(0, 2)}-big.jpg)`;
    let weatherDate = new Date(response.data.dt * 1000);
    let dateElement = document.querySelector("#time-text");
    dateElement.innerHTML = `${
      week[weatherDate.getDay()]
    } ${weatherDate.getHours()}:${weatherDate.getMinutes()}, ${
      month[weatherDate.getMonth()]
    } ${weatherDate.getDate()}`;

    callForcastApi(response.data.coord);
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
//let currentRequest = document.querySelector("#current");
//currentRequest.addEventListener("click", searchcurrentWeather);

//at first load, get the current location and display it's weather---------------------------------------
navigator.geolocation.getCurrentPosition(manageLocation);
