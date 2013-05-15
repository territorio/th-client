Th.Application = Em.Application.extend(Th.HasConnection, Th.Alert, {

  ready: function() {
    
    this._startWithConnection();

  },

  _readSettings: function() {

    var isNative = (window.DeviceInfo && DeviceInfo.uuid !== undefined) || 
        (window.device && device.uuid !== undefined);


    this.isNative = (!!isNative);
  },

  _fetchContent: function(next) {
    
    var self = this;

    var date = moment().format("YYYYMMDD");
    //var date = '20130215';
    var data = { api: 'true', sideload: 'true', date: date};

    var url = Th.Settings.server;

    jQuery.ajax({
      url: url,
      type: 'GET',
      data: data, 
      crossDomain: true,
      dataType: 'jsonp',
      contentType: 'application/json; charset=utf-8',
      //dataType: 'html',
      //contentType: 'text/html; charset=utf-8',
      //cache: false,
      

      success: function(response) {

        console.log('response---->....');
        console.log(response);

        var categories = response.categories;
        var events = response.events;
        //console.log(events);

        App.categoryController.set('content', categories);

        var category = Th.CategoryAllType;
        App.categoryController.set('selected', category);

        App.eventController.set('all', events);
        App.eventController.filterByCategory(category);

        next();
      },

      error: function(response) {
        console.log('error ...');
        /*
        var text = "Ha habido un problema obteniendo el contenido. Inténtelo más tarde si el problema continúa.";
        self.alert(text, function() {
          self._fetchContent(next);
        });
        */

      }
    
    });

  },

  _insertViews: function() {
    
    var view = App.LandingScreenView.create({
      container: this.__container__
    });
    view.appendTo('#init-app');

  },

  _startWithConnection: function() {

    this._readSettings();

    var self = this;
    this.hasConnection(function() {

      self._fetchContent(function() {
        self._insertViews();
      });

    }, function() {

      var text = "Parece que no hay conexión a internet. Por favor, conéctate para continuar";
      self.alert(text, function() {
        self._startWithConnection();
      });

    });

  }

});
