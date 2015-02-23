define(['jquery'], function(){
  'use strict';

  var helper = {
    $window: $(window),
    $document: $(document),

    runSquare: false,
    runEqualize: false,
    runVerticalCenter: false,
    runWindowHeight: false,

    windowWidth: 0,
    windowHeight: 0,

    parceOptions: function(attr,$element) {
      var options = $element.data('align-options');
      if (options) { return options; }

      options = $element.attr(attr);
      if (typeof options === 'undefined' || options === '') {
        return {};
      }

      if (options.charAt(0) === '{') { options = options.split('{')[1]; }
      if (options.charAt(options.length - 1) === '}') { options = options.split('}')[0]; }
      options = options.split(',');

      var optionsObj = {};
      $.each(options, function(index,item) {
        var opt = item.split(':');
        var value = opt[1];
        if (!isNaN(+value)) {
          optionsObj[opt[0]] = +value;
        } else if (value === 'true') {
          optionsObj[opt[0]] = true;
        } else if (value === 'false') {
          optionsObj[opt[0]] = false;
        } else {
          optionsObj[opt[0]] = value;
        }
      });

      options = optionsObj;

      $element.data('align-options',options).attr(attr,'');

      return options;
    },

    processOptions: function(options,callback) {
      if (typeof options['above'] === 'number' && helper.windowWidth < options['above']) { return; }
      if (typeof options['below'] === 'number' && helper.windowWidth > options['below']) { return; }

      if (typeof callback === 'function') {
        callback();
      }
    },

    calculate: function(obj,value) {
      value = value || helper.windowHeight;
      if (typeof obj.options['multiply'] === 'number') {
        var multiplier = isNaN(obj.options['multiply']) ? 1 : obj.options['multiply'];
        value = value * multiplier;
      }
      if (typeof obj.options['subtract'] === 'number') {
        var subtract = isNaN(obj.options['subtract']) ? 0 : obj.options['subtract'];
        value = value - subtract;
      }
      if (typeof obj.options['add'] === 'number') {
        var add = isNaN(obj.options['add']) ? 0 : obj.options['add'];
        value = value - add;
      }
      return value;
    },

    maxHeight: function($columns,min){
      if (typeof $columns !== 'object') {
        return 0;
      }
      var minHeight = typeof min !== 'undefined' && !isNaN(min) ? min : 0;
      var height = 0;
      var maxHeight = 0;

      for(var i = 0; i < $columns.length; i++){
        height = $($columns[i]).outerHeight();
        if(height > maxHeight) {
          maxHeight = height;
        }
      }

      if (maxHeight < minHeight) {
        maxHeight = minHeight;
      }

      return maxHeight;
    },

  };

  return helper;
});