define(['jquery'], function() {
  var trigger = {
    elems: {},

    scrollTop: 0,
    scrollTrigger: 0,
    windowHeight: 0,
    trigger: 0.5,

    init: function(selectors){
      trigger.$window = $(window);

      if (typeof selectors === 'string') {
        selectors = [selectors];
      }

      $.each(selectors,function(index,selector){
        trigger.elems[index] = $(selector);
        trigger.attachEvents(index,selector);
      });

      setTimeout(function(){
        trigger.$window.trigger('scrolltrigger');
      },1);
    },

    attachEvents: function(index,selector) {
      var $element = $(selector);
      if ($element.length <= 0) {
        return;
      }
      trigger.$window.on('resize.scrolltrigger-'+index,function(){
        $('[scrolltrigger="active"]').triggerHandler('load');
        trigger.$window.trigger('scroll.scrolltrigger-'+index);
      });

      trigger.$window.on('scroll.scrolltrigger-'+index+' scrolltrigger',function(){
        trigger.scrollTop = trigger.$window.scrollTop();
        trigger.scrollTrigger = trigger.scrollTop + (trigger.windowHeight * (1-trigger.trigger));
        trigger.scrollAntiTrigger = trigger.scrollTop + (trigger.windowHeight * (trigger.trigger));

        $element.each(function(index,item){
          var $item = $(item),
              elementTop = 0,
              elementBtm = 0;

          elementTop = $item.offset().top;
          elementBtm = $item.offset().top + $item.outerHeight(true);
          trigger.windowHeight = trigger.$window.height();

          if (trigger.scrollTrigger >= elementTop && trigger.scrollAntiTrigger <= elementBtm && $item.attr('scrolltrigger') !== 'active') {
            $item.attr('scrolltrigger','active');
            $($item[0]).triggerHandler('load');
          } else if ((trigger.scrollTrigger <= elementTop || trigger.scrollAntiTrigger >= elementBtm) && $item.attr('scrolltrigger') === 'active') {
            $item.attr('scrolltrigger','inactive');
            $($item[0]).triggerHandler('unload');
          }
        });
      });
    }
  };

  return trigger;
});