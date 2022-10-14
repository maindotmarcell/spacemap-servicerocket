import React, { useState, useCallback, useEffect, useContext } from 'react';
import ReactFlow, {
	addEdge,
	ConnectionLineType,
	useNodesState,
	useEdgesState,
	Controls,
	MiniMap,
} from 'react-flow-renderer';
import getLayoutedElements from './getLayoutedElements.js';
// import 'reactflow/dist/style.css';
import PageContext from '../PageContext.js';

import { pageNodes, pageEdges } from './nodes-edges.js';

import '../index.css';

const LayoutFlow = () => {
	// setting the nodes and aedges from the fetched data
	const [initialNodes, setInitialNodes] = useState([]);
	const [initialEdges, setInitialEdges] = useState([]);

	const [layoutedNodes, setLayoutedNodes] = useState([]);
	const [layoutedEdges, setLayoutedEdges] = useState([]);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const { pages, refreshPages } = useContext(PageContext);

	useEffect(() => {
		refreshPages();
	},[]);

	useEffect(() => {
		setInitialNodes(pageNodes(pages));
		setInitialEdges(pageEdges(pages));

		console.log(pages);
	}, [pages]);

	useEffect(() => {
		const [layoutNodes, layoutEdges] = getLayoutedElements(
			initialNodes,
			initialEdges
		);
		setLayoutedNodes(layoutNodes);
		setLayoutedEdges(layoutEdges);
		setNodes(layoutNodes);
		setEdges(layoutEdges);
	}, [initialNodes, initialEdges]);


	// console.log('initial: ', initialNodes);
	// console.log('layouted: ', layoutedNodes);
	// console.log(initialEdges);


	console.log(nodes);
	const onConnect = useCallback(
		(params) =>
			setEdges((eds) =>
				addEdge(
					{ ...params, type: ConnectionLineType.SmoothStep, animated: true },
					eds
				)
			),
		[]
	);
	const onLayout = useCallback(
		(direction) => {
			const [layoutNodes, layoutEdges] = getLayoutedElements(
				initialNodes,
				initialEdges,
				direction
			);
			setLayoutedNodes(layoutNodes);
			setLayoutedEdges(layoutEdges);

			console.log(layoutedNodes);
			setNodes([...layoutedNodes]);
			setEdges([...layoutedEdges]);
			// setNodes(layoutNodes);
			// setEdges(layoutEdges);
		},
		[nodes, edges]
	);

	return (
		<div className="layoutflow">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				connectionLineType={ConnectionLineType.SmoothStep}
				fitView
			>
				<Controls />
				<MiniMap />
			</ReactFlow>
			<div className="controls">
				<button onClick={() => onLayout('TB')}>vertical layout</button>
				<button onClick={() => onLayout('LR')}>horizontal layout</button>
			</div>
		</div>
	);
};

export default LayoutFlow;
