import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ballot-form/party', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{ballot-form/party}}`);

    assert.ok(find('.ballot-form__party'));
  });

  test('it has an active state', async function(assert) {
    await render(hbs`{{ballot-form/party}}`);

    assert.notOk(find('.ballot-form__party.active'));

    await render(hbs`{{ballot-form/party 'dem' party='dem'}}`);

    assert.ok(find('.ballot-form__party.active'));
  });

  test('it calls onClick', async function(assert) {
    assert.expect(1);
    const VAL = 'value';
    this.set('val', VAL);
    this.set('onClick', val => assert.equal(val, VAL, 'click called'));
    await render(hbs`{{ballot-form/party val onClick=onClick}}`)

    await click('.ballot-form__party');
  });
});
