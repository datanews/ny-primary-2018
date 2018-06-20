import Component from '@ember/component';
import { computed } from '@ember/object';
import { bool } from '@ember/object/computed';

export default Component.extend({
  classNames: ['candidate-info'],

  party: computed('candidate.party', function() {
    switch(this.candidate.party) {
      case 'Democrat':
        return '(D)';
      case 'Republican':
        return '(R)';
      case 'Green':
        return '(G)';
      case 'Independent':
        return '(I)';
    }
  }),

  incumbent: bool('candidate.incumbent', 'yes')
});
