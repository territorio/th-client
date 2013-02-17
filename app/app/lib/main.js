require('ember-touch');
require('ember-data');
require('th-client-core');
require('th-client-views');

Th.Application = Em.Application.extend({

  ready: function() {

    console.log('app is ready');
    var view = Th.LandingScreenView.create();
    view.appendTo('#init-app');

  }

});

App = Th.Application.create({});
