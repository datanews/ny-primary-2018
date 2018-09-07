import Route from "@ember/routing/route";
import { bind } from "@ember/runloop";

export default Route.extend({
  model({ sa_district, ss_district, party }) {
    let races = this.store.peekAll("race").filter(function(race) {
      if (race.get("id") === sa_district) {
        return true;
      }
      if (race.get("id") === ss_district) {
        return true;
      }
      if (race.get("type") === "statewide") {
        return true;
      }
    });
    let allDistrictRaces = this.store
      .peekAll("race")
      .filter(function(r) {
        return /\d/.test(r.get("id"));
      })
      .sort((a, b) =>
        `${a.get("raceTitle")} ${a.get("id")}`.localeCompare(
          `${b.get("raceTitle")} ${b.get("id")}`
        )
      );
    return {
      races,
      allDistrictRaces,
      hasDistrictRaces: allDistrictRaces.mapBy("id").indexOf(sa_district) > -1,
      party,
      selected: sa_district,
      districts: this.store.peekAll("race")
    };
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("update", bind(this, "update"));
  },

  update(type, value) {
    let { district, party } = this.paramsFor(this.routeName);
    if (type === "district") {
      district = value;
    } else if (type === "party") {
      party = value;
    }
    this.transitionTo("ballot", district, party);
  }
});
