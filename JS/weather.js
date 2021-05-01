var cityName = "Москва";
var weatherStatus;
var temperature;
var feelsTemperautre;
var minTemperature;
var maxTemperature;
var windDirection;
var windSpeed;

//TODO: MAKE IT SAFE
var openWeatherKey = "bcb47df11476685f4b85b3e1d2334b84";

function getWeatherStatus(data) {
    var main;
    var description;
    $.each(data[0], function(key, val) {
        if (key == "main") main = val;
        if (key == "description") description = val;
    });
    weatherStatus = main;
    $("#main-weather-info").html('<img src="img/' + main + '.png" alt="" srcset="" class="h-25 w-25">' + "<b>" + main + "</b> " + description);
}

function getMainWeatherInfo(data) {
    // console.log("MAIN WEATHER INFO");

    $.each(data, function(key, val) {
        if (key == "temp") temperature = val;
        if (key == "feels_like") feelsTemperautre = val;
        if (key == "temp_min") minTemperature = val;
        if (key == "temp_max") maxTemperature = val;
        if (key == "humidity") getHumidityInfo(val);
        if (key == "pressure") getPressureInfo(val);
    });
    // console.log("___________________");
    $("#temperature-info").html('<img src="img/thermometer.png" alt="" srcset="" class="h-25 w-25">' + "<b>сейчас " + temperature + " ℃</b> ощущается как " + feelsTemperautre + " ℃");
}

function getWindInfo(data) {
    console.log("WIND INFO");
    $.each(data, function(key, val) {
        if (key == "speed") windSpeed = val;
        if (key == "deg") windDirection = val;
        // console.log(key + " : " + val);
    });
    $("#wind-info").html('<img src="img/wind-sign.png" class="w-25 h-25" style="transform: rotate(' + (windDirection - 90) + 'deg);">' + "<b>Ветер " + windSpeed + " м/с </b>");
    console.log("___________________");
}

function getRainInfo(data) {
    console.log("RAIN INFO");
    $.each(data, function(key, val) {
        console.log(key + " : " + val);
    });

    console.log("___________________");
}

function getPressureInfo(data) {
    $("#pressure-info").html('<img src="img/barometer.png" alt="" srcset="" class="h-25 w-25">' + "<b> Атм. д. " + data + " мм. рт.</b>");
}

function getHumidityInfo(data) {
    $("#humidity-info").html('<img src="img/humidity.png" alt="" srcset="" class="h-25 w-25">' + "<b> Влажность воздуха " + data + "%</b>");
}

function getWeather(city, APIKey) {
    $("#cityNameHeader").html("Погода в городе <b class='text-primary'>" + city + "</b>");
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&apikey=" + APIKey, function(data) {
        $.each(data, function(key, val) {
            if (key == "weather") getWeatherStatus(val);
            if (key == "main") getMainWeatherInfo(val);
            if (key == "wind") getWindInfo(val);
            if (key == "rain") getRainInfo(val);
        });
    });
}

$(document).ready(function() {

    getWeather(cityName, openWeatherKey);
    $("#cityButton").on("click", function() {
        cityName = $("#cityName").val();
        getWeather(cityName, openWeatherKey);
    });
});