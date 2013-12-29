
Th.CategoryState = Em.State.extend({

	enter: function(sm) {

		this._super();
		App.applicationController.set('isMenuCategory', true);
	},

	exit: function(sm) {

    App.applicationController.set('selectingComingEvents', false);
		App.applicationController.set('isMenuCategory', false);
		this._super();

	},

	selectCategory: function(sm, category) {
    App.categoryController.set('selected', category);
    App.placeController.set('selected', null);

    if ( App.applicationController.get('selectingComingEvents') || 
         !App.applicationController.get('date') ) {
      App.applicationController.set('date', undefined);
      App.applicationController.set('isSearch', false);
      App.eventController.filterComingByCategory(category);
    } else {
      App.eventController.filterByCategory(category);
    }
		sm.goToState('landing');
	},

	selectPlace: function(sm, place) {
    App.categoryController.set('selected', null);
    App.placeController.set('selected', place);

    if ( App.applicationController.get('selectingComingEvents') || 
         !App.applicationController.get('date') ) {
      App.applicationController.set('date', undefined);
      App.applicationController.set('isSearch', false);
      App.eventController.filterComingByPlace(place);
    } else {
      App.eventController.filterByPlace(place);
    }
		sm.goToState('landing');
	},

	closeCategory: function(sm) {
		sm.goToState('landing');
	}

});
