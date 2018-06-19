import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  click,
  findAll,
  triggerKeyEvent,
  fillIn,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';
import Service from '@ember/service';
import { task } from 'ember-concurrency';
import sinon from 'sinon';

import ERRORS from 'ny-primary-2018/lib/errors';
import { MULTIPLE_RESULTS } from '../../../fixtures/geocoder';

let findSpy;
let district;
const LocatorStub = Service.extend({
  findDistrict: task(function * (address) {
    yield findSpy(address);
    return {district};
  })
});

const RouterStub = Service.extend({
  transitionTo: sinon.spy()
});

module('Integration | Component | ballot-form', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    findSpy = sinon.spy();
    this.owner.register('service:district-locator', LocatorStub);
  }),

  test('it renders', async function(assert) {
    await render(hbs`{{ballot-form}}`);

    assert.ok(find('.ballot-form'));
  });

  test('can only select 1 party', async function(assert) {
    await render(hbs`{{ballot-form}}`);
    await click('[data-test-selector=dem]');
    assert.equal(findAll('.ballot-form__party.active').length, 1);

    await click('[data-test-selector=rep]');

    await click('[data-test-selector=ind]');
    assert.equal(findAll('.ballot-form__party.active').length, 1);
  });

  test('must enter an address and select a party to activate form', async function(assert) {
    this.owner.register('service:router', RouterStub);

    await render(hbs`{{ballot-form}}`);

    await click('.ballot-form__submit');
    await triggerKeyEvent('.ballot-form__field', 'keypress', 'Enter');

    assert.equal(findSpy.callCount, 0);

    await fillIn('.ballot-form__field', '123 main street')
    await triggerKeyEvent('.ballot-form__field', 'keypress', 'Enter');
    await click('.ballot-form__submit');

    assert.equal(findSpy.callCount, 0);

    await click('.ballot-form__party');
    await click('.ballot-form__submit');
    assert.equal(findSpy.callCount, 1);
  });

  test('submitting calls showBallot with district and party', async function(assert) {
    district = 1;
    const PARTY = 'dem';
    let spy = this.spy();
    this.set('showBallot', spy);

    await render(hbs`{{ballot-form showBallot=showBallot}}`);
    await fillIn('.ballot-form__field', '123 main street')
    await click('[data-test-selector=dem]');

    await click('.ballot-form__submit');
    assert.ok(spy.calledWith(district, PARTY));
  });

  test('it shows suggested addresses', async function(assert) {
    this.set('error', ERRORS.MULTIPLE_LOCATIONS(MULTIPLE_RESULTS).error);
    await render(hbs`{{ballot-form error=error}}`);

    assert.equal(findAll('.ballot-form__suggestion').length, MULTIPLE_RESULTS.length);
  });

  test('it renders an error message', async function(assert) {
    let error = ERRORS.NO_RESULTS().error;
    this.set('error', error);
    await render(hbs`{{ballot-form error=error}}`);

    assert.equal(find('.ballot-form__error').textContent.trim(), error.message);
  });
});
