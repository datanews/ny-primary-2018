import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  locator: inject('district-locator'),

  beforeModel() {
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
