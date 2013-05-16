
Th.LandingState = Em.State.extend({

	goToCategory: function(sm) {

		sm.goToState('category');

	},

  goToDate: function(sm) {

		sm.goToState('date');

  }



});
