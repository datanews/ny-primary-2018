import { module, test } from 'qunit';
import { visit, currentURL, find, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | ballot', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting a particular ballot', async function(assert) {
    await visit('/1/dem');

    assert.equal(currentURL(), '/1/dem');
    assert.ok(find('.ballot-switcher'), 'can see ballot switcher');
    assert.equal(findAll('.ballot-parties__button').length, 4, '4 parties availble to choose from');
    assert.equal(find('.ballot-switcher__dropdown').textContent.trim(), 'District 1', 'correct district is loaded');
    assert.ok(find('.ballot-switcher__parties .active').textContent.trim(), 'Dem', 'corect party is highlighted');
  });
});
