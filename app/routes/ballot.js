import Route from '@ember/routing/route';
import { bind } from '@ember/runloop';

export default Route.extend({
  model({ district, party }) {
    let race = this.store.peekRecord('race', district);
    return {
      race,
      party,
      selected: race ? race : {id: district},
      districts: this.store.peekAll('race'),
    };
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('update', bind(this, 'update'));
  },

  update(type, value) {
    let { district, party } = this.paramsFor(this.routeName);
    if (type === 'district') {
      district = value.get('id');
    } else if (type === 'party') {
      party = value;
    }
    this.transitionTo('ballot', district, party);
  }
});
