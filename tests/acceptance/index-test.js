import { module } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import Service from '@ember/service';
import { task } from 'ember-concurrency';
import sinon from 'sinon';

import * as fetch from 'fetch';

let DISTRICT;
const LocatorStub = Service.extend({
  findDistrict: task(function* () {
      yield;
      return {district: DISTRICT};
  })
});

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  hooks.beforeEach(function() {
    sinon.stub(fetch, 'default').resolves({json: () => 'foo'});
  });

  hooks.afterEach(function() {
    fetch.default.restore();
  })

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('looking up an address', async function(assert) {
    DISTRICT = 1;
    this.owner.register('service:district-locator', LocatorStub);
    await visit('/');

    await fillIn('.ballot-form input[type=text]', '123 main street');
    await click('[data-test-selector=dem]');
    await click('.ballot-form__submit');

    assert.equal(currentURL(), `/${DISTRICT}/dem`);
  });

  test('must select a party and input an address before submitting', async function(assert) {
    await visit('/');
    await click('.ballot-form__submit');

    assert.equal(currentURL(), '/');

    await fillIn('.ballot-form input[type=text]', '123 main street');
    await click('.ballot-form__submit');

    assert.equal(currentURL(), '/');

    await fillIn('.ballot-form input[type=text]', '');
    await click('[data-test-selector=dem]');
    await click('.ballot-form__submit');

    assert.equal(currentURL(), '/');
  });
});
