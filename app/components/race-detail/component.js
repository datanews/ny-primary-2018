import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['race-detail'],

  title: computed('race.district', function() {
    if (/^\d+$/.test(this.race.district)) {
      return `District ${this.race.district}`;
    } else {
      return this.race.district;
    }
  })
});
