define(['jquery','alignHelpers'], function($,helper){
  'use strict';

  var windowHeight = {
    init: function(attr) {
      helper.runWindowHeight = attr;
      $('[' + attr + ']').each(function(index,element) {
        windowHeight.process(attr,element);
      });
    },
    process: function(attr,element) {
      var obj = {}, styles = {}, property, value;
      obj.type = 'window-height';
      obj.$element = $(element);
      obj.options = helper.parceOptions(attr,obj.$element);
      property = typeof obj.options['force'] !== 'undefined' ? 'height' : 'min-height';

      obj.$element.css(property,'');

      helper.processOptions(obj.options, function() {
        value = helper.calculate(obj);

        styles[property] = value;

        obj.$element.css(styles);

        obj.styles = styles;
        helper.$document.trigger('window-height',obj);
      });
    },
  };

  return windowHeight;
});