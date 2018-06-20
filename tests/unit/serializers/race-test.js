import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import RACE_FIXUTRE from '../../fixtures/races';

module('Unit | Serializer | race', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('race');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = run(() => store.createRecord('race', {}));

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

  test('it normalizes a findAll request as expected', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('race');

    let serialized = serializer.normalizeFindAllResponse(store, null /* model class */, RACE_FIXUTRE);

    assert.equal(serialized.data.length, 2, 'two races');
    assert.equal(serialized.included.mapBy('type', 'candidate').length, 6, 'six candidates');

    assert.equal(serialized.data[0].attributes.nutshell, RACE_FIXUTRE[0].nutshell, 'nutshell is pulled out into the race metadata');
  })
});
