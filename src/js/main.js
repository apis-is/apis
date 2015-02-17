
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
    },
    shim: {
      jquery: { exports: '$' },
      jqEasing: { deps: ['jquery'] },
      underscore: { exports: '_' },
      modernizr: { exports: 'Modernizr' },
    }
  });

  require([
    'init/view'
  ]);
}).call(this);
