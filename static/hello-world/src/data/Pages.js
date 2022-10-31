import rawData from './Data';

export default async function Pages(space) {
	const pageObjectArr = await rawData(space);
	// console.log(pageObjectArr);
	const pageArr = pageObjectArr.map((page) => {
		const obj = {};
		obj['id'] = page.id;
		obj['title'] = page.title;
		obj['depth'] = page.ancestors.length;
		obj['children'] = page.children.page.results.map((child) => {
			return child.id;
		});
		obj['version'] = page.version.number;
		return obj;
	});
	return pageArr;
}
