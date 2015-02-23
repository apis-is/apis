define(['domReady'], function(domReady) {
  var viewmodel = {
    state: [],
    position: '',
    nav: [],
    init: function() {
      viewmodel.overlay = document.createElement('overlay');
      document.body.appendChild(viewmodel.overlay);
    },
    setState: function(section, state) {
      viewmodel.state[section] = state;
      document.body.setAttribute('data-' + section + '-state', state);
    },
    setPosition: function(position) {
      viewmodel.position = position.toLowerCase();
      document.body.setAttribute('data-viewmodel-position', viewmodel.position);
    },
    sidebarVisible: function() {
      return viewmodel.state === 'sidebar-open';
    }
  };

  domReady(viewmodel.init);

  return viewmodel;
});
