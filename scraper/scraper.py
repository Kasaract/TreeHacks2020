# creating scraper that scrapes websites to extract Article Objectsself
# implementing BeautifulSoup4 for scraping and spacy NLP tools to extract propernouns for specific location
import requests
from bs4 import BeautifulSoup
from gensim.summarization import summarize

def scrape_website(url):
    """ scrapes website and based on css tags, returns content of the article

    scrape_website("https://www.nytimes.com/2020/02/15/world/asia/xi-china-coronavirus.html")
    >>> Xi Jinping was aware of the outbreak nearly two weeks before he first spoke publicly about it.
    It could draw him directly into questions....

    """
    page = requests.get(url).text
    soup = BeautifulSoup(page, features="lxml")
    headline = soup.find('h1').get_text()
    p_tags = soup.find_all("p")
    p_tags_text = [tag.get_text().strip() for tag in p_tags] # get content from each p tag and strip whitespace

    sentence_list = [sentence for sentence in p_tags_text if not '\n' in sentence]
    sentence_list = [sentence for sentence in sentence_list if '.' in sentence]
    article = ' '.join(sentence_list)

    return article

def summarize(article):
    ""'given text of article, summarizes using gensim"""
    summary = summarize(article_text, ratio=0.3)
    return summary

if __name__ == '__main__':
    a = scrape_website("https://www.nytimes.com/2020/02/15/world/asia/xi-china-coronavirus.html")
    print(a)
