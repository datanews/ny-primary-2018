import { module } from 'qunit';
import {
  visit,
  currentURL,
  fillIn,
  click,
  findAll,
  find
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import Service from '@ember/service';
import { task } from 'ember-concurrency';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

import ERRORS from 'ny-primary-2018/lib/errors';
import { MULTIPLE_RESULTS } from '../../mirage/fixtures/geocoder';

module('Acceptance | index', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });

  test('looking up an address', async function(assert) {
    const DISTRICT = 1;
    const LocatorStub = Service.extend({
      loadDistricts: {perform() {}}, // eslint-disable-line
      findDistrict: task(function* () {
          yield;
          return {district: DISTRICT};
      })
    });

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

  test('it show suggested addresses', async function(assert) {
    let service = this.owner.lookup('service:district-locator');
    service.init = () => {};
    service.lookupAddress = function() {
      return Promise.reject(ERRORS.MULTIPLE_LOCATIONS(MULTIPLE_RESULTS));
    };

    await visit('/');
    await fillIn('.ballot-form input[type=text]', '123 main street');
    await click('[data-test-selector=dem]');
    await click('.ballot-form__submit');

    assert.equal(findAll('.ballot-form__suggestion').length, MULTIPLE_RESULTS.length);
  });

  test('it shows other error messages', async function(assert) {
    let service = this.owner.lookup('service:district-locator');
    let error = ERRORS.NO_RESULTS();
    service.init = () => {};
    service.lookupAddress = function() {
      return Promise.reject(error);
    };

    await visit('/');
    await fillIn('.ballot-form input[type=text]', '123 main street');
    await click('[data-test-selector=dem]');
    await click('.ballot-form__submit');

    assert.equal(find('.ballot-form__error').textContent.trim(), error.error.message);
  });
});
