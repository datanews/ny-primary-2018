import Component from '@ember/component';
import { equal } from '@ember/object/computed';

export default Component.extend({
  classNames: ['candidate-info'],

  incumbent: equal('candidate.incumbent', 'yes')
});
