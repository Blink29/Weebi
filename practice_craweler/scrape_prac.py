from requests_html import HTML, HTMLSession

session = HTMLSession()
r = session.get('https://coreyms.com')

articles = r.html.find('article')

for article in articles:
    headline = article.find('.entry-title-link', first=True).text
    print(headline)

    summary = article.find('.entry-content p', first=True).text
    print(summary)

# try except also works
    vid_src_element = article.find('iframe', first=True)
    if vid_src_element:
        vid_src = vid_src_element.attrs.get('src')
        vid_id = vid_src.split('/')[4].split('?')[0]
        yt_link = f'https://youtube.com/watch?v={vid_id}'
        print(yt_link)
    else:
        yt_link = None

    print()