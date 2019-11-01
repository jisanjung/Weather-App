"use strict";

// loads the data that comes from OpenWeatherMap api
function loadData() {
    var url = getURL();
    var error = errorHandle();
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var weatherData = JSON.parse(this.responseText);

            // if readyState repsonse is ready and status is "OK"
            // call handleData function
            handleData(weatherData);
            // clear input
            document.getElementById("zipInput").value = "";
        } else {
            // throw error if zipcode is not valid
            document.getElementById("error").innerHTML = error;
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}

// function that takes in user's zip code and inserts into url
function getURL() {
    var zipInput = document.getElementById("zipInput").value;
    var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipInput + ",us&units=imperial&appid=e99128fa5241d4f1922d6bd9223d7137";

    return url;
}

// handles errors using regular expressions
function errorHandle() {
    var url = getURL();
    var searchIndex = url.search("zip=");
    var subString = url.substring(searchIndex + 4, 56);
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(subString);

    if (!isValidZip) {
        return "Invalid Zip Code";
    } else {
        return "";
    }
}

// function that manipulates the data and puts applies it in DOM
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

    // call function to display weather depending on the variable "main"
    weatherType(main);
}

// changes interface depending on what the weather is like
function weatherType(weather) {
    if (weather === "Thunderstorm") {
        console.log("thunderstorm");
    } else if (weather === "Drizzle") {
        console.log("drizzle");
    } else if (weather === "Rain") {
        console.log("rain");
    } else if (weather === "Snow") {
        console.log("snow");
    } else if (weather === "Clear") {
        console.log("clear");
    } else if (weather === "Clouds") {
        console.log("clouds");
    }
}

// event listeners
function createEventListeners() {
    var submit = document.getElementById("btn");

    if (submit.addEventListener) {
        submit.addEventListener("click", loadData, false);
    } else if (submit.attachEvent) {
        submit.attachEvent("onclick", loadData);
    }
}

// function calls
createEventListeners();