import Service from '@ember/service';
import config from '../config/environment';
import ERRORS from '../lib/errors';

import fetch from 'fetch';
import wherewolf from 'wherewolf';
import google from 'google';
import { task } from 'ember-concurrency';

const inNYC = ({address_components}) => address_components
  .filter(a => a.types.includes('administrative_area_level_2'))
  .find(n => n.long_name.match(/(Kings|Queens|New York|Richmond|Bronx) County/));

export default Service.extend({
  init() {
    this._super(...arguments);
    this.loadDistricts.perform();

    let geocoder = new google.maps.Geocoder();
    this.set('geocoder', geocoder);

    let ww = new wherewolf();
    this.set('ww', ww);
  },

  loadDistricts: task(function * () {
    let districts = yield fetch(config.districtSource)
      .then(r => r.json())
      .catch(() => null);

    if (!districts) {
      return;
    }
    this.ww.add('districts', districts);
  }),

  findDistrict: task(function * (address) {
    let { lat, lng, formattedAddress } = yield this.lookupAddress(address);
    let results = this.pinPoint(lat, lng);
    return {
      formattedAddress,
      ...results
    }
  }),

  lookupAddress(address) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({
        address,
        componentRestrictions: {
          administrativeArea: 'NY'
        }
       }, (results, status) => {
        if (results.length === 0) {
          ERRORS.NO_RESULTS(reject);
        } else if (status !== 'OK') {
          ERRORS.BAD_STATUS(reject, status);
        } else if (results.length > 1) {
          ERRORS.MULTIPLE_LOCATIONS(reject, results);
        } else if (!inNYC(results[0])) {
          ERRORS.OUT_OF_BOUNDS(reject);
        } else {
          let [{
            formatted_address: formattedAddress,
            geometry: { location: latlng }
          }] = results;

          resolve({
            formattedAddress,
            ...latlng.toJSON()
          });
        }
      })
    });
  },

  pinPoint(lat, lng) {
    return this.ww.find({lat, lng}, {layer: 'districts'}) || {};
  }

});
