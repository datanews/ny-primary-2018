import { module, test } from 'qunit';
import { visit, currentURL, find, findAll, triggerEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import RACE_FIXUTRE from '../../mirage/fixtures/races';

module('Acceptance | ballot', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting a particular ballot', async function(assert) {
    let race = RACE_FIXUTRE[0].race
    let candidateCount = RACE_FIXUTRE.filter(r => r.race === race).length;

    await visit(`/${race}/dem`);

    assert.equal(currentURL(), `/${race}/dem`);
    assert.ok(find('.ballot-switcher'), 'can see ballot switcher');
    // assert.equal(findAll('.ballot-parties__button').length, 2, '2 parties availble to choose from');
    assert.equal(find('.ballot-switcher__field').selectedOptions[0].text, `District ${race}`, 'correct district is loaded');
    // assert.ok(find('.ballot-parties .active').textContent.trim(), 'Dem', 'correct party is highlighted');

    assert.equal(findAll('.candidate-info').length, candidateCount);
  });

  test('switching ballots', async function(assert) {
    let [race1, race2] = RACE_FIXUTRE.reduce((races, r) => {
      if (races.includes(r.race)) { return races }
      races.push(r.race);
      return races;
    }, []);
    await visit(`/${race1}/dem`);
    assert.equal(currentURL(), `/${race1}/dem`, 'initial load');

    let candidateName1 = find('.candidate-info__name').textContent.trim();

    await triggerEvent('.ballot-switcher__field option:nth-child(1)', 'change');

    assert.equal(currentURL(), `/${race2}/dem`, 'switch district');

    let candidateName2 = find('.candidate-info__name').textContent.trim();

    assert.notEqual(candidateName1, candidateName2, 'candidates should change when district changes');

    // await click('.ballot-parties li:nth-child(1) button');
    // assert.equal(currentURL(), `/${race2}/rep`, 'switch party');

    // let candidateName3 = find('.candidate-info__name').textContent.trim();
    // assert.notEqual(candidateName2, candidateName3, 'candidates should change when party changes');
  });
});
