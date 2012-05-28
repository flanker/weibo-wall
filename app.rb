require 'sinatra'
require 'json'
require 'scrapi'
require 'net/http'
require 'uri'
require 'haml'

def get_html_content(requested_url)
  url = URI.parse(requested_url)
  the_request = Net::HTTP::Get.new("#{url.path}?#{url.query}")

  the_response = Net::HTTP.start(url.host, url.port) { |http|
    http.request(the_request)
  }

  raise "Response was not 200, response was #{the_response.code}" if the_response.code != "200"
  return the_response.body
end

def get_feeds
  feed_scraper = Scraper.define do
    process ".liveStream_mainFeed_listContent_txt", :context => :text
    process ".liveStream_mainFeed_listPic img", :pic => '@src'

    result :context, :pic
  end

  feeds_scraper = Scraper.define do
    array :feeds

    process '.liveStream_mainFeed_list', :feeds => feed_scraper

    result :feeds
  end

  feeds_scraper.scrape(get_html_content('http://widget.weibo.com/livestream/listlive.php?publish=0&talk=1&refer=1&titlebar=1&border=1&member=1&width=0&height=800&skin=8&colordiy=0&ptype=1&language=zh_cn&atopic=%E5%94%90%E5%B1%B14.8%E7%BA%A7%E5%9C%B0%E9%9C%87&ptopic=%E5%94%90%E5%B1%B14.8%E7%BA%A7%E5%9C%B0%E9%9C%87&at=1'))
end

enable :run

get "/topic.json" do
  feeds = get_feeds
  feeds.map do |feed|
    {:context => feed.context, :pic => feed.pic}
  end.to_json
end

get '/' do
  haml :index
end
