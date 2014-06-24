require('ember-data');
require('th-client-core');
require('th-client-views');

require('app/config');


require('app/states');
require('app/controllers');

require('app/system');

App = Th.Application.create({});
App.deferReadiness();

require('app/views/landing');
App.advanceReadiness();
