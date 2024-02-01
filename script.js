var APIkey = 'c9b97cf04215d97e95333761fa98c985';
var btnEl = document.getElementById('submitInput')
var displayCity = document.getElementById("currentCity");
var displayTemp = document.getElementById("currentTemp");
var displayWeather = document.getElementById("currentWeather");
var fiveDayParent = document.getElementById("multiDayCast");
var week = [];
// chains a series of functions getting user input for what city
function submitSearch(){
    var cityName = document.getElementById('formInput').value;
    if(cityName === ''){
        return} 
    week.length === 0;
    removeCast();
    getCoordinates(cityName);
    listTowns(cityName);
}

btnEl.addEventListener('click', submitSearch);


function  getCoordinates(cityName){
var coordinatesURL ='http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=1&appid='+APIkey;
    fetch(coordinatesURL).then(function(response) {
        if(response.ok){
            return response.json();
        } else throw new Error('Failed to get coordinates. error: ' + response.status);
    }) .then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        getForecast(lat, lon);
    })
        .catch((error) => {
            console.warn(error.message);
            alert(error.message);
       })
}

function getForecast(lat, lon) {
    var weatherURL ='https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&cnt=36'+'&appid='+APIkey + '&units=imperial';
    fetch(weatherURL).then(function(response) {
        if(response.ok){
            return response.json();
        } else throw new Error('failed to get forcast. error: ' + response.status);
    }) .then(function(data) {
        var tempContent = document.createTextNode("Temperature: " + data.list[4].main.temp + "°F");
        var weatherContent = document.createTextNode("Expected weather: " + data.list[4].weather[0].description);
        var cityContent = document.createTextNode("City of " + data.city.name);
        displayData(tempContent, weatherContent, cityContent);
        create5daycast(data);
    }) 
     .catch((err) => {
            console.warn(err.message);
       })
}

function listTowns(cityName){
    var searchedList = document.getElementById("townList");
    var newListItem = document.createElement("li");
    var listItemContent = document.createTextNode(cityName);
    searchedList.appendChild(newListItem);
    newListItem.appendChild(listItemContent);

}
function displayData(tempContent, weatherContent, cityContent){
    if(displayTemp.hasChildNodes()){
        displayTemp.removeChild(displayTemp.firstChild);
        displayWeather.removeChild(displayWeather.firstChild);
        displayCity.removeChild(displayCity.firstChild);
    }
        displayTemp.appendChild(tempContent);
        displayWeather.appendChild(weatherContent);
        displayCity.appendChild(cityContent);
}
 function create5daycast(data){
    for(i=0; i<5; i++){
        var newDay = document.createElement("div");
        fiveDayParent.appendChild(newDay);
        newDay.setAttribute('id','day'+i);
        newDay.classList.add('dayOfWeek');
        week.push('day'+i);
        week[i] = document.getElementById('day'+i);
    }
    giveDaysData(data);
 }
function giveDaysData(data){
    for(i=0; i<week.length; i++){
        var count = 3+(i*8);
        var tempDaydate = document.createTextNode(data.list[count].dt_txt);
        var tempDayContent = document.createTextNode(data.list[count].main.temp + "°F");
        var weatherDayContent = document.createTextNode(data.list[count].weather[0].description);
        var displayDayDate = document.createElement('h5');
        var displayDayWeather = document.createElement('h5');
        var displayDayTemp = document.createElement('h5');
        week[i].appendChild(displayDayDate);
        week[i].appendChild(displayDayWeather);
        week[i].appendChild(displayDayTemp);
        displayDayDate.appendChild(tempDaydate);
        displayDayTemp.appendChild(tempDayContent);
        displayDayWeather.appendChild(weatherDayContent);
    }
}
function removeCast(){
if(fiveDayParent.hasChildNodes()){
    deadKids = fiveDayParent.childElementCount;
    for(j=0; j<deadKids; j++){
    fiveDayParent.removeChild(fiveDayParent.lastChild);
}
} else return
}