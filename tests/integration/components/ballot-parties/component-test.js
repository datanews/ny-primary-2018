import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ballot-parties', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(4);

    await render(hbs`{{ballot-parties}}`);

    assert.ok(find('.ballot-parties'));

    this.set('onClick', val => assert.equal(val, 'dem', 'calls onClick with expected value'));
    await render(hbs`
      {{#ballot-parties onClick=onClick as |party|}}
        {{party.button 'dem'}}
        {{party.button 'rep'}}
        {{party.button 'grn'}}
        {{party.button 'ind'}}
      {{/ballot-parties}}
    `);

    assert.equal(findAll('.ballot-parties__button').length, 4);

    await click('.ballot-parties__button');

    assert.equal(find('.ballot-parties__button.active').textContent.trim(), 'dem', 'sets an active button');
  });
});
