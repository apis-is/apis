define(function(){
  var trans = {
    value: function(x,y,z,scale) {
      x = typeof x !== 'undefined' && x !== '' ? x : 0;
      y = typeof y !== 'undefined' && y !== '' ? y : 0;
      z = typeof z !== 'undefined' && z !== '' ? z : 0;
      scale = typeof scale !== 'undefined' && scale !== '' ? ' scale('+scale+')' : '';
      return {
        '-webkit-transform': 'translate3d(' + x + 'px,' + y + 'px,' + z +'px)' + scale,
        '-moz-transform': 'translate3d(' + x + 'px,' + y + 'px,' + z +'px)' + scale,
        '-ms-transform': 'translate3d(' + x + 'px,' + y + 'px,' + z +'px)' + scale,
        '-o-transform': 'translate3d(' + x + 'px,' + y + 'px,' + z +'px)' + scale,
        'transform': 'translate3d(' + x + 'px,' + y + 'px,' + z +'px)' + scale
      };
    },
    apply3d: function(elm,x,y,z,scale) {
      var translateObj = trans.value(x,y,z,scale);
      if (elm === null) { return; }

      for (var key in translateObj) {
        if(translateObj.hasOwnProperty(key)) {
          elm.style[key] = translateObj[key];
        }
      }
    },
    x: function(elm,value,scale) {
      return trans.apply3d(elm,value,0,0,scale);
    },
    y: function(elm,value,scale) {
      return trans.apply3d(elm,0,value,0,scale);
    },
    z: function(elm,value,scale) {
      return trans.apply3d(elm,0,0,value,scale);
    }
  };

  return trans;
});