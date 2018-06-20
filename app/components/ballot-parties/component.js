import Component from '@ember/component';

export default Component.extend({
  classNames: ['ballot-parties'],

  handleClick(party) {
    this.set('party', party);
    this.onClick(party);
  }
});
