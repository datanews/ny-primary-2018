import Component from '@ember/component';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Component.extend({
  tagName: 'form',
  classNames: ['ballot-form'],

  router:          inject(),
  districtLocator: inject(),
  party: "dem",
  address: null,

  submit: e => e.preventDefault(),

  canSubmit: computed('party', 'address', function() {
    return this.party && this.address;
  }),

  showBallot(saDistrict, ssDistrict, party) {
    this.router.transitionTo('ballot', saDistrict, ssDistrict, party);
  },

  addressToBallot: task(function * (address) {
    if (!this.canSubmit) {
      return;
    }
    try {
      this.set('error', null);
      let { saDistrict, ssDistrict } = yield this.districtLocator.findDistrict.linked().perform(address);
      this.showBallot(saDistrict, ssDistrict, this.party);
    } catch({ error }) {
      this.set('error', error);
    }
  }).restartable(),

  coordsToBallot(lat, lng) {
    if (!this.canSubmit) {
      return;
    }
    let { district } = this.districtLocator.pinPoint(lat, lng);
    this.showBallot(district, this.party);
  },

  loading: reads('addressToBallot.isRunning'),
});
