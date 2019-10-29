"use strict";

// loads the data that comes from OpenWeatherMap api
function loadData() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var weatherData = JSON.parse(this.responseText);

            //if readyState repsonse is ready and status is "OK"
            //call handleData function
            handleData(weatherData);
        } else {
            console.log("error");
        }
    };

    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Lansdale&units=imperial&appid=e99128fa5241d4f1922d6bd9223d7137", true);
    xhr.send();
}

//function that manipulates the data and puts applies it in DOM
function handleData(data) {
    var city = data.name;
    var main = data.weather[0].main;
    var description = data.weather[0].description;
    var temperature = data.main.temp;
    var min = data.main.temp_min;
    var max = data.main.temp_max;

    document.getElementById("city").innerHTML = "Current weather for " + city;
    document.getElementById("weather").innerHTML = main + " - " + description;
    document.getElementById("temp").innerHTML = Math.ceil(temperature) + "&#8457;";
    document.getElementById("hi-lo").innerHTML = "High - " + Math.floor(min) + ", Low - " + Math.ceil(max);
}

//function calls
loadData();