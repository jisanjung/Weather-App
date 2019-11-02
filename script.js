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
    var zipInput = document.getElementById("zipInput");

    if (!isValidZip) {
        zipInput.style.border = "solid 2px #ff0000";
        return "Invalid Zip Code";
    } else {
        zipInput.style.borderTop = "none";
        zipInput.style.borderRight = "none";
        zipInput.style.borderLeft = "none";
        zipInput.style.borderBottom = "solid 1px #fff";
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
    var defaultText = document.getElementById("defaultText");
    var back = document.getElementById("back");

    // show back button when data is loaded
    back.style.display = "block";

    // on search button click, checks if user is on default page
    if (defaultText) {
        defaultText.parentNode.removeChild(defaultText);
    } else {
        defaultText = "Get the current weather by simply entering zip code!";
    }

    document.getElementById("city").innerHTML = "Current weather for " + "<p>" + city + "</p>";
    document.getElementById("weather").innerHTML = main + " - " + description;
    document.getElementById("temp").innerHTML = Math.ceil(temperature) + "&#8457;";
    document.getElementById("hi-lo").innerHTML = "High - " + Math.floor(min) + "&#176;" + ", Low - " + Math.ceil(max) + "&#176;";

    // call function to display weather depending on the variable "main"
    weatherType(main);
}

// changes interface depending on what the weather is like
function weatherType(weather) {
    if (weather === "Thunderstorm") {
        document.body.style.backgroundImage = "url('images/thunder.jpg')";
    } else if (weather === "Drizzle") {
        document.body.style.backgroundImage = "url('images/drizzle.jpg')";
    } else if (weather === "Rain") {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    } else if (weather === "Snow") {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    } else if (weather === "Clear") {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    } else if (weather === "Clouds") {
        document.body.style.backgroundImage = "url('images/clouds.jpg')";
    } else {
        document.body.style.backgroundImage = "url('images/default.jpg')";
    }
}

// reload page
function reload() {
    location.reload();
}

// event listeners
function createEventListeners() {
    var submit = document.getElementById("btn");
    var back = document.getElementById("back");

    if (submit.addEventListener) {
        submit.addEventListener("click", loadData, false);
    } else if (submit.attachEvent) {
        submit.attachEvent("onclick", loadData);
    }

    if (back.addEventListener) {
        back.addEventListener("click", reload, false);
    } else if (back.attachEvent) {
        back.attachEvent("onclick", reload);
    }
}

// function calls
createEventListeners();