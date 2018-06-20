import Component from '@ember/component';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  assets: inject('asset-map'),

  classNames: ['candidate-info'],

  incumbent: equal('candidate.incumbent', 'yes'),
  image: computed('candidate.id', function() {
    return this.assets.resolve(`assets/images/candidates/${this.candidate.id}.jpg`);
  })
});
