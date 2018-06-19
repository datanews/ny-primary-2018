import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('update', this.update);
  },

  update(party, district) {

  }
});
