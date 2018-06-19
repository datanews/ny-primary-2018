import Component from '@ember/component';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'form',
  classNames: ['ballot-form'],

  router:          inject(),
  districtLocator: inject(),
  party: null,
  address: null,

  submit: e => e.preventDefault(),

  canSubmit: computed('party', 'address', function() {
    return this.party && this.address;
  }),

  showBallot(district, party) {
    this.router.transitionTo('ballot', district, party);
  },

  addressToBallot: task(function * (address) {
    if (!this.canSubmit) {
      return;
    }
    try {
      this.set('error', null);
      let { district } = yield this.districtLocator.findDistrict.linked().perform(address);
      this.showBallot(district, this.party);
    } catch({ error }) {
      this.set('error', error.message);
    }
  })
});
