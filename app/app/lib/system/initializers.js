Ember.Application.initializer({

  name: 'applicationStateManager',

  initialize: function(container) {
		var Manager = Th.StateManager.extend({
			enableLogging: true
		});
    container.register('manager:application', Manager);
  }

});

Ember.Application.initializer({

  name: 'createControllers',

  initialize: function(container) {
		App.applicationController = Th.ApplicationController.create();
		App.categoryController = Th.CategoryController.create();
		App.eventController = Th.EventController.create();
  }

});
