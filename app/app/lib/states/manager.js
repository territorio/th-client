
var get = Em.get, fmt = Ember.String.fmt;

Th.StateManager = Em.StateManager.extend({

	logName: '',

  send: function(event, context) {

    var eventName = fmt("%@.%@", [get(this, 'currentState.name'), event]),
        value;

    if ( context && context instanceof DS.Model ) {
      var id = context.get('id');
      if ( !!id ) {
        value = id;
      }
    }

		console.log(eventName,value);
    this._super(event, context);

  },

  initialState: 'landing',

  landing: Th.LandingState.extend(),
  date: Th.DateState.extend(),
  category: Th.CategoryState.extend()

});
