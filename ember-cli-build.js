'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const env = EmberApp.env();

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'node_modules/include-media/dist'
      ]
    },
    babel: {
      plugins: ['transform-object-rest-spread']
    },
    fingerprint: {
      enabled: env === 'production',
      prepend: `${process.env.FINGERPRINT_PREPEND_URL}${process.env.AWS_PREFIX}/`,
      generateAssetMap: true,
      fingerprintAssetMap: true
    },
    sourcemaps: {
      enabled: true
    }
  });


  app.import('node_modules/topojson/dist/topojson.min.js');
  app.import('node_modules/normalize.css/normalize.css');
  app.import('node_modules/wherewolf/wherewolf.js');

  app.import('vendor/shims/google.js');
  app.import('vendor/shims/wherewolf.js');
  app.import({
    development: 'node_modules/pym.js/dist/pym.v1.js',
    production: 'node_modules/pym.js/dist/pym.v1.min.js',
  }, {
    using: [
      {transformation: 'amd', as: 'pym'}
    ]
  });
  app.import('node_modules/fastclick/lib/fastclick.js');
  app.import('vendor/shims/fastclick.js');
  return app.toTree();
};
