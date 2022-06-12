// Open Weather API key 18ef42aafc64b56f80b4c7a1690f47fd

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={18ef42aafc64b56f80b4c7a1690f47fd}

// OpenWeather City Search https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}


var apiKey = "18ef42aafc64b56f80b4c7a1690f47fd";
var latLonArray = [];;
var forecastArray = [];

// parameters from API current.dt current.temp current.humidity current.wind_speed current.weather.icon current.uvi
// daily.dt daily.temp daily.humidity daily.wind_speed daily.weather.icon daily.uvi

var searchBtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#citySearch');
var city = document.querySelector('#city');
var forecast = document.querySelector('#forecast');
var current = document.querySelector('#current');
var history = document.querySelector('#history');
var searchList = document.querySelector('#searchList');
var searchHistory = JSON.parse(localStorage.getItem('search')) || [];

var searchBtnHandler = function (event) {
    event.preventDefault();
    console.log(event.target.innerText)
    console.log(citySearch.value)
    var search = ""
    if (citySearch.value === ""){
        search = event.target.innerText;
    } else{
search = citySearch.value;
    }
    var cityCoordURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=5&appid=" + apiKey;
citySearch.value = "";
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

                    // var search = {
                    //     searchCity: citySearch.value.trim(),
                    //     searchData: data,
                    // };

                    var currentTemplate = `<div class="text-center col-10 p-3">
<h2><span id="city">${search}</span><span id="day0"> <br/>${moment.unix(data.current.dt).format("MM/DD/YYYY")}</span>
</h2>
<img id="icon1" src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"/>
<p>Temp: <span id="temp0">${data.current.temp}</span>&deg;</p>
<p>Wind: <span id="wind0">${data.current.wind_speed}</span> MPH</p>
<p>Humidity: <span id="humid0">${data.current.humidity}</span>%</p>
<p>UV Index: <span id="uvi0">${data.current.uvi}</span></p>
</div>`

                    current.innerHTML = currentTemplate

                    var forecastHTML = [];
                    for (var i = 1; i < 6; i++) {


                        var template = `<div class="card text-center border col-2">
           <div class="daily">
            <h3><span id="day1">${moment.unix(data.daily[i].dt).format("MM/DD/YYYY")}</span></h3>
            <img id="icon1" src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"/>
            <p>Temp: <span id="temp1">${data.daily[i].temp.day}</span>&deg;</p>
            <p>Wind: <span id="wind1">${data.daily[i].wind_speed}</span> MPH</p>
            <p>Humidity: <span id="humid1">${data.daily[i].humidity}</span>%</p>
        </div>
       </div>`

                        forecastHTML.push(template);
                    }
                    var completeForecast = forecastHTML.join("");
                    forecast.innerHTML = completeForecast

                    // --------------------------------------------------------------------
                    // // save search info
                    // Save search data as an object
                    data.name = search;
                    searchHistory.push(data) 
                   // Store search object in local storage and convert to string
                   localStorage.setItem("search", JSON.stringify(searchHistory));
                                       
                    // Use JSON.parse() to create object
                   if (search !== null) {
                      searchList.innerHTML = '';
                      for (var i = searchHistory.length - 1; i >= 0; i--) {
                        var searchListItem = document.createElement("li");
                        var searchHistoryButton = document.createElement('button');
                        searchHistoryButton.addEventListener ('click', searchBtnHandler)
                        searchHistoryButton.textContent = searchHistory[i].name;
                        searchListItem.append(searchHistoryButton)
                        searchList.appendChild(searchListItem);
                     }
                   } else {
                     return;
                   }

                    // -----------------------------------------------------------------------
                })
        })

};

// page load events
function init() {


}

searchBtn.addEventListener('click', searchBtnHandler);

//  Calls init function
init();
