Th.EventController = Em.ArrayController.extend({

  all: null,
  content: null,

  init: function() {
    this._super();
    this.clear();

  },

  clear: function() {
    this.set('all', null);
    this.set('content', null);
  },

  filterBySearch: function(searchString) {

    this.clear();

    var self = this,
        data = {api: 'true', search: searchString };


    $.ajax({
      data: data, 

      success: function(response) {

        var events = response.events;
        self.set('all', response.events);
        self.set('content', response.events);

      },

      error: function(response) {

        var text = "Ha habido un problema obteniendo el contenido. Inténtelo más tarde si el problema continúa.";
        App.alert(text);

      }

    });

  },

  filterComingByCategory: function(category) {
    this.clear();

    var self = this,
        data = {api: 'true', category: category.slug };

    $.ajax({
      data: data, 

      success: function(response) {

        var events = response.events;
        self.set('all', response.events);
        self.set('content', response.events);

      },

      error: function(response) {

        var text = "Ha habido un problema obteniendo el contenido. Inténtelo más tarde si el problema continúa.";
        App.alert(text);

      }

    });
  },

  filterComingByPlace: function(place) {
    this.clear();

    var self = this,
        data = {api: 'true', place: place.slug };

    $.ajax({
      data: data, 

      success: function(response) {

        var events = response.events;
        self.set('all', response.events);
        self.set('content', response.events);

      },

      error: function(response) {

        var text = "Ha habido un problema obteniendo el contenido. Inténtelo más tarde si el problema continúa.";
        App.alert(text);

      }

    });
  },

  filterByCategory: function(category) {
    
    var all = this.get('all'),
        content;

    if ( !!all ) {

      if ( category === Th.SelectionAllType ) {
       content = all;
      } else {

        content = all.filter(function(event) {
          
          return event.categories.some(function(id) {
            return id === category.id;
          });

        });

      }

      this.set('content', content);

    }

  },

  filterByPlace: function(place) {
    
    var all = this.get('all'),
        content;

    if ( !!all ) {

      content = all.filter(function(event) {
        
        return event.places.some(function(id) {
          return id === place.id;
        });

      });

      this.set('content', content);

    }

  }

});
