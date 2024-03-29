'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ny-primary-2018',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    districtSource: process.env.DISTRICT_GEO_JSON_SOURCE,
    raceSource: process.env.RACE_SOURCE,
    googleAPIKey: process.env.GOOGLE_API_KEY,

    calendarLink: `${process.env.FINGERPRINT_PREPEND_URL}${process.env.AWS_PREFIX}/assets/primary.ics`
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-cli-mirage'] = {
      enabled: false
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.googleAPIKey = null;
    ENV.districtSource = 'http://example.com/district';
    ENV.raceSource = 'http://example.com/race';
  }

  if (environment === 'production') {
    ENV.routerRoot = `/${process.env.AWS_PREFIX}/`;
    ENV.locationType = 'hash';
    ENV.ifa = {
      enabled: true
    };
  }

  return ENV;
};
