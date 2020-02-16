from googletrans import Translator
translator = Translator()

txt = ["Чемпионат мира по биатлону"," Мужчины. ","Гонка преследования 12,5 км. ОНЛАЙН - Газета.Ru"]
translations = translator.translate(txt)
for translation in translations:
    print(translation.text)
