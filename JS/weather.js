var cityName;
var weatherStatus;
var temperature;
var windDirection;
var windSpeed;

//TODO: MAKE IT SAFE
var openWeatherKey = "bcb47df11476685f4b85b3e1d2334b84";

function getWeatherStatus(data) {
    $.each(data[0], function(key, val) {
        if (key == "main") console.log(key + " : " + val);
        if (key == "description") console.log(key + " : " + val);
    });
}

function getMainWeatherInfo(data) {
    console.log("MAIN WEATHER INFO");
    $.each(data, function(key, val) {
        console.log(key + " : " + val);
    });
    console.log("___________________");
}

function getWindInfo(data) {
    console.log("WIND INFO");
    $.each(data, function(key, val) {
        console.log(key + " : " + val);
    });

    console.log("___________________");
}

function getRainInfo(data) {
    console.log("RAIN INFO");
    $.each(data, function(key, val) {
        console.log(key + " : " + val);
    });

    console.log("___________________");
}



function getWeather(city, APIKey) {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&apikey=" + APIKey, function(data) {
        var keys = [];
        var vals = [];

        $.each(data, function(key, val) {
            if (key == "weather") getWeatherStatus(val);
            if (key == "main") getMainWeatherInfo(val);
            if (key == "wind") getWindInfo(val);
            if (key == "rain") getRainInfo(val);
            //else console.log(key + " : " + val);
        });


    });
}

$(document).ready(function() {
    getWeather("Москва", openWeatherKey);
});