
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
