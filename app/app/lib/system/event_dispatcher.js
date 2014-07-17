
Ember.EventDispatcher.reopen({
  events: {
    click       : 'click',
    focusout    : 'focusOut',
    keyup       : 'keyUp',
    change      : 'change'
  },
 
  _findNearestEventManager: function() {
    return null;
  }
 
});
