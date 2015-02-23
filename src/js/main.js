
(function() {
  require.config({
    baseUrl: '/js',
    paths: {
      async: 'vendor/async',
      depend: 'vendor/depend',
      font: 'vendor/font',
      goog: 'vendor/goog',
      image: 'vendor/image',
      json: 'vendor/json',
      mdown: 'vendor/mdown',
      noext: 'vendor/noext',
      propertyParser: 'vendor/propertyParser',
      mdConverter: 'vendor/Markdown.Converter',
      text: 'vendor/text',

      domReady: 'vendor/domReady',
      jquery: 'vendor/jquery.min',
      jqEasing: 'vendor/jquery.easing.min',
      classList: 'vendor/classList',
      underscore: 'vendor/underscore-min',

      modernizr: 'vendor/modernizr',

      sidebar: 'kolibri/koli-sidebar',
      smoothscroll: 'kolibri/koli-smoothscroll',
      cssTranslate: 'kolibri/koli-css-translate',
      scrolltrigger: 'kolibri/koli-scrolltrigger',

      align: 'kolibri/koli-align',
      alignHelpers: 'kolibri/koli-align-helpers',
      alignEqualize: 'kolibri/koli-align-equalize',
      alignVerticalCenter: 'kolibri/koli-align-vertical-center',
      alignWindowHeight: 'kolibri/koli-align-window-height',

    },
    shim: {
      jquery: { exports: '$' },
      jqEasing: { deps: ['jquery'] },
      underscore: { exports: '_' },
      modernizr: { exports: 'Modernizr' },
    }
  });

  require([
    'viewmodel',
    'init/view',
    'init/align',
    'init/scrolltrigger',
    'init/smoothscroll',
    'init/toggle',
    'init/sidebar',
  ]);
}).call(this);
