Th.Application = Em.Application.extend(Th.InitDocumentEvent, Th.HasConnection, Th.Alert, {

  ready: function() {
    
    this._startWithConnection();

  },
  _initSettings: function() {
    moment.lang('es', Th.MomentLangs.es);
    moment.lang( 'es' );
    $.ajaxSetup({
      url: Th.Settings.server,
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      contentType: 'application/json; charset=utf-8'
    });
  },

  _readSettings: function() {

    var isNative = (window.DeviceInfo && DeviceInfo.uuid !== undefined) || 
        (window.device && device.uuid !== undefined);


    this.isNative = (!!isNative);
		this.isAndroid = navigator.userAgent.match(/Android/i) ? true : false;
  },

  _fetchContent: function(next) {
    
    var self = this;

    //var date = moment('20130215', 'YYYYMMDD' ).toDate();
    var date = new Date(); 
    App.applicationController.set('date', date);

    var formatDate = moment(date).format(Th.Settings.dateFormat);
    var data = { api: 'true', sideload: 'true', date: formatDate};

    $.ajax({
      data: data, 

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

    console.log('back button');

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
    } else if ( state === 'date' ) {
      manager.send('goToLanding');
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

    this._manageEventListeners();
    this._readSettings();
    this._initSettings();
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

  },

  _manageEventListeners: function() {

    var bodyElement = document.body;

/*
window.addEventListener("touchmove", function(event) {
  if (!event.target.classList.contains('scroller') ) {
    // no more scrolling
    event.preventDefault();
  }
}, false);

  Miss a drag as we are waiting for WebCore's response
    bodyElement.addEventListener('touchstart', function(event) {
      //if ( $(event.target).hasClass('is-tap') ) {
        event.preventDefault();
      //}
		}, false);	

    bodyElement.addEventListener('drag', function(event) {
        event.preventDefault();
		}, false);	
    bodyElement.addEventListener('touchmove', function(event) {
      if ( $(event.target).hasClass('is-tap') ) {
        event.preventDefault();
      }
		}, false);	

    bodyElement.addEventListener('touchend', function(event) {
      if ( $(event.target).hasClass('is-tap') ) {
        event.preventDefault();
      }
		}, false);	
    */


  }



});
