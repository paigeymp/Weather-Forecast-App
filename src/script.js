// obtaining date and time
function getTodayDate() {
  let date = currentDate.getDate();
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let year = currentDate.getFullYear();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[currentDate.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDate.getMonth()];

  return `${day} ${month} ${date}, ${year}, ${hour}:${minute}`;
}

let currentDate = new Date();
let dateElement = document.querySelector("#current-date-time");
dateElement.innerHTML = getTodayDate(currentDate);

// next 5 days forecast

function getForecastDays() {
  //currentDate defined with getTodayDate function. This might need to be improved.
  let weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  document.querySelector("#day-1").innerHTML = `${
    weekDays[currentDate.getDay() + 1]
  }`;

  document.querySelector("#day-2").innerHTML = `${
    weekDays[currentDate.getDay() + 2]
  }`;

  document.querySelector("#day-3").innerHTML = `${
    weekDays[currentDate.getDay() + 3]
  }`;

  document.querySelector("#day-4").innerHTML = `${
    weekDays[currentDate.getDay() + 4]
  }`;

  document.querySelector("#day-5").innerHTML = `${
    weekDays[currentDate.getDay() + 5]
  }`;
}

getForecastDays();

//

// DEFAULT LOCATION ON LOAD ... searches for a specific city weather
function searchCity(city) {
  let apiKey = "a5c1a8d6ca8307bb18045a8ofa2at259";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// SEARCH ENGINE sends to search(city) which sends to displayWeather
function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

// Receiving current location from geolocation api
function searchLocation(position) {
  let apiKey = "a5c1a8d6ca8307bb18045a8ofa2at259";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// RETRIEVE CURRENT LOCATION WHEN CURRENT LOCATION BUTTON CLICKED (geolocation api on MDN)
function retrieveLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// RECEIVING DATA FROM DEFAULT LOAD OR SEARCH
function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;
  document.querySelector("#current-conditions").innerHTML =
    response.data.condition.description;
  document.querySelector(
    "#current-conditions-icon"
  ).innerHTML = `<img src="${response.data.condition.icon_url}">`;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}`;
  document.querySelector("#windspeed").innerHTML = `${Math.round(
    response.data.wind.speed * 3.6
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.temperature.humidity}`;
  document.querySelector("#search-city-input").value = ``;
  //
  document.querySelector("#format-date").innerHTML = formatDate(
    response.data.time * 1000
  ); //
  getForecast(response);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

// getting Forecast for current or searched city
function getForecast(response) {
  let apiKey = "a5c1a8d6ca8307bb18045a8ofa2at259";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${response.data.city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

// displaying forecast for current or searched city
function displayForecast(response) {
  document.querySelector("#forecast-temp-1").innerHTML = `${Math.round(
    response.data.daily[0].temperature.day
  )}`;
  document.querySelector(
    "#forecast-icon-1"
  ).innerHTML = `<img src="${response.data.daily[0].condition.icon_url}">`;
  document.querySelector("#forecast-description-1").innerHTML =
    response.data.daily[0].condition.description;

  document.querySelector("#forecast-temp-2").innerHTML = `${Math.round(
    response.data.daily[1].temperature.day
  )}`;
  document.querySelector(
    "#forecast-icon-2"
  ).innerHTML = `<img src="${response.data.daily[1].condition.icon_url}">`;
  document.querySelector("#forecast-description-2").innerHTML =
    response.data.daily[1].condition.description;

  document.querySelector("#forecast-temp-3").innerHTML = `${Math.round(
    response.data.daily[2].temperature.day
  )}`;
  document.querySelector(
    "#forecast-icon-3"
  ).innerHTML = `<img src="${response.data.daily[2].condition.icon_url}">`;
  document.querySelector("#forecast-description-3").innerHTML =
    response.data.daily[2].condition.description;

  document.querySelector("#forecast-temp-4").innerHTML = `${Math.round(
    response.data.daily[3].temperature.day
  )}`;
  document.querySelector(
    "#forecast-icon-4"
  ).innerHTML = `<img src="${response.data.daily[3].condition.icon_url}">`;
  document.querySelector("#forecast-description-4").innerHTML =
    response.data.daily[3].condition.description;

  document.querySelector("#forecast-temp-5").innerHTML = `${Math.round(
    response.data.daily[4].temperature.day
  )}`;
  document.querySelector(
    "#forecast-icon-5"
  ).innerHTML = `<img src="${response.data.daily[4].condition.icon_url}">`;
  document.querySelector("#forecast-description-5").innerHTML =
    response.data.daily[4].condition.description;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", retrieveLocation);

//sending to default load
searchCity("Vancouver");

// we need fahrenheit conversion
