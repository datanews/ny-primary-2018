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
        website: 'www.foo.com',
        party: 'Democrat'
      }, {
        firstName: 'Buz',
        surname: 'Fuz',
        incumbent: 'no',
        website: 'www.wizzz.com',
        party: 'Democrat'
      }, {
        firstName: 'Wiz',
        surname: 'Wqz',
        incumbent: 'yes',
        website: 'www.wizzz.com',
        party: 'Republican'
      }]
    };
    this.set('race', RACE);
    await render(hbs`{{race-detail race=race party='dem'}}`);

    assert.equal(findAll('.race-candidate__item').length, 2, 'should only show democrat candidates');
    assert.equal(find('.race-summary').textContent.trim(), RACE.nutshell);
    assert.equal(find('.race-title').textContent.trim(), `District ${RACE.district}`);

    await render(hbs`{{race-detail race=race party='rep'}}`);
    assert.equal(findAll('.race-candidate__item').length, 1, 'should only show republican candidates');

    await render(hbs`{{race-detail race=race party='green'}}`);

    assert.equal(find('.race-detail').textContent.trim(), 'No Green Candidates Available');
  });

  test('renders withouth a race', async function(assert) {
    await render(hbs`{{race-detail party='green'}}`);

    assert.equal(find('.race-detail').textContent.trim(), 'No Green Candidates Available');
  })
});
