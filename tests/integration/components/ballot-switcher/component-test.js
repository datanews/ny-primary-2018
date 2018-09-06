import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ballot-switcher', function(hooks) {
  setupRenderingTest(hooks);

  test('usage', async function(assert) {
    this.setProperties({
      party: 'dem',
      races: [{id: 1, raceTitle: "Senate"}, {id: 2, raceTitle: "Senate"}],
      selected: [{id: 1}],
      update: (party, district) => assert.deepEqual([party, district], ['dem', '2'], 'update is called with current party and district')
    });

    await render(hbs`
      {{#ballot-switcher as |switcher|}}
        {{switcher.dropdown
          races=races
          selected=selected
          onChange=(action update party)
        }}
      {{/ballot-switcher}}
    `);

    await triggerEvent('.ballot-switcher__field option:nth-child(2)', 'change');
  });
});
