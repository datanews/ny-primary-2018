(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': window.FastClick,
      __esModule: true,
    };
  }

  define('fastclick', [], vendorModule);
})();
