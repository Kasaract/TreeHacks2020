/**
 * Call the functions in here to use Google's Geocode API
 */

const API_KEY = '&key=AIzaSyAg3ugG7gGUMmRz09iKdgUOWHzjKusyu-I';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
 

function get(url){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function cityLatitude(city) {
    let json = JSON.parse(get(GEOCODE_URL+city+API_KEY));
    return json.results[0].geometry.location.lat;
}

function cityLongitude(city) {
    let json = JSON.parse(get(GEOCODE_URL + city + API_KEY));
    return json.results[0].geometry.location.lng;
}