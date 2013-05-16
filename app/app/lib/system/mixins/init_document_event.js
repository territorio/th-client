Th.InitDocumentEvent = Em.Mixin.create({

  _initDocumentEvents: function(events) {

    var event;

    for (event in events) {
      if (events.hasOwnProperty(event)) {
        this._setupDocumentHandler(event, events[event]);
      }
    }

  },

  _setupDocumentHandler: function( eventName, eventFn ) {

    var self = this;

    document.addEventListener(eventName, function() {
      var handler = self[eventFn];
      if (Ember.typeOf(handler) === 'function') {
        handler.call(self);
      }
    }, false);

  }

});
