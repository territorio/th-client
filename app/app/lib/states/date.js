
Th.DateState = Em.State.extend({

	enter: function(sm) {

		this._super();

    if ( App.isNative ) {

      var oldDate = App.applicationController.get('date');

      var options = {
        mode : 'date',
        date : moment(oldDate, Th.Settings.dateFormat).toDate()
      };

      var errorText = "Error: Inténtelo más tarde si el problema continúa.",
          self = this;


      window.plugins.datePicker.show(options, function(result) {

        var nativeDate = App.isAndroid ? result.date : result;

        if (nativeDate) {
          var selectedDate;

          if ( App.isAndroid ) {
            selectedDate = moment(nativeDate, 'YYYY/MM/DD').format(Th.Settings.dateFormat);
          } else {
            selectedDate = moment(nativeDate).format(Th.Settings.dateFormat);
          }

          if ( oldDate !== selectedDate ) {
            self.chooseDate(sm, selectedDate);
          }

          sm.goToState('landing');
          

        } else {
          App.alert(errorText);
          sm.goToState('landing');
        }

      }, function(error) {
          App.alert(errorText);
          sm.goToState('landing');
      });

    }

	},

  // this implementation to be called in "web environment"
  // App.__container__.lookup('manager:application').send('selectDate', '20130202');
  chooseDate: function(sm, date) {

    var controller = App.eventController;
    controller.clear();


    App.applicationController.set('date', date);

    var data = {api: 'true', date: date};

    var url = Th.Settings.server;

    jQuery.ajax({
      url: url,
      type: 'GET',
      data: data, 
      crossDomain: true,
      dataType: 'jsonp',
      contentType: 'application/json; charset=utf-8',

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
