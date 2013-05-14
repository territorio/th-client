
Th.Alert = Em.Mixin.create({

	alert: function(text, next){

    if ( App.isNative ) {
      navigator.notification.alert( text, function(){
        if ( next ) { next(); }
      }, '');
    } else {
      console.log(text);
      if ( next ) { next(); }
    }

	}

});
