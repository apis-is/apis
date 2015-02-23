define(['domReady','scrolltrigger','viewmodel'], function(domReady,scrolltrigger,viewmodel) {
  domReady(function(){
    scrolltrigger.init(['[scrolltrigger]']);

    $('[scrolltrigger]').on('load', function(){
      viewmodel.setPosition(this.id || this.tagName);
    });
  });
});