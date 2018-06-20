import DS from 'ember-data';

export default DS.Model.extend({
  district:     DS.attr('string'),
  party:        DS.attr('string'),
  nutshell:     DS.attr('string'),
  wnycHeadline: DS.attr('string'),
  wnycLink:     DS.attr('string'),
  ggHeadline:   DS.attr('string'),
  ggLink:       DS.attr('string'),
  clHeadline:   DS.attr('string'),
  clLink:       DS.attr('string'),

  candidates: DS.hasMany('candidate')
});
