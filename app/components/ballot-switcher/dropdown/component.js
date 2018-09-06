import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['ballot-switcher__dropdown'],

  chosen: reads('selected'),
  options: computed('races', 'chosen', function() {
    let races = this.races;
    let ids = this.races.mapBy('id').filter(a => /\d/.test(a));
    if (!ids.includes(this.chosen)) {
      races.push({id: this.chosen, raceTitle: `District`});
    }
    return races;
  }),

  changeHandler(e) {
    this.set('chosen', e.target.value);
    this.onChange(e.target.value);
  }
});
