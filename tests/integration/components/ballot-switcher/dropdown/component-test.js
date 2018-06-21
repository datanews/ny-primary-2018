import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | ballot-switcher/dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('usage', async function(assert) {
    this.setProperties({
      foo: this.mock('on change handler').atLeast(1).withArgs('2'),
      districts: [{id: 1}, {id: 2}],
      selected: '1'
    });
    await render(hbs`
      {{ballot-switcher/dropdown
        districts=districts
        selected=selected
        onChange=foo
      }}
    `);

    assert.equal(find('.ballot-switcher__field').selectedOptions[0].text, 'District 1');

    await triggerEvent('.ballot-switcher__field option:nth-child(2)', 'change');
  });
});
