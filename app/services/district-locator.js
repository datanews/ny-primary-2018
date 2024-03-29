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
    this.ww.addAll(districts);
  }),

  findDistrict: task(function * (address) {
    let { lat, lng, formattedAddress } = yield this.lookupAddress(address);
    let saResults = this.pinPoint(lat, lng, 'assembly');
    let ssResults = this.pinPoint(lat, lng, 'senate');
    return {
      formattedAddress,
      saDistrict: saResults.district,
      ssDistrict: ssResults.district
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
          reject(ERRORS.NO_RESULTS());
        } else if (status !== 'OK') {
          reject(ERRORS.BAD_STATUS(status))
        } else if (results.length > 1) {
          reject(ERRORS.MULTIPLE_LOCATIONS(results))
        } else if (!inNYC(results[0])) {
          reject(ERRORS.OUT_OF_BOUNDS())
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

  pinPoint(lat, lng, mapType) {
    return this.ww.find({lat, lng}, {layer: mapType}) || {};
  }

});
