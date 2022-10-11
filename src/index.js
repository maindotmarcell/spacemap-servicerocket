import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

const getPages = async () => {
	const response = await api
		.asUser()
		.requestConfluence(
			route`/wiki/rest/api/space/BC/content?type=page&expand=children.page,ancestors,version&limit=100&status=current`,
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

const changeTitle = async (id, title, version) => {
	var bodyData = `{
	"version": {
	  "number": ${version}
	},
	"type": "page",
	"title": "${title}"
	}`;
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

const movePage = async (pageID, targetID) => {
	const response = await api
		.asApp()
		.requestConfluence(
			route`/wiki/rest/api/content/${pageID}/move/append/${targetID}`,
			{
				method: 'PUT',
				headers: {
					Accept: 'application/json',
				},
			}
		);

	const data = await response.json();
	// console.log(data.page.results);
	return data;
	// return response.status;
};

resolver.define('changeTitle', ({ payload }) => {
	return changeTitle(payload.pageID, payload.newTitle, payload.version);
});

resolver.define('getPages', (req) => {
	return getPages();
});

resolver.define('movePage', ({ payload }) => {
	return movePage(payload.pageID, payload.targetID);
});

export const handler = resolver.getDefinitions();
