'use strict';
var Mogger = require('mogger');
var _ = require('lodash');


// all targets
var MainView = require('../main-view');
var Router = require('../router');
var surrogateTargetsSource = {
	'MainView.prototype': MainView.prototype,
	'Router.prototype': Router.prototype
};


var MoggerTracer = function (){};
_.assign(MoggerTracer.prototype, { 
	startTracing: function() {
		// get the tracer
		var tracer = new Mogger.Tracer({
			//-------------------------------------------------------
			// enable / disable
			//-------------------------------------------------------
			enabled: true,

			//-------------------------------------------------------
			// prints a pause when no logs are printed for some time
			//-------------------------------------------------------
			showPause: true,

			//-------------------------------------------------------
			// where is our sources objects?
			// in our surrogateTargetsSource
			//-------------------------------------------------------
			surrogateTargets: surrogateTargetsSource,

			//-------------------------------------------------------
			// default output logger
			//-------------------------------------------------------
			loggerConfig: {
				output: console
			},

			//-------------------------------------------------------
			// global config
			//-------------------------------------------------------
			before: {
				//css: 'color: blue',
				size: 15
			},
			targetConfig: {
				//css: 'color: red',
				size: 45
			},
			showArguments: true,

			//-------------------------------------------------------
			// interceptors
			//-------------------------------------------------------
			interceptors: [
			{
				filterRegex: /^(trigger|get|has|\$|setFilter|_on\w+|render|sync|previous|_routeToRegExp|setElement)/i,
				callback: function(info) {
					return info.method + '("' + info.args[0] + '")';
				}
			},
			{
				filterRegex: /^(on)/i,
				callback: function(info) {
					return '^ ' + info.method + '("' + info.args[0] + '")';
				}
			},
			{
				filterRegex: /^(listenTo)/i,
				callback: function(info) {
					return 'v ' + info.method + '("' + info.args[1] + '")';
				}
			},
			{
				filterRegex: /^(route)/i,
				callback: function(info) {
					return info.method + '("' + info.args[1] + '")';
				}
			},
			{
				filterRegex: /^(set)/i,
				callback: function(info) {
					if(_.isString(info.args[0])){
						return info.method + '("' + info.args[0] + '")';	
					}
					else{
						return info.method;
					}
					
				}
			}
			]
		});

		tracer.traceObj({
			before: {	message: 'MainView', css: 'color: #A42' },
			target: 'MainView.prototype', targetConfig: {	css: 'color: #A42' }
		});

		tracer.traceObj({
			before: {	message: 'Router', css: 'color: #55A' },
			target: 'Router.prototype', targetConfig: {	css: 'color: #55A' }
		});

		//2A2, 075, 249, 
	}
});


module.exports = MoggerTracer;
