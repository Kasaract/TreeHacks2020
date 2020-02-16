# Article scraper that will heavily use article api found on https://www.diffbot.com/products/automatic/article/
# will use requests to make HTTP requests towards the api
import requests
import json

def callArticleAPI(url):
    response = requests.get("https://api.diffbot.com/v3/article?token=64d47845611a1a799f616071921ab9c1&url=" + url)
    article_json = response.json()
    # print(article_json.dump())
    json_string = json.dumps(article_json)
    data = json.loads(json_string)

    with open("scrapedJSON", 'w') as f:
        json.dump(data, f)

    print(article_json)
    # ret_json = {}
    # ret_json["source"]["id"] = article_json["siteName"]
    # ret_json["source"]["name"] = article_json["siteName"]
    # ret_json["author"] = article_json["author"]
    # ret_json["title"] = article_json["title"]
    # description = article_json["text"].split()
    # ret_json["description"] = description[:50]
    # ret_json["url"] = article_json["pageUrl"] #or just url
    # ret_json["urlToImage"] = article_json["images"][0]["url"]
    # ret_json["publishedAt"] = article_json["date"] # or estimatedDate
    # ret_json["content"] = article_json["text"]
    #
    # print(ret_json)


    # type = response.type
    # title = response.title
    # text = response.text
    # date = response.date
    # est_date = response.estimatedDate
    # author = response.author
    # LanguageCode = response.humanLanguage
    # sitename = response.siteName
    # region = response.publisherRegion
    # country = response.publisherCountry
    # imgURL = response.images.url
    # sentiment = response.sentiment

    #print("{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}".format(type, title, text, date, est_date,
        # author, LanguageCode, sitename, region, country, imgURL, sentiment))

if __name__ == '__main__':
    callArticleAPI("https://www.nytimes.com/2020/02/15/world/asia/xi-china-coronavirus.html")
