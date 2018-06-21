import DS from 'ember-data';

const makeRace = (district = {}) => ({
  type: 'race',
  id: district.race,
  attributes: {
    district: district.race,
    ...district,
  },
  relationships: {
    candidates: {data: []}
  }
});

const makeCandidate = race => ({
  type: 'candidate',
  id: `${race.firstName.toLowerCase()}-${race.surname.toLowerCase()}`.replace(/\s/g, '-'),
  attributes: {
    firstName: race.firstName,
    surname: race.surname,
    incumbent: race.incumbent,
    website: race.website,
    party: race.party
  },
  relationships: {
    race: {data: {id: race.race, type: 'race'}}
  }
});

export default DS.JSONAPISerializer.extend({
  normalizeFindAllResponse(store, klass, payload/*, id, requestType*/) {
    // first group races by district
    let districts = payload.reduce((races, race) => {
      if (!races[race.race]) {
        races[race.race] = [];
      }
      races[race.race].push(race);
      return races;
    }, {});
    // merge
    let races = Object.keys(districts).map(id => {
      let dem = districts[id].find(d => d.party === 'Democrat');
      let rep = districts[id].find(d => d.party === 'Republican');
      let race =  makeRace(dem);
      race.attributes.nutshell = {
        democrat: dem ? dem.nutshell : '',
        republican: rep ? rep.nutshell : ''
      };
      return race;
    })

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
      let raceId = candidate.relationships.race.data.id;
      let race = races.find(r => r.id === raceId)
      race.relationships.candidates.data.push({id: candidate.id, type: 'candidate'})
    });

    return {
      data: races,
      included: candidates
    };
  }
});
