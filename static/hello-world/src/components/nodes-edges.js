import Pages from '../data/Pages';

// console.log(pages);
const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export async function pageNodes() {
	const pages = await Pages();
	console.log(pages);
	const pageNodes = pages.map((page) => {
		const obj = {
			id: page.id,
			data: { label: page.title },
			position: position,
		};
		return obj;
	});

	return pageNodes;
}

export async function pageEdges() {
	const pages = await Pages();
	const pageEdges = [];

	for (let i = 0; i < pages.length; i++) {
		for (let j = 0; j < pages[i].children.length; j++) {
			const edge = {
				id: `e${pages[i].id}-${pages[i].children[j]}`,
				source: pages[i].id,
				target: pages[i].children[j],
				type: edgeType,
			};
			pageEdges.push(edge);
		}
	}

	return pageEdges;
}
