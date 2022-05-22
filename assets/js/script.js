// Open Weather API key 18ef42aafc64b56f80b4c7a1690f47fd

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={18ef42aafc64b56f80b4c7a1690f47fd}

// OpenWeather City Search http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}


var apiKey = "18ef42aafc64b56f80b4c7a1690f47fd";



var latLonArray = [];;
var forecastArray = [];

// parameters from API current.dt current.temp current.humidity current.wind_speed current.weather.icon current.uvi
// daily.dt daily.temp daily.humidity daily.wind_speed daily.weather.icon daily.uvi

var searchBtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#citySearch');
var day0 = document.querySelector('#day0');
var icon0 = document.querySelector('#icon0');
var temp0 = document.querySelector('#temp0');
var wind0 = document.querySelector('#wind0');
var humid0 = document.querySelector('#humid0');
var city = document.querySelector('#city');
var forecast = document.querySelector('#forecast');






var searchBtnHandler = function (event) {
    event.preventDefault();
    console.log(citySearch.value)
    var cityCoordURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + citySearch.value + "&limit=5&appid=" + apiKey;

    fetch(cityCoordURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecastArray = data
            console.log("data", data)
            var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + apiKey;
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    forecastArray = data.results
                    console.log("data", data)

                    var forecastHTML = [];
                    for(var i =1; i<6; i++) {
                        var day = new Date (data.daily[i].dt*1000);

var template = `<div class="container">
<div class="row">
    <div class="col-2">
        <div class="border col-10 p-3">
            <h3><span id="day1">${day}</span></h3>
            <i id="icon1"></i>
            <p>Temp: <span id="temp1">${data.daily[i].temp.day}</span></p>
            <p>Wind: <span id="wind1">${data.daily[i].wind_speed}</span></p>
            <p>Humidity: <span id="humid1">${data.daily[i].humidity}</span></p>
        </div>
    </div>
    </div>
</div>`
forecastHTML.push(template);
                    }
                    var completeForecast = forecastHTML.join("");
                    forecast.innerHTML = completeForecast
                })
        })};


    searchBtn.addEventListener('click', searchBtnHandler);
