import json, requests

url = ('https://newsapi.org/v2/top-headlines?'
       'country=us&'
       'apiKey=7c4715d11f804f72a35100812d5e0c38')

articles = requests.get(url).json()["articles"]

#for article in articles:
#       print(article["title"])


def extract(keyword):
    """ returns list of ids of article given some keyword to match to title/desc/content

    extract("los angeles")
    >>> [1, 6, 23, 643, 13456543]

    """
    matchIdList = []
    for article in articles:
        if keyword in article["title"] or keyword in article["description"] or keyword in article["content"]:
            matchIdList.append(id)
    return matchIdList

if __name__ == '__main__':
    print(extract("Germany"))
