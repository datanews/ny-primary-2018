export const GOOD_RESULTS = [{
  formatted_address: '123 main street',
  geometry: {
    location: {
      toJSON: () => ({lat: 123, lng: 456})
    }
  },
  address_components: [{types: ['administrative_area_level_2'], long_name: 'New York County'}]
}];

export const EMPTY_RESULT = [];

export const MULTIPLE_RESULTS = GOOD_RESULTS.concat(GOOD_RESULTS);

export const NOT_NYC = [{
  formatted_address: '123 main street',
  geometry: {
    location: {
      toJSON: () => ({lat: 123, lng: 456})
    }
  },
  address_components: [{types: ['administrative_area_level_2'], long_name: ''}]
}];
