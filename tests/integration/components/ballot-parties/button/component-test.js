import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ballot-parties/button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{ballot-parties/button 'foo'}}`);

    assert.equal(this.element.textContent.trim(), 'foo');

    await render(hbs`
      {{#ballot-parties/button}}
        template block text
      {{/ballot-parties/button}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('attrs', async function(assert) {
    assert.expect(2);
    this.set('onClick', val => assert.equal(val, 'foo', 'onClick was called'))

    await render(hbs`{{ballot-parties/button 'foo' party='foo' onClick=onClick}}`);
    assert.ok(find('.ballot-parties__button.active'))

    await click('.ballot-parties__button');
  });
});
