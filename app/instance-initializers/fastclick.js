import fastclick from 'fastclick';

export function initialize(/* appInstance */) {
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      fastclick.attach(document.body);
    }, false);
  }

}

export default {
  initialize
};
