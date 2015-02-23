define(['jquery','alignHelpers'], function($,helper){
  'use strict';

  var verticalCenter = {
    init: function(attr) {
      helper.runVerticalCenter = attr;
      $('[' + attr + ']').each(function(index,element) {
        verticalCenter.process(attr,element);
      });
    },
    process: function(attr,element) {
      var obj = {}, styles = {};
      obj.type = 'vertical-center';
      obj.$element = $(element);
      obj.$parent = obj.$element.parent();
      obj.options = helper.parceOptions(attr,obj.$element);

      helper.processOptions(obj.options, function() {
        obj.$element.css(verticalCenter.nostyle);

        styles = typeof obj.options['fixed'] !== 'undefined' ? verticalCenter.fixed : verticalCenter.absolute;
        styles.height = helper.calculate(obj,obj.$element.outerHeight());

        obj.$element.css(styles);

        obj.styles = styles;
        helper.$document.trigger('vertical-center',obj);
      });
    },
    reset: function() {
      if (helper.runVerticalCenter) {
        $('[' + helper.runVerticalCenter + ']').css(verticalCenter.nostyle);
      }
    },
    absolute: {
      'margin-top': 'auto',
      'margin-bottom': 'auto',
      'position': 'absolute',
      'top': '0',
      'bottom': '0'
    },
    fixed: {
      'margin-top': 'auto',
      'margin-bottom': 'auto',
      'position': 'fixed',
      'top': '0',
      'bottom': '0'
    },
    nostyle: {
      'position': '',
      'margin-top': '',
      'margin-bottom': '',
      'top': '',
      'bottom': '',
      'height': ''
    },
  };

  return verticalCenter;
});