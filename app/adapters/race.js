import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  urlForFindAll() {
    return config.raceSource;
  }
});
