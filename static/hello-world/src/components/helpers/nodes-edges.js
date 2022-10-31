import React from 'react';
import Label from '../Label';

// console.log(pages);
const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export function pageNodes(pages, space) {
	const pageNodes = pages.map((page) => {
		const obj = {
			id: page.id,
			data: {
				label: (
					<Label
						title={page.title}
						id={page.id}
						version={page.version}
						space={space}
					></Label>
				),
			},
			position: position,
			connectable: false,
			height: 36,
			width: 172,
		};
		return obj;
	});

	return pageNodes;
}

export function pageEdges(pages) {
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
