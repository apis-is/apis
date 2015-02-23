define(['jquery','domReady'], function($,domReady) {
  $(document).on('loaded',function(){
    $('[toggle-next]').each(function() {
      var status = $(this).attr('toggle-next');
      var $target = $($(this).next());
      if ($target.length > 0) {
        if (status === 'closed') {
          $target.hide();
          $(this).attr('toggle-next','hidden');
        } else {
          $(this).attr('toggle-next','visible');
        }
        $(this).on('click.toggle-next', function() {
          if ($target.is(':visible')) {
            $target.stop().slideUp();
            $(this).attr('toggle-next','hidden');
          } else {
            $target.stop().slideDown();
            $(this).attr('toggle-next','visible');
          }
        });
      }
    });
  });
});