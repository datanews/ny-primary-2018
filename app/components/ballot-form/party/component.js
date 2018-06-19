import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';

const PartyButton = Component.extend({
  tagName: 'button',
  classNames: ['ballot-form__party'],
  classNameBindings: ['active'],
  attributeBindings: ['data-test-selector', 'type'],

  type: 'button', // or else the form will try to fire this as its submit action
  'data-test-selector': reads('value'),

  active: computed('party', 'value', function() {
    return this.value && this.party === this.value;
  }),

  click() {
    this.onClick(this.value);
  },

  onClick() {}
});

PartyButton.reopenClass({
  positionalParams: ['value']
});

export default PartyButton;
