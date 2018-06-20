import Component from '@ember/component';
import { bool } from '@ember/object/computed';

export default Component.extend({
  classNames: ['candidate-info'],

  incumbent: bool('candidate.incumbent', 'yes')
});
