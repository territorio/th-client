
Th.Application = Em.Application.extend(Th.HasConnection, Th.Alert, {

  ready: function() {
    
    this._startWithConnection();

  },

  _initStore: function() {

    /*
    var adapter = DS.RESTAdapter.create({
      url: Th.Settings.server
    });
    this.store = DS.Store.create({
      revision: 12,
      adapter: adapter
    });
    */

  },

  _fetchContent: function(next) {
    
    var self = this;

    var date = moment().format("YYYYMMDD");
    //var date = '20130205';
    var data = {api: 'true', sideload: 'true', date: date};

    jQuery.ajax({
      url: Th.Settings.server,
      type: 'GET',
      dataType: 'json',
      data: data, 
      contentType: 'application/json; charset=utf-8',
      //cache: false,

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

  _insertViews: function() {
    
    var view = App.LandingScreenView.create({
      container: this.__container__
    });
    view.appendTo('#init-app');

  },

  _startWithConnection: function() {

    this._initStore();

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
