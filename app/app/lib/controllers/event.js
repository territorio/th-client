Th.EventController = Em.ArrayController.extend({

  all: null,
  content: null,

  clear: function() {
    this.set('all', null);
    this.set('content', null);
  },

  filterByCategory: function(category) {
    
    var all = this.get('all'),
        content;

    if ( !!all ) {

      if ( category === Th.CategoryAllType ) {
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

  }

});
