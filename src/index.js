import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

const getPages = async () => {
	const response = await api
		.asUser()
		.requestConfluence(route`/wiki/rest/api/space/BC/content`, {
			headers: {
				Accept: 'application/json',
			},
		});

	const data = await response.json();
	console.log(data.page.results);
	return data.page.results;
	// return response.status;
};

resolver.define('getText', (req) => {
	console.log(req);

	return 'Here is the raw page data of this space:';
});

resolver.define('getPages', (req) => {
	console.log(req);

	// console.log(getPages());
	return getPages();
});

export const handler = resolver.getDefinitions();
