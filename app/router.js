import EmberRouter from '@ember/routing/router';
import config from './config/environment';

let rootURL = config.routerRoot || config.rootURL;

const Router = EmberRouter.extend({
  rootURL,
  location: config.locationType,
});

Router.map(function() {
  this.route('ballot', {path: ':sa_district/:ss_district/:party'});
  this.route('all-races');
});

export default Router;
