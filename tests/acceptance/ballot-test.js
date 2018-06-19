import { module, test } from 'qunit';
import { visit, currentURL, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | ballot', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting a particular ballot', async function(assert) {
    await visit('/1/dem');

    assert.equal(currentURL(), '/1/dem');
    assert.ok(find('.ballot-switcher'), 'can see ballot switcher');
    assert.equal(find('.ballot-switcher__selected').textContent.trim(), 'District 1', 'correct district is loaded');
    assert.ok(find('.ballot-switcher__parties .active').textContent.trim(), 'Dem', 'corect party is highlighted');
  });
});
