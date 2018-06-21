import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import pym from 'pym';

export default Route.extend({
  locator: inject('district-locator'),

  beforeModel() {
    new pym.Child({polling: 200});
    this.locator.loadDistricts.perform();
  },
  model() {
    return this.store.findAll('race');
  },

  actions: {
    didTransition() {
      window.scrollTo(0, 0);
    }
  }
});
