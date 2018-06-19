const ERRORS = {
  NO_RESULTS: 'NO_RESULTS',
  OUT_OF_BOUNDS: 'OUT_OF_BOUNDS',
  BAD_STATUS: 'BAD_STATUS',
  MULTIPLE_LOCATIONS: 'MULTIPLE_LOCATIONS'
};

const error = (message, type, ops) => ({error: { message, type, ...ops}});

export default {
  [ERRORS.NO_RESULTS]: () => error('Could not find address. Please try another.', ERRORS.NO_RESULTS),
  [ERRORS.OUT_OF_BOUNDS]: () => error('Please enter a New York City address.', ERRORS.OUT_OF_BOUNDS),
  [ERRORS.BAD_STATUS]: status => error(`Could not look up address because ${status}`, ERRORS.BAD_STATUS),
  [ERRORS.MULTIPLE_LOCATIONS](results) {
    return error('Did you mean...', ERRORS.MULTIPLE_LOCATIONS, {
      locations: results.map(({ formatted_address, geometry }) => {
        return {
          address: formatted_address,
          ...geometry.location.toJSON()
        }
      })
    });
  }
}
