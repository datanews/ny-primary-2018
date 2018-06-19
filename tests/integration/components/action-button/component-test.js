import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | action-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);
    this.set('trigger', () => assert.ok('trigger fired'));
    await render(hbs`{{action-button click=trigger}}`);

    assert.ok(find('.action-button'));

    await click('.action-button');

    await render(hbs`
      {{#action-button}}
        template block text
      {{/action-button}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
