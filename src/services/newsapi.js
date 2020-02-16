
/**
 * Call the functions in here to use NewsAPI
 */

const API_KEY = '&key=AIzaSyAg3ugG7gGUMmRz09iKdgUOWHzjKusyu-I';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
 

class NewsAPI {

    constructor() {}

    Get(url){
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET",url,false);
        Httpreq.send(null);
        return Httpreq.responseText;          
    }

    cityLatitude(city) {
        let json = JSON.parse(this.Get(GEOCODE_URL+city+API_KEY));
        return json.results[0].geometry.location.lat;
    }

    cityLongitude(city) {
        let json = JSON.parse(this.Get(GEOCODE_URL + city + API_KEY));
        return json.results[0].geometry.location.lng;
    }

}

export default new Geocode();