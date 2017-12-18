from django.http import JsonResponse
# the print below will get the param
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import re
from collections import Counter

def first_element(x):
  return x[0]

def scrape_url(request):
    # Don't load images on the page
    browser = webdriver.PhantomJS(executable_path='phantomjs',service_args=['--load-images=no'])
    screenName = request.GET.get("screenName")
    url = "https://twitter.com/%s" % screenName
    browser.get(url)
    # The following is to return nothing for url's that do not exist. No handle found
    if (re.match('.*@.*', browser.title.encode('utf8')) == None):
        return JsonResponse({"screenNames": []})

    print browser.title
    # Had to find the perfect amount of time that would allow for crawling through twitter infinite scroll
    pause = 0.5
    lastHeight = browser.execute_script("return document.body.scrollHeight")
    print lastHeight
    i = 0
    # browser.get_screenshot_as_file("test03_1_"+str(i)+".jpg")
    mentions = []
    # Keep crawling down the infinite scroll of the website, gathering data.
    while True:
    	browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        # The following will get all the user mentions by class name of twitter-atreply
        # Filter out when the user mentions himself or retweets a mention of himself
        x = browser.find_elements_by_class_name('twitter-atreply')
        for y in x:
            if (y.text.lower() != ("@%s" % screenName).lower()):
                mentions.append(y.text)
    	time.sleep(pause)
    	newHeight = browser.execute_script("return document.body.scrollHeight")
    	print newHeight
        # Only going up to a scrollHeight of 25000 because it seems relevant enough
        # Scrolls down the infinite scroll of twitter until a scroll height of 25k
        # Will get the most recent user-mentions. Old friends may no longer be friends.
    	if newHeight == lastHeight or newHeight > 20000:
    		break
    	lastHeight = newHeight
    	i += 1
    	# browser.get_screenshot_as_file("test03_1_"+str(i)+".jpg")

    # browser.quit()
    dictionary = Counter(mentions)
    print dictionary
    # print out the dictionary of top mentions
    topfive = map(first_element, dictionary.most_common(5))
    data = {
        "screenNames": topfive
    }
    return JsonResponse(data)
