import { WeatherInfo } from "./weather-info";

const weatherCards = document.getElementsByClassName('card');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const day0Date = document.getElementById('day0-date');
const day1Date = document.getElementById('day1-date');
const day2Date = document.getElementById('day2-date');
const day3Date = document.getElementById('day3-date');

const changeCityButton = document.getElementById('changeCity');
const changeCityForm = document.getElementById('changeCityForm');
const sendCityButton = document.getElementById('sendNewCity');
const cityInput = document.getElementById('cityInput');

let date = new Date();
day0Date.innerText = `Today, ${months[date.getMonth()]} ${date.getDate()}`;
date.setDate(date.getDate()+1)
day1Date.innerText = `${months[date.getMonth()]} ${date.getDate()}`
date.setDate(date.getDate()+1)
day2Date.innerText = `${months[date.getMonth()]} ${date.getDate()}`;
date.setDate(date.getDate()+1)
day3Date.innerText = `${months[date.getMonth()]} ${date.getDate()}`

changeCityButton.addEventListener('click', toggleNewCity)

function toggleNewCity(){
    changeCityForm.classList.toggle('disabled');
}

sendCityButton.addEventListener('click', ()=>{
    let city = cityInput.value;
    let errorMessage = document.getElementById('errorMessage');

    errorMessage.classList.add('disabled');
    getWeather(city);
    
})



// -------------------- API --------------------

async function getWeather(city){
    try {
        const weatherInfo = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=79b42905ecf043c6ac9112356232506&q=${city}&days=4&aqi=yes`, {mode: 'cors'})
        const weatherInfoJson = await weatherInfo.json();

        let day0Weather = weatherInfoJson.forecast.forecastday[0].day.condition.text;        
        let day1Weather = weatherInfoJson.forecast.forecastday[1].day.condition.text;
        let day2Weather = weatherInfoJson.forecast.forecastday[2].day.condition.text;
        let day3Weather = weatherInfoJson.forecast.forecastday[3].day.condition.text;

        // let wind = weatherInfoJson.forecast.forecastday[0].hour.wind;
        let today = new Date();

        let wind = weatherInfoJson.forecast.forecastday[0].hour[today.getHours()].wind_kph;
        let temperature = weatherInfoJson.forecast.forecastday[0].hour[today.getHours()].temp_c;
        let aqiIndex = weatherInfoJson.forecast.forecastday[0].day.air_quality["gb-defra-index"];
    
        let weather = new WeatherInfo(city, day0Weather, day1Weather, day2Weather, day3Weather, wind, temperature, aqiIndex);
        updateDashboard(weather);
    } catch(error) {
        let errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.remove('disabled');    
    }
}

function updateDashboard(weather){
    
    let weather0Text = weather.day0Weather;
    let weather1Text = weather.day1Weather;
    let weather2Text = weather.day2Weather;
    let weather3Text = weather.day3Weather;
    let wind = weather.wind;
    let temperature = weather.temperature;
    let aqi = weather.aqi;

    let currentCity = document.getElementById('currentCity');
    currentCity.innerText = `Current city: ${weather.city}`;

    toggleNewCity();
    toggleCards();
    // Weather conditions:
    setTimeout(function(){
        changeIcons(weather0Text, weather1Text, weather2Text, weather3Text, wind, temperature, aqi)
    }, 500);

    setTimeout(toggleCards, 1000)
}

function changeIcons(weather0Text, weather1Text, weather2Text, weather3Text, wind, temperature, aqi){

    
    // Day 0
    
    let day0Sunny = document.getElementById('day0sunny');
    let day0Cloud = document.getElementById('day0cloud');
    let day0Rain = document.getElementById('day0rain');
    let day0Snow = document.getElementById('day0snow');
    let day0Thunder = document.getElementById('day0thunder');

    let day0Text = document.getElementById('day0-text');
    const body = document.querySelector('body');

    day0Text.innerText = weather0Text;
    
    day0Sunny.classList.add('disabled');
    day0Cloud.classList.add('disabled');
    day0Rain.classList.add('disabled');
    day0Snow.classList.add('disabled');
    day0Thunder.classList.add('disabled');
    
    if(weather0Text == 'Sunny'){
        day0Sunny.classList.remove('disabled');
        body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1485809069980-bdd865d520ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
    } else if (weather0Text == 'Partly cloudy' || weather0Text == 'Cloudy' || weather0Text == 'Overcast' ||
    weather0Text == 'Mist' || weather0Text == 'Fog' || weather0Text == 'Freezing fog') {
        day0Cloud.classList.remove('disabled');
        body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1485249245068-d8dc50b77cc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80)'
    } else if (weather0Text == 'Patchy rain possible' || weather0Text == 'Patchy light rain' || weather0Text == 'Light rain' || weather0Text == 'Moderate rain at times' || weather0Text == 'Moderate rain' || weather0Text == 'Heavy rain' ||
    weather0Text == 'Light freezing rain' || weather0Text == 'Moderate or heavy freezing rain' || weather0Text == 'Light rain shower'|| weather0Text == 'Moderate or heavy rain shower' || weather0Text == 'Torrential rain shower'){
        day0Rain.classList.remove('disabled');
        body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1513172128806-2d00531a9f20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80)'
    } else if(weather0Text == 'Blowing snow' || weather0Text == 'Blizzard' || weather0Text == 'Patchy snow possible' || weather0Text == 'Patchy sleet possible' || weather0Text == 'Patchy freezing drizzle possible' || weather0Text == 'Freezing drizzle' || 
    weather0Text == 'Heavy freezing drizzle' || weather0Text == 'Light sleet' || weather0Text == 'Moderate or heavy sleet' || weather0Text == 'Patchy light snow' || weather0Text == 'Light snow' || weather0Text == 'patchy moderate snow' ||
    weather0Text == 'Moderate snow,' || weather0Text == 'Patchy heavy snow' || weather0Text == 'Heavy snow' || weather0Text == 'Ice pellets' || weather0Text == 'Light sleet showers' || weather0Text == 'Moderate or heavy sleet showers' ||
    weather0Text == 'Light snow showers' || weather0Text == 'Moderate or heavy snow showers' || weather0Text == 'Light shower of ice pellets' || weather0Text == 'Moderate or heavy showers of ice pellets' || weather0Text == 'Moderate or heavy snow with thunder'){
        day0Snow.classList.remove('disabled');
        body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1517124686104-3830fbe48de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)'
    } else if (weather0Text == 'Thundery outbreaks possible' || weather0Text == 'Patchy light rain with thunder' || weather0Text == 'Moderate or heavy rain with thunder'){
        day0Thunder.classList.remove('disabled')
        body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1537036017783-64573b29adb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80)'
    }

    // Day 1

    let day1Sunny = document.getElementById('day1sunny');
    let day1Cloud = document.getElementById('day1cloud');
    let day1Rain = document.getElementById('day1rain');
    let day1Snow = document.getElementById('day1snow');
    let day1Thunder = document.getElementById('day1thunder');
    
    let day1Text = document.getElementById('day1-text');
    day1Text.innerText = weather1Text;
        

    day1Sunny.classList.add('disabled');
    day1Cloud.classList.add('disabled');
    day1Rain.classList.add('disabled');
    day1Snow.classList.add('disabled');
    day1Thunder.classList.add('disabled');
    
    if(weather1Text == 'Sunny'){
        day1Sunny.classList.remove('disabled');
    } else if (weather1Text == 'Partly cloudy' || weather1Text == 'Cloudy' || weather1Text == 'Overcast' ||
               weather1Text == 'Mist' || weather1Text == 'Fog' || weather1Text == 'Freezing fog') {
        day1Cloud.classList.remove('disabled');
    } else if (weather1Text == 'Patchy rain possible' || weather1Text == 'Patchy light rain' || weather1Text == 'Light rain' || weather1Text == 'Moderate rain at times' || weather1Text == 'Moderate rain' || weather1Text == 'Heavy rain' ||
               weather1Text == 'Light freezing rain' || weather1Text == 'Moderate or heavy freezing rain' || weather1Text == 'Light rain shower'|| weather1Text == 'Moderate or heavy rain shower' || weather1Text == 'Torrential rain shower'){
        day1Rain.classList.remove('disabled');
    } else if(weather1Text == 'Blowing snow' || weather1Text == 'Blizzard' || weather1Text == 'Patchy snow possible' || weather1Text == 'Patchy sleet possible' || weather1Text == 'Patchy freezing drizzle possible' || weather1Text == 'Freezing drizzle' || 
              weather1Text == 'Heavy freezing drizzle' || weather1Text == 'Light sleet' || weather1Text == 'Moderate or heavy sleet' || weather1Text == 'Patchy light snow' || weather1Text == 'Light snow' || weather1Text == 'patchy moderate snow' ||
              weather1Text == 'Moderate snow,' || weather1Text == 'Patchy heavy snow' || weather1Text == 'Heavy snow' || weather1Text == 'Ice pellets' || weather1Text == 'Light sleet showers' || weather1Text == 'Moderate or heavy sleet showers' ||
              weather1Text == 'Light snow showers' || weather1Text == 'Moderate or heavy snow showers' || weather1Text == 'Light shower of ice pellets' || weather1Text == 'Moderate or heavy showers of ice pellets' || weather1Text == 'Moderate or heavy snow with thunder'){
        day1Snow.classList.remove('disabled');
    } else if (weather1Text == 'Thundery outbreaks possible' || weather1Text == 'Patchy light rain with thunder' || weather1Text == 'Moderate or heavy rain with thunder'){
        day1Thunder.classList.remove('disabled')
    }

    // Day 2

    let day2Sunny = document.getElementById('day2sunny');
    let day2Cloud = document.getElementById('day2cloud');
    let day2Rain = document.getElementById('day2rain');
    let day2Snow = document.getElementById('day2snow');
    let day2Thunder = document.getElementById('day2thunder');
    
    day2Sunny.classList.add('disabled');
    day2Cloud.classList.add('disabled');
    day2Rain.classList.add('disabled');
    day2Snow.classList.add('disabled');
    day2Thunder.classList.add('disabled');
    
    let day2Text = document.getElementById('day2-text');
    day2Text.innerText = weather2Text;


    if(weather2Text == 'Sunny'){
        day2Sunny.classList.remove('disabled');
    } else if (weather2Text == 'Partly cloudy' || weather2Text == 'Cloudy' || weather2Text == 'Overcast' ||
               weather2Text == 'Mist' || weather2Text == 'Fog' || weather2Text == 'Freezing fog') {
        day2Cloud.classList.remove('disabled');
    } else if (weather2Text == 'Patchy rain possible' || weather2Text == 'Patchy light rain' || weather2Text == 'Light rain' || weather2Text == 'Moderate rain at times' || weather2Text == 'Moderate rain' || weather2Text == 'Heavy rain' ||
               weather2Text == 'Light freezing rain' || weather2Text == 'Moderate or heavy freezing rain' || weather2Text == 'Light rain shower'|| weather2Text == 'Moderate or heavy rain shower' || weather2Text == 'Torrential rain shower'){
        day2Rain.classList.remove('disabled');
    } else if(weather2Text == 'Blowing snow' || weather2Text == 'Blizzard' || weather2Text == 'Patchy snow possible' || weather2Text == 'Patchy sleet possible' || weather2Text == 'Patchy freezing drizzle possible' || weather2Text == 'Freezing drizzle' || 
              weather2Text == 'Heavy freezing drizzle' || weather2Text == 'Light sleet' || weather2Text == 'Moderate or heavy sleet' || weather2Text == 'Patchy light snow' || weather2Text == 'Light snow' || weather2Text == 'patchy moderate snow' ||
              weather2Text == 'Moderate snow,' || weather2Text == 'Patchy heavy snow' || weather2Text == 'Heavy snow' || weather2Text == 'Ice pellets' || weather2Text == 'Light sleet showers' || weather2Text == 'Moderate or heavy sleet showers' ||
              weather2Text == 'Light snow showers' || weather2Text == 'Moderate or heavy snow showers' || weather2Text == 'Light shower of ice pellets' || weather2Text == 'Moderate or heavy showers of ice pellets' || weather2Text == 'Moderate or heavy snow with thunder'){
        day2Snow.classList.remove('disabled');
    } else if (weather2Text == 'Thundery outbreaks possible' || weather2Text == 'Patchy light rain with thunder' || weather2Text == 'Moderate or heavy rain with thunder'){
        day2Thunder.classList.remove('disabled')
    }

    // Day 3

    let day3Sunny = document.getElementById('day3sunny');
    let day3Cloud = document.getElementById('day3cloud');
    let day3Rain = document.getElementById('day3rain');
    let day3Snow = document.getElementById('day3snow');
    let day3Thunder = document.getElementById('day3thunder');
    
    day3Sunny.classList.add('disabled');
    day3Cloud.classList.add('disabled');
    day3Rain.classList.add('disabled');
    day3Snow.classList.add('disabled');
    day3Thunder.classList.add('disabled');
    
    let day3Text = document.getElementById('day3-text');
    day3Text.innerText = weather3Text;


    if(weather3Text == 'Sunny'){
        day3Sunny.classList.remove('disabled');
    } else if (weather3Text == 'Partly cloudy' || weather3Text == 'Cloudy' || weather3Text == 'Overcast' ||
               weather3Text == 'Mist' || weather3Text == 'Fog' || weather3Text == 'Freezing fog') {
        day3Cloud.classList.remove('disabled');
    } else if (weather3Text == 'Patchy rain possible' || weather3Text == 'Patchy light rain' || weather3Text == 'Light rain' || weather3Text == 'Moderate rain at times' || weather3Text == 'Moderate rain' || weather3Text == 'Heavy rain' ||
               weather3Text == 'Light freezing rain' || weather3Text == 'Moderate or heavy freezing rain' || weather3Text == 'Light rain shower'|| weather3Text == 'Moderate or heavy rain shower' || weather3Text == 'Torrential rain shower'){
        day3Rain.classList.remove('disabled');
    } else if(weather3Text == 'Blowing snow' || weather3Text == 'Blizzard' || weather3Text == 'Patchy snow possible' || weather3Text == 'Patchy sleet possible' || weather3Text == 'Patchy freezing drizzle possible' || weather3Text == 'Freezing drizzle' || 
              weather3Text == 'Heavy freezing drizzle' || weather3Text == 'Light sleet' || weather3Text == 'Moderate or heavy sleet' || weather3Text == 'Patchy light snow' || weather3Text == 'Light snow' || weather3Text == 'patchy moderate snow' ||
              weather3Text == 'Moderate snow,' || weather3Text == 'Patchy heavy snow' || weather3Text == 'Heavy snow' || weather3Text == 'Ice pellets' || weather3Text == 'Light sleet showers' || weather3Text == 'Moderate or heavy sleet showers' ||
              weather3Text == 'Light snow showers' || weather3Text == 'Moderate or heavy snow showers' || weather3Text == 'Light shower of ice pellets' || weather3Text == 'Moderate or heavy showers of ice pellets' || weather3Text == 'Moderate or heavy snow with thunder'){
        day3Snow.classList.remove('disabled');
    } else if (weather3Text == 'Thundery outbreaks possible' || weather3Text == 'Patchy light rain with thunder' || weather3Text == 'Moderate or heavy rain with thunder'){
        day3Thunder.classList.remove('disabled')
    }

    // Wind
    
    let windText = document.getElementById('windSpeed');
    windText.innerText = `${wind} km/h`
    
    // Temperature
    
    let temperatureText = document.getElementById('currentTemp');
    temperatureText.innerText = `${temperature}ºC`
    
    // AQI

    let aqiIndex = document.getElementById('currentAQI');
    aqiIndex.innerText = `Air quality: ${aqi}`;

    let aqiText = document.getElementById('AQIadvice');

    if(aqi <= 3){
        aqiText.innerText = 'Low risk. Enjoy outdoor activities!'
    } else if (aqi >= 4 && aqi <= 6) {
        aqiText.innerText = 'Moderate risk. If you suffer of heart problems, or experience symptoms, consider reducing strenous physical activity outdoors.'
    } else if (aqi >= 7 && aqi <= 9) {
        aqiText.innerText = 'High risk. If you suffer of lung/heart problems, or experience symptoms, consider reducing physical activities outdoor.'
    } else {
        aqiText.innerText = 'Very high risk. Reduce outdoors activity if you experience symptoms such as cough and sore throat.'
    }

}

function toggleCards(){
    for(let card of weatherCards){
        card.classList.toggle('closed');
    }
}

getWeather('Madrid');