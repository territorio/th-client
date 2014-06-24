/*
App.landingGestureDelegate = Em.GestureDelegate.create({
  name: 'landing_gesture_delegate',

  shouldReceiveTouch: function(gesture, view, event) {

    var result = true;

		if ( view instanceof Th.LandingAsideFrontView ) {
      result = App.applicationController.get('isMenuCategory');
		} else if ( view instanceof Th.CategoryView ) {
			return true;
    } else if ( App.applicationController.get('isMenuCategory') ) {
      result = false;
    }

    return result; 
  }

});
*/


App.LandingScreenView = Th.LandingScreenView.extend(Th.Context, {


	isAsideLeftBinding: Em.Binding.oneWay('App.applicationController.isMenuCategory'),
	isSearchBinding: Em.Binding.oneWay('App.applicationController.isSearch'),

	selectingComingEventsBinding: Em.Binding.oneWay('App.applicationController.selectingComingEvents'),

	categoriesBinding: Em.Binding.oneWay('App.categoryController.content'),
  selectedCategoryBinding: Em.Binding.oneWay('App.categoryController.selected'),

	placesBinding: Em.Binding.oneWay('App.placeController.content'),
  selectedPlaceBinding: Em.Binding.oneWay('App.placeController.selected'),

	eventsBinding: Em.Binding.oneWay('App.eventController.content'),
	selectedDateBinding: Em.Binding.oneWay('App.applicationController.date'),

	action: 'closeCategory'

});
