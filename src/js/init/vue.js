define(['domReady', 'vue', 'sidebar'], function(domReady, Vue, sidebar) {
  var init = function(data) {
    Vue.filter('defaultIcon', function(value){
      // Returns a default icon if no value is given
      return value || 'cube';
    });
    new Vue({
      el: '#apis',
      data: {
        endpoints: data
      },
      methods: {
        closeSidebar: sidebar.close
      }
    });
  };

  domReady(function(){
    var data = [];
    var request = new XMLHttpRequest();
    request.open('GET', 'http://beta.apis.is/docs.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = JSON.parse(request.responseText);
        init(data);
      } else {
        // TODO: Handle error response
      }
    };

    request.onerror = function() {
      // TODO: Handle connection errors
    };

    request.send();
  });
});