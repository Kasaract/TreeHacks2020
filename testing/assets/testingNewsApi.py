import json, requests

url = ('https://newsapi.org/v2/top-headlines?'
       'country=us&'
       'apiKey=7c4715d11f804f72a35100812d5e0c38')

articles = requests.get(url).json()

for article in articles["articles"]:
       print(article["title"])
