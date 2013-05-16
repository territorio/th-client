function DatePicker() {
}

DatePicker.prototype.show = function(options, cb, fail) {

	if (options.date) {
		options.date = (options.date.getMonth() + 1) + "/" + (options.date.getDate()) + "/" + (options.date.getFullYear()) + "/" + (options.date.getHours()) + "/" + (options.date.getMinutes());
	}

	var defaults = {
		mode : '',
		date : '',
		allowOldDates : true
	};

	for ( var key in defaults) {
		if (typeof options[key] !== "undefined") { defaults[key] = options[key]; }
	}
	this._callback = cb;

  Cordova.exec(cb, fail, 'DatePickerPlugin', defaults.mode, new Array(defaults) );
};

DatePicker.prototype._dateSelected = function(date) {
	var d = new Date(parseFloat(date) * 1000);
	if (this._callback)
	this._callback(d);
};


if(!window.plugins) { 
  window.plugins = {};
}

if (!window.plugins.datePicker) {
	window.plugins.datePicker = new DatePicker();
}
