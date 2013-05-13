
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


App.LandingScreenView = Th.LandingScreenView.extend(Th.Context, {

	gestureDelegate: App.landingGestureDelegate,

	isAsideLeftBinding: Em.Binding.oneWay('App.applicationController.isMenuCategory'),
	action: 'closeCategory'

});
