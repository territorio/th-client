
Th.Application = Em.Application.extend({

  ready: function() {

    console.log('app is ready');
    var view = App.LandingScreenView.create({
			// because ember-touch
      container: this.__container__

		});
    view.appendTo('#init-app');

  }

});
