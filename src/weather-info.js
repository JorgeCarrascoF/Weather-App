class WeatherInfo {
    constructor(city, day0Weather, day1Weather, day2Weather, day3Weather, wind, temperature, aqi){
        this.city = city;
        this.day0Weather = day0Weather;
        this.day1Weather = day1Weather;
        this.day2Weather = day2Weather;
        this.day3Weather = day3Weather;
        this.wind = wind;
        this.temperature = temperature;
        this.aqi = aqi;
    }
}

export {WeatherInfo};