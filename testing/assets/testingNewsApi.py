import requests

url = ('https://newsapi.org/v2/top-headlines?'
       'country=us&'
       'apiKey=7c4715d11f804f72a35100812d5e0c38')
response = requests.get(url)
print(response.json)
