
Ember.EventDispatcher.reopen({
  events: {
    focusout    : 'focusOut',
    keyup       : 'keyUp',
    change      : 'change'
  },
 
  _findNearestEventManager: function() {
    return null;
  }
 
});
