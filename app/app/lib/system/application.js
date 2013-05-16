Th.Application = Em.Application.extend(Th.InitDocumentEvent, Th.HasConnection, Th.Alert, {

  ready: function() {
    
    this._startWithConnection();

  },

  _readSettings: function() {

    var isNative = (window.DeviceInfo && DeviceInfo.uuid !== undefined) || 
        (window.device && device.uuid !== undefined);


    this.isNative = (!!isNative);
		this.isAndroid = navigator.userAgent.match(/Android/i) ? true : false;
  },

  _fetchContent: function(next) {
    
    var self = this;

    var date = moment().format(Th.Settings.dateFormat);
    //var date = '20130215';
    App.applicationController.set('date', date);
    var data = { api: 'true', sideload: 'true', date: date};

    var url = Th.Settings.server;

    jQuery.ajax({
      url: url,
      type: 'GET',
      data: data, 
      crossDomain: true,
      dataType: 'jsonp',
      contentType: 'application/json; charset=utf-8',

      success: function(response) {


        var categories = response.categories;
        var events = response.events;

        App.categoryController.set('content', categories);

        var category = Th.CategoryAllType;
        App.categoryController.set('selected', category);

        App.eventController.set('all', events);
        App.eventController.filterByCategory(category);

        next();
      },

      error: function(response) {

        var text = "Ha habido un problema obteniendo el contenido. Inténtelo más tarde si el problema continúa.";
        self.alert(text, function() {
          self._fetchContent(next);
        });

      }
    
    });

  },

  backbutton: function() {

    var manager = this.__container__.lookup('manager:application');

    var state = manager.get('currentState.name');

    if ( state === 'landing' ) {

        navigator.notification.confirm('¿Desea cerrar la aplicación?', 
                  function(confirm) {
                    if ( confirm === 1 ) { navigator.app.exitApp(); };
                  }, 
                  'Territorio Huelva', 
                  'Si,Cancelar' );

    } else if ( state === 'category' ) {
      manager.send('closeCategory');
    }

  },


  _insertViews: function() {
    
    var view = App.LandingScreenView.create({
      container: this.__container__
    });

    view.one('didInsertElement', function() {

      if ( App.isNative ) { 

        Ember.run.schedule('afterRender', function() {
          navigator.splashscreen.hide(); 
        });
      
      }
    });
    view.appendTo('#init-app');

  },

  _startWithConnection: function() {

    this._readSettings();
    this._initDocumentEvents({backbutton: 'backbutton'});

    this._insertViews();

            

    var self = this;
    this.hasConnection(function() {

      self._fetchContent(function() {
      });

    }, function() {

      var text = "Parece que no hay conexión a internet. Por favor, conéctate para continuar";
      self.alert(text, function() {
        self._startWithConnection();
      });

    });

  }

});
