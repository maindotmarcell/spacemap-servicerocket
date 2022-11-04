import rawData from './Data';

export default async function Pages(space) {
	const pageObjectArr = await rawData(space);
	// console.log(pageObjectArr);
	const pageArr = pageObjectArr.map((page) => {
		const obj = {};
		obj['id'] = page.id;
		obj['title'] = page.title;
		obj['children'] = page.children.page.results.map((child) => {
			return child.id;
		});
		obj['version'] = page.version.number;
		if (page.ancestors.length > 0)
			obj['parent'] = page.ancestors[page.ancestors.length - 1].id;
		return obj;
	});
  console.log(pageArr);
	return pageArr;
}
