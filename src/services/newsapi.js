
/**
 * Call the functions in here to use NewsAPI
 */

const API_KEY = '&apiKey=7c4715d11f804f72a35100812d5e0c38';
const GEOCODE_URL = 'https://newsapi.org/v2/everything?q=';
 

class NewsAPI {

    constructor() {}

    Get(url){
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET",url,false);
        Httpreq.send(null);
        return Httpreq.responseText;          
    }

    getJSON(city) {
        let formattedCity = city.replace(/ /, "+");
        let json = JSON.parse(this.Get(GEOCODE_URL + city + API_KEY));
        return json.results[0].geometry.location.lng;
    }

}

export default new Geocode();