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

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // days numbered from 0-6
  let day = days[currentDate.getDay()]; //the day is going to be the result of days, which will get its value by correlating the .getDay index with the days object that we've created.

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

  let day1 = document.querySelector("#day-1");
  day1.innerHTML = `${weekDays[currentDate.getDay() + 1]}`;

  let day2 = document.querySelector("#day-2");
  day2.innerHTML = `${weekDays[currentDate.getDay() + 2]}`;

  let day3 = document.querySelector("#day-3");
  day3.innerHTML = `${weekDays[currentDate.getDay() + 3]}`;

  let day4 = document.querySelector("#day-4");
  day4.innerHTML = `${weekDays[currentDate.getDay() + 4]}`;

  let day5 = document.querySelector("#day-5");
  day5.innerHTML = `${weekDays[currentDate.getDay() + 5]}`;
}

getForecastDays();

//

// DEFAULT LOCATION ON LOAD ... searches for a specific city weather
function searchCity(city) {
  let apiKey = "a2b6c35b0519344cba097ba7853d0e6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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
  let apiKey = "a2b6c35b0519344cba097ba7853d0e6f";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// RETRIEVE CURRENT LOCATION WHEN CURRENT LOCATION BUTTON CLICKED (geolocation api on MDN)
function retrieveLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// RECEIVING DATA FROM DEFAULT LOAD OR SEARCH
function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}`;
  document.querySelector("#windspeed").innerHTML = `${Math.round(
    response.data.wind.speed * 3.6
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  document.querySelector("#search-city-input").value = ``;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", retrieveLocation);

//sending to default load
searchCity("Toronto");

// we need 5 day forecast, fahrenheit conversion, icons to reflect weather
