/* eslint-env node */
'use strict';

module.exports = {
  name: 'google-maps',

  isDevelopingAddon() {
    return true;
  },

  contentFor(type, config) {
    if (type === 'head-footer') {
      return `<script src="https://maps.googleapis.com/maps/api/js?key=${config.googleAPIKey}" async defer></script>`;
    }
  }
};
