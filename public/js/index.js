$(function() {
  var directive = {
    'li': {
      'feed<-feeds': {
        '.name': 'feed.name',
        '.context': 'feed.context',
        '.avatar@src': 'feed.avatar',
        '.picture@src': 'feed.pic'
      }
    }
  };

  var topic = window.location.hash === "" ? '深圳5.26跑车车祸' : window.location.hash.replace('#', '');
  var timer = 3000;

  function refreshData() {
    $.getJSON('/topic.json/' + topic, function(data) {
      weiboData = seperateNameContext(data)['feeds'];
      display();
    });
  }

  function seperateNameContext(data) {
    var context, name, seperatorIndex, feeds = data['feeds'];
    $.each(feeds, function(index) {
      context = feeds[index]['context'];
      seperatorIndex = context.indexOf('&#65306;');
      feeds[index]['name'] = context.substring(0, seperatorIndex);
      feeds[index]['context'] = context.substring(seperatorIndex + 8);
    });
    return data;
  }

  function display() {
    if (weiboData.length == 0) {
      refreshData();
      return;
    }
    setTimeout(function() {
      var currentWeibo = weiboData.shift();
      var newHtml = '<div class="people">' + 
      '<img class="avatar" src="' + currentWeibo['avatar'] + '">' + 
      '<br>' + '<span class="name">' + currentWeibo['name'] + '</span>' + '</div>';
      if(currentWeibo['pic']) {
        newHtml += '<img class="picture" src="' + currentWeibo['pic'] + '">';
      }
      newHtml += '<p class="context">' + currentWeibo['context'] + '</p>';
      
      var currentWeiboEl = $('.weibo:eq(' + currentPosition + ') .wrapper');
      var width = $(window).width();
      currentWeiboEl.animate({
        'left': width
      }, function() {
        currentWeiboEl.html(newHtml).css('left', width);
        currentWeiboEl.animate({
          'left': 0
        });
      });
      currentPosition = currentPosition > 2 ? 0 : currentPosition + 1;
      display();
    }, timer);
  }

  var weiboData;
  var currentPosition;

  $.getJSON('/topic.json/' + topic, function(data) {
    data = seperateNameContext(data);
    weiboData = data['feeds'].slice(4, 10);
    currentPosition = 0;
    data['feeds'] = data['feeds'].slice(0, 4);

    $('.wall').render(data, directive);

    display();
  });
});
