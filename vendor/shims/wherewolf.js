(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['Wherewolf'],
      __esModule: true,
    };
  }

  define('wherewolf', [], vendorModule);
})();
