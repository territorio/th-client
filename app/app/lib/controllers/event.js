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
