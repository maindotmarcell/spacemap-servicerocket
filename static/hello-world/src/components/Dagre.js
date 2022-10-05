import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
	addEdge,
	ConnectionLineType,
	useNodesState,
	useEdgesState,
	Controls,
	MiniMap,
} from 'react-flow-renderer';
import dagre from 'dagre';
// import 'reactflow/dist/style.css';

import { pageNodes, pageEdges } from './nodes-edges.js';

import '../index.css';

console.log('hi');
// const getNodes =  async () => await pageNodes();
// const getEdges =  async () => await pageEdges();

const LayoutFlow = () => {
	const [initialNodes, setInitialNodes] = useState([]);
	const [initialEdges, setInitialEdges] = useState([]);
	useEffect(() => {
		async function fetchData() {
			setInitialNodes(await pageNodes());
			setInitialEdges(await pageEdges());
		}

		fetchData();
	}, []);

	const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel(() => ({}));

	const nodeWidth = 172;
	const nodeHeight = 36;

	function getLayoutedElements(nodes, edges, direction = 'TB') {
		const isHorizontal = direction === 'LR';
		dagreGraph.setGraph({ rankdir: direction });

		nodes.forEach((node) => {
			dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
		});

		edges.forEach((edge) => {
			dagreGraph.setEdge(edge.source, edge.target);
		});

		dagre.layout(dagreGraph);

		nodes.forEach((node) => {
			const nodeWithPosition = dagreGraph.node(node.id);
			node.targetPosition = isHorizontal ? 'left' : 'top';
			node.sourcePosition = isHorizontal ? 'right' : 'bottom';

			// We are shifting the dagre node position (anchor=center center) to the top left
			// so it matches the React Flow node anchor point (top left).
			node.position = {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			};

			return node;
		});

		return { nodes, edges };
	}

	const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
		initialNodes,
		initialEdges
	);
	console.log('initial: ', initialNodes);
	console.log('layouted: ', layoutedNodes);

	const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

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
			
			const { nodes: layoutedNodes, edges: layoutedEdges } =
				getLayoutedElements(initialNodes, initialEdges, direction);

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
