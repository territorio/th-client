require('ember-touch');
require('ember-data');
require('th-client-core');
require('th-client-views');


require('app/states/landing');
require('app/states/date');
require('app/states/category');
require('app/states/manager');

require('app/controllers/ui');

require('app/system/initializers');
require('app/system/application');

App = Th.Application.create({});
App.deferReadiness();

require('app/views/landing');
App.advanceReadiness();
