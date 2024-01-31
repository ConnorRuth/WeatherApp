var APIkey = 'c9b97cf04215d97e95333761fa98c985';
var btnEl = document.getElementById('submitInput')

function submitSearch(){
    var cityName = document.getElementById('formInput').value;
    getCoordinates(cityName);
        console.log(cityName);
}

btnEl.addEventListener('click', submitSearch);


function  getCoordinates(cityName){
var coordinatesURL ='http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=1&appid='+APIkey;
    fetch(coordinatesURL).then(function(response) {
        if(response.status= 200){
            return response.json();
        }
    }) .then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        getForecast(lat, lon);
    })
}

function getForecast(lat, lon) {
    var weatherURL ='https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&cnt=3'+'&appid='+APIkey + '&units=imperial';
    fetch(weatherURL).then(function(response) {
        if(response.status= 200){
            return response.json();
        }
    }) .then(function(data) {
        console.log(data);
    })
}


