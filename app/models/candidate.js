import DS from 'ember-data';

export default DS.Model.extend({
  firstName:    DS.attr('string'),
  surname:      DS.attr('string'),
  incumbent:    DS.attr('string'),
  website:      DS.attr('string'),
  party:        DS.attr('string'),

  race:         DS.belongsTo('race'),
});
