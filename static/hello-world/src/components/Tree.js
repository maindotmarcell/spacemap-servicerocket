import React, { useState, useCallback } from 'react';
import ReactFlow, {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Controls,
	ReactFlowProvider,
	useReactFlow,
} from 'react-flow-renderer';

const initialNodes = [
	{
		id: '1',
		type: 'input',
		data: { label: 'First page' },
		position: { x: 100, y: 25 },
	},

	{
		id: '2',
		// you can also pass a React component as a label
		data: { label: <div>Child Page</div> },
		position: { x: 100, y: 125 },
	},
	{
		id: '3',
		type: 'output',
		data: { label: 'Grandchild page' },
		position: { x: 100, y: 225 },
	},
	// New Tree
	{
		id: '4',
		type: 'input',
		data: { label: 'other page' },
		position: { x: 450, y: 25 },
	},
	{
		id: '5',
		type: 'output',
		data: { label: 'Child 1' },
		position: { x: 350, y: 125 },
	},
	{
		id: '6',
		data: { label: 'Child 2' },
		position: { x: 550, y: 125 },
	},
	{
		id: '7',
		type: 'output',
		data: { label: 'Grandchild 1 of Child2' },
		position: { x: 550, y: 225 },
	},
];

const initialEdges = [
	{ id: 'e1-2', source: '1', target: '2', animated: true },
	{ id: 'e2-3', source: '2', target: '3', animated: true },
	// second tree edges
	{ id: 'e4-5', source: '4', target: '5', animated: true },
	{ id: 'e4-6', source: '4', target: '6', animated: true },
	{ id: 'e6-7', source: '6', target: '7', animated: true },
];

function Flow() {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);
	const onNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes]
	);
	const onEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	);
	const onConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges]
	);


	return (
		<ReactFlowProvider>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<Controls />
			</ReactFlow>
		</ReactFlowProvider>
	);
}

export default Flow;
