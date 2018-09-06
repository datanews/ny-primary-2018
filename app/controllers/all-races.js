import Controller from "@ember/controller";
import { sort } from "@ember/object/computed";

export default Controller.extend({
  sortedRaces: sort("model", function(a, b) {
    let weights = {
      gov: 1,
      ltgov: 2,
      ag: 3
    };
    let aWeight = weights[a.get("id")] || 4;
    let bWeight = weights[b.get("id")] || 4;
    return aWeight - bWeight;
  })
});
