import DS from 'ember-data';

export default DS.Model.extend({
  district:   DS.attr('string'),
  party:      DS.attr('string'),
  nutshell:   DS.attr('string'),
  candidates: DS.hasMany('candidate')
});
