define(['jquery','alignVerticalCenter','alignWindowHeight','alignEqualize','alignHelpers'], function($,verticalCenter,windowHeight,equalize,helper){
  'use strict';

  var align = {
    debug: false,
    resizeTimeout: 0,

    init: function() {
      align.attachEvents();
    },

    attachEvents: function() {
      helper.$window.on('resize.align',function(){
        clearTimeout(align.resizeTimeout);
        align.resizeTimeout = setTimeout(function(){
          helper.windowWidth = window.innerWidth || helper.$window.width();
          helper.windowHeight = window.innerHeight || helper.$window.height();
          align.windowHeight();
          align.equalize();
          align.verticalCenter();
        },200);
      }).trigger('resize.align');
    },

    verticalCenter: function(attribute) {
      verticalCenter.init(attribute || 'vertical-center');
    },
    windowHeight: function(attribute) {
      windowHeight.init(attribute || 'window-height');
    },
    equalize: function(attribute) {
      equalize.init(attribute || 'equalize-wrap',verticalCenter);
    },
  };

  return align;
});