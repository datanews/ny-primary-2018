(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['google'],
      __esModule: true,
    };
  }

  define('google', [], vendorModule);
})();
