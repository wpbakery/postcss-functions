'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _postcss = require('postcss');

var _transformer = require('./lib/transformer');

var _transformer2 = _interopRequireDefault(_transformer);

var _helpers = require('./lib/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _postcss.plugin)('postcss-functions', function () {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var functions = opts.functions || {};

	var transform = (0, _transformer2.default)(functions);

	return function (css) {
		var promises = [];
		css.walk(function (node) {
			promises.push(transform(node));
		});

		if ((0, _helpers.hasPromises)(promises)) return Promise.all(promises);
	};
});
module.exports = exports['default'];