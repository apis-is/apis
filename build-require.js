({
  appDir: 'src/js',
  baseUrl: './',
  dir: 'dist/js/',
  mainConfigFile: 'src/js/main.js',
  optimize: 'uglify', // "none": No minification, "uglify": Full minification
  modules: [
    {
      name: 'main',
      include: ['vendor/require']
    },
  ]
})