import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | race-detail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const RACE = {
      district: 2,
      nutshell: 'Foo',
      party: 'Democrat',
      candidates: [{
        firstName: 'Bar',
        surname: 'Baz',
        incumbent: 'yes',
        website: 'www.foo.com'
      }, {
        firstName: 'Buz',
        surname: 'Fuz',
        incumbent: 'no',
        website: 'www.wizzz.com'
      }]
    };
    this.set('race', RACE);
    await render(hbs`{{race-detail race=race}}`);

    assert.equal(findAll('.race-candidate__item').length, 2);
    assert.equal(find('.race-summary').textContent.trim(), RACE.nutshell);
    assert.equal(find('.race-title').textContent.trim(), `District ${RACE.district}`);
  });
});
