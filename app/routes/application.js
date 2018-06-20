import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('race');
  },

  actions: {
    didTransition() {
      window.scrollTo(0, 0);
    }
  }
});
