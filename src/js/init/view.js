define(['jquery'], function($) {
  var $html = $('html'),
      $document = $(document),
      fallback;

  fallback = setTimeout(function(){
    $document.trigger('init-view');
  },2000);

  $('loader > box').on('webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend', function() {
    $document.trigger('init-view');
  });

  $document.one('init-view', function (evt) {
    clearTimeout(fallback);
    $html.removeClass('loading').addClass('prep');
    $document.trigger('prep');
    $(window).trigger('resize');
    $(window).trigger('scroll');

    setTimeout(function(){
      $html.removeClass('prep').addClass('loaded');
      $document.trigger('loaded');
      $(window).trigger('resize');
      $(window).trigger('scroll');
    },750);
  });
});