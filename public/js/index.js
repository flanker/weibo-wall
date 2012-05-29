$(function() {
  var directive = {
    'li': {
      'feed<-feeds': {
        '.name': 'feed.name',
        '.context': 'feed.context',
        '.avatar@src': 'feed.pic'
      }
    }
  };

  $.getJSON('/topic.json', function(data) {
    data['feeds'] = data['feeds'].slice(0, 3);
    var context, name, seperatorIndex, feeds = data['feeds'];
    for (var index in feeds) {
      context = feeds[index]['context'];
      seperatorIndex = context.indexOf('&#65306;');
      feeds[index]['name'] = context.substring(0, seperatorIndex);
      feeds[index]['context'] = context.substring(seperatorIndex + 8);
    }

    $('.wall').render(data, directive);
  });
});
