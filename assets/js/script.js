// Open Weather API key 18ef42aafc64b56f80b4c7a1690f47fd

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={18ef42aafc64b56f80b4c7a1690f47fd}

var apiKey = "18ef42aafc64b56f80b4c7a1690f47fd";

var searchBtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#citySearch');
var day0 = document.querySelector('#day0');
var icon0 = document.querySelector('#icon0');
var temp0 = document.querySelector('#temp0');
var wind0 = document.querySelector('#wind0');
var humid0 = document.querySelector('#humid0');
var city = document.querySelector('#city');

// parameters from API current.dt current.temp current.humidity current.wind_speed current.weather.icon current.uvi
// daily.dt daily.temp daily.humidity daily.wind_speed daily.weather.icon daily.uvi