import Component from '@ember/component';

export default Component.extend({
  classNames: ['ballot-switcher__dropdown'],

  changeHandler(selected) {
    this.set('selected', selected);
    this.onChange(selected);
  }
});
