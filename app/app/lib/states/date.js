
Th.DateState = Em.State.extend({

	enter: function(sm) {

		this._super();

    if ( App.isNative ) {

      var oldDate = App.applicationController.get('date');


      var options = {
        mode : 'date',
        date: oldDate
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

          var formatOldDate = moment(oldDate).format(Th.Settings.dateFormat);
          if ( formatOldDate !== selectedDate ) {
            self.chooseDate(sm, selectedDate);
          }

          sm.goToState('landing');
          

        } else {

          if ( !App.isAndroid ) {
            App.alert(errorText);
          }
          sm.goToState('landing');
        }

      }, function(error) {
          App.alert(errorText);
          sm.goToState('landing');
      });

    }

	},

  // this implementation to be called in "web environment"
  // App.__container__.lookup('manager:application').send('chooseDate', '20130202');
  chooseDate: function(sm, formatDate) {

    var controller = App.eventController;
    controller.clear();

    var date = moment(formatDate, Th.Settings.dateFormat).toDate();

    App.applicationController.set('date', date);

    var data = {api: 'true', date: formatDate};

    $.ajax({
      data: data, 

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
