import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: ['action-button'],
  classNameBindings: [],
  attributeBindings: ['type'],

  type: 'button', // or else the form will try to fire this as its submit action
});
