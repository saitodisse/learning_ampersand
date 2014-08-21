'use strict';
var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');

module.exports = FormView.extend({
	fields: function() {
		return [
			new InputView({
				name: 'givenName',
				label: 'Given Name',
				placeholder: 'Mario',
				parent: this,
				require: true,
				tests: [
					function(val) {
						if (val.length < 3) {
							return 'Given Name must have at least 3 characters';
						} 
					}
				]
			}),
			new InputView({
				name: 'familyName',
				label: 'Family Name',
				placeholder: 'Bros',
				parent: this,
				require: true,
				tests: [
					function(val) {
						if (val.length < 3) {
							return 'Family Name must have at least 3 characters';
						} 
					}
				]
			}),
		];
	}
});