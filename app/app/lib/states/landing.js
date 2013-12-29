
Th.LandingState = Em.State.extend({

	goToCategory: function(sm) {

		sm.goToState('category');

	},

  goToDate: function(sm) {

		sm.goToState('date');

  },

  search: function(sm, search) {
    
    App.applicationController.set('date', null);
    App.eventController.filterBySearch(search);

  },
  selectCalendar: function(sm) {

    App.applicationController.set('isSearch', false);

  },

  selectSearch: function(sm) {

    App.applicationController.set('isSearch', true);

  },

  selectComingEvents: function(sm) {

    App.applicationController.set('selectingComingEvents', true);
		sm.goToState('category');

  },

	toggleEvent: function(sm) {

	}

});
