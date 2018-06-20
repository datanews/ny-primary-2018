(function() {
  function vendorModule() {
    'use strict';

    if (!self['google']) {
      self['google'] = {maps: {Geocoder: {}}};
    }
    return {
      'default': self['google'],
      __esModule: true,
    };
  }

  define('google', [], vendorModule);
})();
