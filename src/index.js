import {plugin} from 'postcss';

import transformer from './lib/transformer';
import {hasPromises} from './lib/helpers'

export default plugin('postcss-functions', (opts = {}) => {
	const functions = opts.functions || {};

	const transform = transformer(functions);

	return css => {
		const promises = [];
		css.walk(node => {
			promises.push(transform(node));
		});
		
		if (hasPromises(promises))
			return Promise.all(promises);
	};
});
