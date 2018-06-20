import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | candidate-info', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('candidate', {
      party: 'Republican',
      firstName: 'Foo',
      surname: 'Bar',
    })
    await render(hbs`{{candidate-info candidate=candidate}}`);

    assert.equal(find('.candidate-info__name').textContent.trim(), 'Foo Bar (R)');
    assert.notOk(find('.candidate-info__is-incumbent'));

    this.set('candidate.incumbent', 'yes');
    assert.ok(find('.candidate-info__is-incumbent'));
  });
});
