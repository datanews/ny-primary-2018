import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['race-detail'],

  partyName: computed('party', function() {
    switch(this.party) {
      case 'dem':
        return 'Democratic';
      case 'rep':
        return 'Republican';
      case 'green':
        return 'Green';
      case 'ind':
        return 'Independent';
    }
  }),

  title: computed('race.district', function() {
    if (!this.race) {
      return `No ${this.partyName} Candidates Available`;
    }
    if (/^\d+$/.test(this.race.district)) {
      return `District ${this.race.district}`;
    } else {
      return this.race.district;
    }
  })
});
