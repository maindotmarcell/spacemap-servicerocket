import React, { useState, useCallback, useEffect } from 'react';
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

import { pageNodes, pageEdges } from './nodes-edges.js';

import '../index.css';

const LayoutFlow = () => {
	// setting the nodes and aedges from the fetched data
	const [initialNodes, setInitialNodes] = useState([]);
	const [initialEdges, setInitialEdges] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setInitialNodes(await pageNodes());
			setInitialEdges(await pageEdges());
		}

		fetchData();
	}, []);

	useEffect(() => {
		const [layoutNodes, layoutEdges] = getLayoutedElements(
			initialNodes,
			initialEdges
		);
		setLayoutedNodes(layoutNodes);
		setLayoutedEdges(layoutEdges);
		setNodes(layoutedNodes);
		setEdges(layoutEdges);
	}, [initialNodes, initialEdges]);

	const [layoutedNodes, setLayoutedNodes] = useState([]);
	const [layoutedEdges, setLayoutedEdges] = useState([]);

	// console.log('initial: ', initialNodes);
	// console.log('layouted: ', layoutedNodes);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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

