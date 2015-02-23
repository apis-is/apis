define(['jquery','jqEasing'], function($) {
  var smoothScroll = function(evt,anchor,animDur){
    if (evt && (evt.ctrlKey || evt.metaKey || evt.which === 2)) {
      return;
    }
    anchor = anchor || $(this).attr('href');
    animDur = animDur || 750;
    if (typeof anchor === 'undefined' || anchor === '') {
      anchor = $(this).attr('smoothscroll');
    }
    if (typeof anchor === 'undefined' || anchor === '') {
      return;
    }

    if (evt) {
      evt.preventDefault();
    }

    try {
      if(anchor.charAt(0) === '/' && anchor.charAt(1) === '#') {
        anchor = anchor.substr(1);
      }
      if(anchor === '#') {
        anchor = '#top';
      }
      $('html,body').stop().animate({
        scrollTop: (anchor === '#top' ? 0 : $(anchor).offset().top)
      },animDur, 'easeInOutExpo');

      setTimeout(function(){
        if (anchor === '#top') {
          window.location.hash = '';
        } else {
          window.location.hash = anchor;
        }
      }, animDur+100);
    } catch (exception) {
      window.location.hash = anchor;
    }
    return false;
  };

  return smoothScroll;
});