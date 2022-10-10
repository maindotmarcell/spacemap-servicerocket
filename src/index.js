import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

const getPages = async () => {
	const response = await api
		.asUser()
		.requestConfluence(
			route`/wiki/rest/api/space/BC/content?type=page&expand=children.page,ancestors&limit=100&status=current`,
			{
				headers: {
					Accept: 'application/json',
				},
			}
		);

	const data = await response.json();
	// console.log(data.page.results);
	return data.page.results;
	// return response.status;
};
var bodyData = `{
	"version": {
	  "number": 2
	},
	"type": "page",
	"title": "bro"
	}`;

const changeTitle = async (id, title) => {
	const response = await api
		.asApp()
		.requestConfluence(route`/wiki/rest/api/content/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: bodyData,
		});

	const data = await response.json();
	// console.log(data.page.results);
	return data;
	// return response.status;
};

resolver.define('changeTitle', ({ payload }) => {
	// console.log(req);

	// return `${payload.pageID} ${payload.newTitle}`;
	return changeTitle(payload.pageID, payload.newTitle);
});

resolver.define('getPages', (req) => {
	// console.log(req);

	// console.log(getPages());
	return getPages();
});

// resolver.define('changeTitle', (req) => {
// 	// console.log(pageID, newTitle);
// 	return 'You got it';
// });

export const handler = resolver.getDefinitions();
