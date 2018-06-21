import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['ballot-switcher__dropdown'],

  chosen: reads('selected'),
  options: computed('districts', 'chosen', function() {
    let ids = this.districts.mapBy('id');
    if (!ids.includes(this.chosen)) {
      ids.push(this.chosen);
      ids.sort((a, b) => Number(a) - Number(b));
    }
    return ids;
  }),

  changeHandler(e) {
    this.set('chosen', e.target.value);
    this.onChange(e.target.value);
  }
});
