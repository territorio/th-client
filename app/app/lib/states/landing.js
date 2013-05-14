
Th.LandingState = Em.State.extend({

	goToCategory: function(sm) {

		sm.goToState('category');

	},

  // App.__container__.lookup('manager:application').send('selectDate', '20130202');
  selectDate: function(sm, day) {

    var controller = App.eventController;
    controller.clear();

    var data = {api: 'true', date: day};

    jQuery.ajax({
      url: Th.Settings.server,
      type: 'GET',
      dataType: 'json',
      data: data, 
      contentType: 'application/json; charset=utf-8',
      //cache: false,

      success: function(response) {

        var events = response.events;
        var category = App.categoryController.get('selected');
        controller.set('all', events);
        controller.filterByCategory(category);

      },

      error: function(response) {

        var text = "Ha habido un problema obteniendo el contenido. Inténtelo más tarde si el problema continúa.";
        App.alert(text);

      }

    });


  }


});
