import Route from "@ember/routing/route";
import { bind } from "@ember/runloop";

export default Route.extend({
  model({ district, party }) {
    let races = this.store.peekAll("race").filter(function(race) {
      if (race.get("id") === district) {
        return true;
      }
      if (race.get("type") === "statewide") {
        return true;
      }
    });
    return {
      races,
      party,
      selected: races,
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
