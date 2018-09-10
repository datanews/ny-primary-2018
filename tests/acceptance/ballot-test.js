import { module, test } from 'qunit';
import { visit, currentURL, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import RACE_FIXUTRE from '../../mirage/fixtures/races';

module('Acceptance | ballot', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting a particular ballot', async function(assert) {
    let race = RACE_FIXUTRE[0].race
    let candidateCount = RACE_FIXUTRE.filter(r => r.race === race).length;

    await visit(`/${race}/${race}/dem`);

    assert.equal(currentURL(), `/${race}/${race}/dem`);

    assert.equal(findAll('.candidate-info').length, candidateCount);
  });

});
