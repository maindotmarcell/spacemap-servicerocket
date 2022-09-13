import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

const getPages = async () => {
	// console.log('Before');
	const response = await api
		.asUser()
		.requestConfluence(route`/wiki/rest/api/space/BC/content`, {
			headers: {
				Accept: 'application/json',
			},
		});
	// console.log('after: ', response);

	const data = await response.json();
	console.log(data.page.results);
	return data.page.results;
	// return response.status;
};

resolver.define('getText', (req) => {
	// console.log(req);
	let obj = getPages();
	console.log(obj);

	return obj;
});

resolver.define('getPages', (req) => {
	// console.log(req);

	// console.log(getPages());
	return getPages();
});

export const handler = resolver.getDefinitions();
