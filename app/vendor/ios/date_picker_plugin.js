function DatePicker() {
}

/**
 * show - true to show the ad, false to hide the ad
 */
DatePicker.prototype.show = function(options, cb, fail) {
		var padDate = function(date) {
			if (date.length == 1) {
				return ("0" + date);
			}
			return date;
		};

		if (options.date) {
				options.date = options.date.getFullYear() + "-" +
											 padDate(options.date.getMonth()+1) + "-" +
											 padDate(options.date.getDate()) +
											 "T" + padDate(options.date.getHours()) + ":" +
											 padDate(options.date.getMinutes()) + ":00Z";
		}
		var defaults = {
				mode : 'datetime',
				date : '',
				allowOldDates : true,
				allowFutureDates : true
		};

		for (var key in defaults) {
				if (typeof options[key] !== "undefined")
						defaults[key] = options[key];
		}
		this._callback = cb;


		Cordova.exec(cb, fail, 'DatePickerPlugin', 'show', [defaults] );
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
