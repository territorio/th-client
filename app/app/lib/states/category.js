
Th.CategoryState = Em.State.extend({

	enter: function(sm) {

		this._super();
		App.applicationController.set('isMenuCategory', true);
	},

	exit: function(sm) {

		App.applicationController.set('isMenuCategory', false);
		this._super();

	},

	selectCategory: function(sm) {
		sm.goToState('landing');

	},

	closeCategory: function(sm) {
		sm.goToState('landing');
	}

});
