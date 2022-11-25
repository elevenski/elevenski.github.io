/*

 Open source repository on GitHub: https://github.com/mervebilgin/WeatherApp

*/

const url = 'https://api.openweathermap.org/data/2.5/'
const key = '739ef515e3ade2c79525a82f51f458a5'
const cityName = 'Istanbul'

$.getJSON(`${url}weather?q=${cityName}&appid=${key}&units=metric&lang=en`, function(data) {
    const temp = data.main.temp
    const tempFixed = temp.toString().substring(0, 2);
    $("#weather").html(`<span class="text-capitalize">${data.weather[0].description}</span> of ${tempFixed}°C in ${data.name}, ${data.sys.country}`);
});