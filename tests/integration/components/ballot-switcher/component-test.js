import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { selectChoose } from 'ember-power-select/test-support';

module('Integration | Component | ballot-switcher', function(hooks) {
  setupRenderingTest(hooks);

  test('usage', async function(assert) {
    this.setProperties({
      party: 'dem',
      districts: [{id: 1}, {id: 2}],
      selected: [{id: 1}],
      update: (party, district) => assert.deepEqual([party, district], ['rep', {id: 2}], 'update is called with current party and district')
    });

    await render(hbs`
      {{#ballot-switcher as |switcher|}}
        {{switcher.dropdown
          districts=districts
          selected=selected
          onChange=(action update party)
        }}

        {{#switcher.parties onClick=(action (mut party)) party=party as |parties|}}
        <ul>
          <li>
            {{parties.button 'dem'}}
          </li>
          <li>
            {{parties.button 'rep'}}
          </li>
          <li>
            {{parties.button 'green'}}
          </li>
          <li>
            {{parties.button 'ind'}}
          </li>
        </ul>
        {{/switcher.parties}}

      {{/ballot-switcher}}
    `);

    await click('.ballot-parties li:nth-child(2) button');
    await selectChoose('.ballot-switcher__dropdown', 'District 2');
  });
});
