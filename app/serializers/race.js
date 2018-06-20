import DS from 'ember-data';

const makeRace = race => ({
  type: 'race',
  id: race.race,
  attributes: {
    district: race.race,
    party: race.party,
    nutshell: race.nutshell
  },
  relationships: {
    candidates: {data: []}
  }
});

const makeCandidate = race => ({
  type: 'candidate',
  id: `${race.firstName.toLowerCase()}-${race.surname.toLowerCase()}`.replace(/\s/g, '-'),
  attributes: {
    ...race
  },
  relationships: {
    race: {data: {id: race.race, type: 'race'}}
  }
});

export default DS.JSONAPISerializer.extend({
  normalizeFindAllResponse(store, klass, payload/*, id, requestType*/) {
    // pull out races
    let races = payload.reduce((races, race) => {
      if (races.find(r => r.id === race.race)) {
        return races;
      } else {
        races.push(makeRace(race));
        return races;
      }
    }, []);

    // pull out candidates
    let candidates = payload.reduce((candidates, race) => {
      let id = `${race.firstName.toLowerCase()}-${race.surname.toLowerCase()}`.replace(/\s/g, '-');
      if (candidates.find(c => c.id === id)) {
        return candidates;
      } else {
        candidates.push(makeCandidate(race));
        return candidates;
      }
    }, []);

    // add candidates as relationships to their respective races
    candidates.forEach(candidate => {
      let { race:raceId } = candidate.attributes;
      let race = races.find(r => r.id === raceId)
      race.relationships.candidates.data.push({id: candidate.id, type: 'candidate'})
    });

    return {
      data: races,
      included: candidates
    };
  }
});
