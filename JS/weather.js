var cityName = "Москва";
var weatherStatus;
var temperature;
var feelsTemperautre;
var minTemperature;
var maxTemperature;
var windDirection;
var windSpeed;

var forecastTemperature = [];
var forecastWindDirection = [];
var forecastWindspeed = [];
var forecastHumidity = [];
var forecastPressure = [];
var forecastDataTime = [];

var temperatureChart;
var windChart;
var pressureChart
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
    $.each(data, function(key, val) {
        if (key == "temp") temperature = val;
        if (key == "feels_like") feelsTemperautre = val;
        if (key == "temp_min") minTemperature = val;
        if (key == "temp_max") maxTemperature = val;
        if (key == "humidity") getHumidityInfo(val);
        if (key == "pressure") getPressureInfo(val);
    });
    $("#temperature-info").html('<img src="img/thermometer.png" alt="" srcset="" class="h-25 w-25">' + "<b>сейчас " + temperature + " ℃</b> ощущается как " + feelsTemperautre + " ℃");
}

function getWindInfo(data) {
    console.log("WIND INFO");
    $.each(data, function(key, val) {
        if (key == "speed") windSpeed = val;
        if (key == "deg") windDirection = val;
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

function getWeatherForecast(city, APIKey) {
    forecastTemperature = [];
    forecastWindDirection = [];
    forecastWindspeed = [];
    forecastHumidity = [];
    forecastPressure = [];
    forecastDataTime = [];
    $.getJSON("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&apikey=" + APIKey, function(data) {
        $.each(data.list, function() {
            forecastDataTime.push(this.dt_txt);
            forecastTemperature.push(this.main.temp);
            forecastWindDirection.push(this.wind.deg);
            forecastWindspeed.push(this.wind.speed);
            forecastPressure.push(this.main.pressure);
            forecastHumidity.push(this.main.humidity);
        });
        temperatureChart = drawLineChart(document.getElementById('temperatureChart'), forecastDataTime, forecastTemperature);
        windChart = drawRadarChart(document.getElementById('windChart'), forecastWindDirection, forecastWindspeed);
        pressureChart = drawBarChart(document.getElementById('pressureChart'), forecastDataTime, forecastPressure);

    });

}

function drawLineChart(canvas, labels, data) {
    var ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Температура в градусах',
                data: data,
            }]
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        }],
        options: {
            fill: 'start',
        }
    });

    return myChart;
}

function drawRadarChart(canvas, labels, data) {
    var ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'скорость ветра в м/с',
                data: data,
            }]
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        }],
        options: {
            fill: 'start',
        }
    });

    return myChart;
}

function drawBarChart(canvas, labels, data) {
    var ctx = canvas.getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Давление в мм. рт. ст.',
                data: data,
            }]
        },
        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const ctx = chart.canvas.getContext('2d');
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
            }
        }],
        options: {
            fill: 'start',
            yAxes: [{
                ticks: {
                    min: 900,
                    max: 1100,
                    step: 1
                },
            }],
        }
    });

    return myChart;
}

$(document).ready(function() {
    getWeatherForecast(cityName, openWeatherKey);
    getWeather(cityName, openWeatherKey);

    $("#cityButton").on("click", function() {
        cityName = $("#cityName").val();
        getWeather(cityName, openWeatherKey);
        temperatureChart.destroy();
        pressureChart.destroy();
        windChart.destroy();
        getWeatherForecast(cityName, openWeatherKey);
    });
});