
/**
 * Call the functions in here to use NewsAPI
 */

const API_KEY = '&apiKey=7c4715d11f804f72a35100812d5e0c38';
const URL = 'https://newsapi.org/v2/everything?q=';
 

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
        let json = JSON.parse(this.Get(URL + city + API_KEY));
        return json;
    }

    getJSONWithCategory(city, category) {
        let formattedCity = city.replace(/ /, "+");
        let json = JSON.parse(this.Get(URL + city + '&category='+ category+ API_KEY));
        return json;
    }

}

export default new NewsAPI();