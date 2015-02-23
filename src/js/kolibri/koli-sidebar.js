define(['jquery', 'cssTranslate', 'viewmodel'], function($, cssTranslate, viewmodel){
  'use strict';
  var attachEvents = function(sidebar) {
    sidebar.$links.on('click.sidebar', function(evt) {
      if (sidebar.state.open) {
        sidebar.close();
        return;
      }
      var content = $(this).attr('data-sidebar');
      if (!content) {
        return;
      }
      evt.preventDefault();
      sidebar.open(content);
    });
    $(viewmodel.overlay).on('click.sidebar', function() {
      sidebar.close();
    });
  };

  var sidebar = {
    state: {
      open: false
    },

    init: function(elem) {
      sidebar.$elem = $(elem);
      sidebar.$pagewrap = $('pagewrap');
      sidebar.$links = $('[data-sidebar]'); // global magic

      attachEvents(sidebar);

      sidebar.close();
    },
    open: function(content) {
      content = content ? content : '/einstaklingar/';
      viewmodel.setState('sidebar','open');
      sidebar.$elem.attr('content', content);
      sidebar.state.open = true;
      sidebar.$elem.find('section[data-id="' + content + '"]').attr('active', 'true').siblings().attr('active', 'false');
      $('html').addClass('noscroll');

      // cssTranslate.x(sidebar.$pagewrap.get(0), -sidebar.$elem.width()/2);
      // sidebar.$pagewrap.css('left', -sidebar.$elem.width()/2);
    },
    close: function() {
      viewmodel.setState('sidebar','closed');
      sidebar.state.open = false;
      $('html').removeClass('noscroll');

      // cssTranslate.x(sidebar.$pagewrap.get(0), 0);
      // sidebar.$pagewrap.css('left', 0);
    },
    toggle: function() {
      if (sidebar.state.open) {
        sidebar.close();
      } else {
        sidebar.open();
      }
    },
    isOpen: function() {
      return sidebar.state.open;
    }
  };

  return {
    init: sidebar.init,
    open: sidebar.open,
    close: sidebar.close,
    toggle: sidebar.toggle,
    isOpen: sidebar.isOpen,
  };
});