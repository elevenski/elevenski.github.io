/*

 Open source repository on GitHub: https://github.com/mervebilgin/WeatherApp

 Güncelleme: bu kod şuanda sayfalar içerisinde renderlanmıyor, nereye koyacağımı bulamadım. Umarım bulurumda kaldırmak zorunda kalmam :).

*/

const url = 'https://api.openweathermap.org/data/2.5/'
const key = '739ef515e3ade2c79525a82f51f458a5'
const cityName = 'Istanbul'

$.getJSON(`${url}weather?q=${cityName}&appid=${key}&units=metric&lang=en`, function(data) {
    $("#weather").html(`<div class="leftFloat"><span class="smallText text-capitalize">${data.weather[0].description} in</span> ${data.name}</div> <div class="rightFloat"><i class="fa-thin fa-cloud-bolt-sun inline-flex ml-1 mr-2"></i></div>`);
});