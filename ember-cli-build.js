'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const env = EmberApp.env();

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      enabled: env === 'production',
      prepend: process.env.FINGERPRINT_PREPEND_URL
    },
    sourcemaps: {
      enabled: true
    }
  });


  app.import('node_modules/normalize.css/normalize.css');
  app.import('node_modules/wherewolf/wherewolf.js');

  app.import('vendor/shims/google.js');
  app.import('vendor/shims/wherewolf.js');
  return app.toTree();
};
