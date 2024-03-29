import Component from '@ember/component';
import { computed } from '@ember/object';
import { partyName } from '../../helpers/party-name';

export default Component.extend({
  classNames: ['race-detail'],
  classNameBindings: ['empty:is-empty'],

  empty: computed('race', 'candidates', function() {
    return !this.race || !this.candidates.length;
  }),

  candidates: computed('race.candidates', 'party', function() {
    if (!this.race) {
      return [];
    }
    let { candidates } = this.race;
    return candidates.filterBy('party', partyName([ this.party, 'formal']));
  }),

  title: computed('race.district', function() {
    if (!this.race) {
      return;
    }
    if (/^\d+$/.test(this.race.district)) {
      return `${this.race.raceTitle} - District ${this.race.district}`;
    } else {
      return this.race.raceTitle;
    }
  })
});
