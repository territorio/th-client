
var get = Em.get, fmt = Ember.String.fmt;

Th.StateManager = Em.StateManager.extend({

	logName: '',

  send: function(event, context) {

    var eventName = fmt("%@.%@", [get(this, 'currentState.name'), event]),
				slug,
        value;

    if ( context && context instanceof DS.Model ) {
      var id = context.get('id');
      if ( !!id ) {
        value = id;
      }

      slug = context.get('slug');
    }

		if ( context && !slug && context.hasOwnProperty('slug') ) {
			slug = context.slug;
		}



		if ( App.analytics ) {
			//App.analytics('send', 'event', get(this, 'currentState.name'), event); 
			var page = '/' +get(this, 'currentState.name')+'/' + event; 
			if ( slug ) {
				page += '/'+slug;
			}

      App.analytics('send', 'pageview', {'page': page}); 
		}

		//console.log(eventName,value);
    this._super(event, context);

  },

  initialState: 'landing',

  landing: Th.LandingState.extend(),
  category: Th.CategoryState.extend(),
  date: Th.DateState.extend()

});
