import Component from '@ember/component';
import { reads } from '@ember/object/computed';

export default Component.extend({
  classNames: ['ballot-switcher__dropdown'],

  chosen: reads('selected'),

  changeHandler(e) {
    this.set('chosen', e.target.value);
    this.onChange(e.target.value);
  }
});
