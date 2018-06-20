import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | party-name', function(hooks) {
  setupRenderingTest(hooks);

  test('short inputs', async function(assert) {
    this.set('party', 'dem');

    await render(hbs`{{party-name party 'short'}}`);

    assert.equal(this.element.textContent.trim(), 'dem');

    await render(hbs`{{party-name party 'adj'}}`);

    assert.equal(this.element.textContent.trim(), 'Democratic');

    await render(hbs`{{party-name party 'formal'}}`);

    assert.equal(this.element.textContent.trim(), 'Democrat');
  });

  test('formal inputs', async function(assert) {
    this.set('party', 'Democrat');

    await render(hbs`{{party-name party 'short'}}`);

    assert.equal(this.element.textContent.trim(), 'dem');

    await render(hbs`{{party-name party 'adj'}}`);

    assert.equal(this.element.textContent.trim(), 'Democratic');

    await render(hbs`{{party-name party 'formal'}}`);

    assert.equal(this.element.textContent.trim(), 'Democrat');
  });
});

// original: dem
// short: dem
// adj: Democratic
// formal: Democrat
