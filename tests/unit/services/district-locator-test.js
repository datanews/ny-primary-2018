import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { run } from '@ember/runloop';

import * as fetch from 'fetch';
import * as wherewolf from 'wherewolf';
import * as google from 'google';

function sinonSetup() {
  this.wolfAPI = {add() {}, find() {}};
  this.stub(wherewolf, 'default').returns(this.wolfAPI);
  this.stub(fetch, 'default').resolves({json: () => 'foo'});
}

const GOOD_RESULTS = [{
  formatted_address: '123 main street',
  geometry: {
    location: {
      toJSON: () => ({lat: 123, lng: 456})
    }
  },
  address_components: [{types: ['administrative_area_level_2'], long_name: 'New York County'}]
}];
const EMPTY_RESULT = [];
const MULTIPLE_RESULTS = GOOD_RESULTS.concat(GOOD_RESULTS);
const NOT_NYC = [{
  formatted_address: '123 main street',
  geometry: {
    location: {
      toJSON: () => ({lat: 123, lng: 456})
    }
  },
  address_components: [{types: ['administrative_area_level_2'], long_name: ''}]
}];

module('Unit | Service | district-locator', function(hooks) {
  setupTest(hooks);

  test('loads districts on init', function() {
    sinonSetup.call(this);
    this.stub(google.default.maps, 'Geocoder')
    this.mock(this.wolfAPI).expects('add').withArgs('districts', 'foo');

    run(() => this.owner.lookup('service:district-locator'));
  });

  test('it calls find on wherewolf with the expected lat lng', async function() {
    sinonSetup.call(this);

    let service;

    let geocoder = {geocode() {}};
    this.mock(geocoder).expects('geocode')
      .callsArgWith(1, GOOD_RESULTS, 'OK')
      .calledWith({address: '123 main street'});
    this.stub(google.default.maps, 'Geocoder').returns(geocoder)

    run(() => service = this.owner.lookup('service:district-locator'));

    await service.findDistrict.perform('123 main street');
  });

});

module('Unit | Service | district-locator errors', function(hooks) {
  setupTest(hooks);

  test('empty results', async function(assert) {
    sinonSetup.call(this);

    let service;
    const geocoder = {geocode() {}};

    this.stub(google.default.maps, 'Geocoder').returns(geocoder)
    this.stub(geocoder, 'geocode')
      .callsArgWith(1, EMPTY_RESULT, 'OK');

    run(() => service = this.owner.lookup('service:district-locator'));

    try {
      await service.findDistrict.perform('123 main street');
    } catch(e) {
      assert.equal(e.error.message, 'Could not find address. Please try another.');
    }
  });

  test('bad response', async function(assert) {
    sinonSetup.call(this);

    let service;
    const geocoder = {geocode() {}};

    this.stub(google.default.maps, 'Geocoder').returns(geocoder)
    this.stub(geocoder, 'geocode')
      .callsArgWith(1, ['foo'], 'BAD');

    run(() => service = this.owner.lookup('service:district-locator'));

    try {
      await service.findDistrict.perform('123 main street');
    } catch(e) {
      assert.equal(e.error.message, 'Could not look up address because BAD');
    }
  });

  test('multiple location', async function(assert) {
    sinonSetup.call(this);

    let service;
    const geocoder = {geocode() {}};

    this.stub(google.default.maps, 'Geocoder').returns(geocoder)
    this.stub(geocoder, 'geocode')
      .callsArgWith(1, MULTIPLE_RESULTS, 'OK');

    run(() => service = this.owner.lookup('service:district-locator'));
    try {
      await service.findDistrict.perform('123 main street');
    } catch(e) {
      assert.equal(e.error.message, 'Did you mean...');
    }
  });

  test('out of bounds', async function(assert) {
    sinonSetup.call(this);

    let service;
    const geocoder = {geocode() {}};

    this.stub(google.default.maps, 'Geocoder').returns(geocoder)
    this.stub(geocoder, 'geocode')
      .callsArgWith(1, NOT_NYC, 'OK');

    run(() => service = this.owner.lookup('service:district-locator'));
    try {
      await service.findDistrict.perform('123 main street');
    } catch(e) {
      assert.equal(e.error.message, 'Please enter a New York City address.');
    }
  });

});
