define(['domReady','sidebar','viewmodel','smoothscroll','underscore','jquery'], function(domReady,sidebar,viewmodel,smoothscroll,_,$) {
  domReady(function() {
    sidebar.init('sidebar');

    $('sidebar a[href^="#"]')
      .on('click.smoothscroll', smoothscroll)
      .on('click.sidebar', sidebar.close);
  });
});
