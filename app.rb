# encoding: utf-8

require 'sinatra'
require 'json'
require 'scrapi'
require 'net/http'
require 'uri'
require 'haml'
require "cgi"

def get_html_content(requested_url)
  url = URI.parse(requested_url)
  the_request = Net::HTTP::Get.new("#{url.path}?#{url.query}")

  the_response = Net::HTTP.start(url.host, url.port) { |http|
    http.request(the_request)
  }

  raise "Response was not 200, response was #{the_response.code}" if the_response.code != "200"
  return the_response.body
end

def get_feeds topic
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

  url = "http://widget.weibo.com/livestream/listlive.php?pic=1&atopic=#{CGI::escape(topic)}"

  feeds_scraper.scrape(get_html_content(url))
end

enable :run

get "/topic.json/:topic" do
  feeds = get_feeds(params[:topic]).map do |feed|
    {:context => feed.context, :pic => feed.pic.sub('/30/', '/180/')}
  end
  { :feeds => feeds }.to_json
end

get '/' do
  haml :index
end
