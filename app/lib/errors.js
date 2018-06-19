const error = (message, ops) => ({error: { message, ...ops}});

export default {
  NO_RESULTS: reject => reject(error('Could not find address. Please try another.')),
  OUT_OF_BOUNDS: reject => reject(error('Please enter a New York City address.')),
  BAD_STATUS: (reject, status) => reject(error(`Could not look up address because ${status}`)),
  MULTIPLE_LOCATIONS(reject, results) {
    reject(error('Did you mean...', {
      locations: results.map(({ formatted_address, geometry }) => {
        return {
          address: formatted_address,
          ...geometry.location.toJSON()
        }
      })
    }));
  }
}
