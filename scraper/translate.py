from googletrans import Translator
translator = Translator()
import json
import urllib
import os
import sys
from firebase import Firebase
import time

config = {
  "apiKey": "AIzaSyCBpDzAUiRY8nyiaNadyUIcjLTJxW41dhU",
  "authDomain": 'recap-treehacks.firebaseapp.com',
  "databaseURL": 'https://recap-treehacks.firebaseio.com',
  "storageBucket": 'recap-treehacks.appspot.com'
}

firebase = Firebase(config)

def translate_json(data_path):
    with open(data_path, 'r') as jsonfile:
        data_content = jsonfile.read()
        print(data_content)
        jsonfile.seek(0)
        data_json = json.loads(data_content)

    translator = Translator()
    for article in data_json["articles"]:
        tempTitle = article["title"].replace(';',' ')
        tempDesc = article["description"].replace(';',' ')
        article["title"] = translator.translate(tempTitle).text
        # print(article["description"])
        article["description"] = translator.translate(tempDesc).text
        # print("The new description is: {}".format(article["description"]))
    data2send = json.dumps(data_json, indent=4)
    print(data2send)

translate_json('/Users/jungwonsuk/treehacks2020/TreeHacks2020/scraper/sample.json')




#
# txt = ["Чемпионат мира по биатлону"," Мужчины. ","Гонка преследования 12,5 км. ОНЛАЙН - Газета.Ru"]
# translations = translator.translate(txt)
# for translation in translations:
#     print(translation.text)
# with open(os.path.join(sys.path[0], "sample.json"), "r") as sample_json:
# txt = str("sample.json")

# txt = "Продажи &laquo"
# print("THIS IS THE TRANSLATION: ", translator.translate(txt).text)
# def translate_json(data_json):
#     translator = Translator()
#     for article in data_json["articles"]:
#         tempTitle = article["title"].replace(';',' ')
#         tempDesc = article["description"].replace(';',' ')
#         article["title"] = translator.translate(tempTitle).text
#         # print(article["description"])
#         article["description"] = translator.translate(tempDesc).text
#         # print("The new description is: {}".format(article["description"]))
#     data2send = json.dumps(data_json, indent=4)
#     print(data2send)

# with open('/Users/jungwonsuk/treehacks2020/TreeHacks2020/scraper/sample.json', 'r') as jsonfile:
#     data_content = jsonfile.read()
#     print(data_content)
#     jsonfile.seek(0)
#     data_json_from_content = json.loads(data_content)
#     translate_json(data_json_from_content)

def translate(text, src = '', to = 'en'):
    parameters = ({'langpair': '{0}|{1}'.format(src, to), 'v': '1.0' })
    translated = ''

    for text in (text[index:index + 4500] for index in range(0, len(text), 4500)):
        parameters['q'] = text
        response = json.loads(urllib.request.urlopen('http://ajax.googleapis.com/ajax/services/language/translate', data = urllib.parse.urlencode(parameters).encode('utf-8')).read().decode('utf-8'))

    try:
        translated += response['responseData']['translatedText']
    except:
        pass

    print(translated)

db = firebase.database()

data = {}
while True:
  time.sleep(3)
  data = translate_json(db.child('translate').get())
  db.child("translate").set(data)


# print(translate("В итальянском Антхольце проходит чемпионат мира по биатлону. «Газета.Ru» провела текстовую онлайн-трансляцию мужской гонки преследования на 12,5 км, в которой россиянин Александр Логинов завоевал бронзовую медаль"))
# with open(os.path.join(sys.path[0], "sample.json"), "r") as sample_json:
#     translate_json()
