
Th.CategoryState = Em.State.extend({

	enter: function(sm) {

		this._super();

    this._transition();
		App.applicationController.set('isMenuCategory', true);
	},

	exit: function(sm) {

    var ac = App.applicationController;
    this._transition();

    ac.set('selectingComingEvents', false);
		ac.set('isMenuCategory', false);
		this._super();

	},

  _transition: function() {

    // It can be done at the view, but i do not like there
    var ac = App.applicationController;
    var eventName = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
    var $landing = Em.View.views['landing-aside-front'].$();

    $landing.bind(eventName, function(){ 
      ac.set('isMenuCategoryEnded', ac.get('isMenuCategory'));
      $landing.unbind(eventName);
    });

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
