$(function () {
  var directive = {
   'li':{
    'feed<-feeds':{
     '.context': 'feed.context',
     'img@src': 'feed.pic'
    }
   }
  };


  $.getJSON('/topic.json', function (data) {
    $('.feeds').render(data, directive);
  });
});