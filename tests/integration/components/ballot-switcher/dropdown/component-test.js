import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';
import { selectChoose } from 'ember-power-select/test-support';

module('Integration | Component | ballot-switcher/dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('usage', async function(assert) {
    this.setProperties({
      foo: this.mock('on change handler').atLeast(1),
      districts: [{id: 1}, {id: 2}],
      selected: {id: 1}
    })
    await render(hbs`
      {{ballot-switcher/dropdown
        districts=districts
        selected=selected
        onChange=foo
      }}
    `);

    assert.equal(this.element.textContent.trim(), 'District 1');

    await selectChoose('.ballot-switcher__dropdown', 'District 2');

    assert.equal(this.element.textContent.trim(), 'District 2');
  });
});
