Th.HasConnection = Em.Mixin.create({

	hasConnection: function(next, error){

    if ( App.isNative ) {
      var type = navigator.connection.type;
      if ( (type === Connection.UNKNOWN )
          || (type === Connection.NONE ) ) {
        error();
      } else {
        next();
      }

    } else {
      next();
    }

	}

});
