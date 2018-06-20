import DS from 'ember-data';

export default DS.Model.extend({
  race:         DS.belongsTo('race'),
  firstName:    DS.attr('string'),
  surname:      DS.attr('string'),
  incumbent:    DS.attr('string'),
  website:      DS.attr('string'),
  wnycHeadline: DS.attr('string'),
  wnycLink:     DS.attr('string'),
  ggHeadline:   DS.attr('string'),
  ggLink:       DS.attr('string'),
  clHeadline:   DS.attr('string'),
  clLink:       DS.attr('string')
});
