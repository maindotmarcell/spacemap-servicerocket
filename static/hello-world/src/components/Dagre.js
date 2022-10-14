import React, {
	useState,
	useCallback,
	useEffect,
	useContext,
	useRef,
} from 'react';
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

	// this ref stores the current dragged node
	const dragRef = useRef(null);
	// target is the node that the node is dragged over
	const [target, setTarget] = useState(null);

	useEffect(() => {
		refreshPages();
	}, []);

	useEffect(() => {
		setInitialNodes(pageNodes(pages));
		setInitialEdges(pageEdges(pages));

		// console.log(pages);
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

	useEffect(() => {
		// whenever the target changes, we swap the colors temporarily
		// this is just a placeholder, implement your own logic here
		setNodes((nodes) =>
			nodes.map((node) => {
				if (target) {
					if (node.id === target.id) {
						node.style = {
							...node.style,
							backgroundColor: '#9CA8B3',
						};
						// node.data = { ...node.data, label: "Drop here to move page"};
					} else if (node.id === dragRef.current.id && target) {
					}
				} else {
					node.style = { ...node.style, backgroundColor: node.data.color };
					node.data = { ...node.data, label: node.data.label };
				}
				return node;
			})
		);
	}, [target]);
	// console.log('initial: ', initialNodes);
	// console.log('layouted: ', layoutedNodes);
	// console.log(initialEdges);

	// DRAG AND DROP, collision detection code here -----------------------------------

	const onNodeDragStart = (evt, node) => {
		dragRef.current = node;
	};

	const onNodeDrag = (evt, node) => {
		// calculate the center point of the node from position and dimensions
		const centerX = node.position.x + node.width / 2;
		const centerY = node.position.y + node.height / 2;

		// find a node where the center point is inside
		const targetNode = nodes.find(
			(n) =>
				centerX > n.position.x &&
				centerX < n.position.x + n.width &&
				centerY > n.position.y &&
				centerY < n.position.y + n.height &&
				n.id !== node.id // this is needed, otherwise we would always find the dragged node
		);

		setTarget(targetNode);
	};

	const onNodeDragStop = (evt, node) => {
		// on drag stop, we swap the colors of the nodes
		// const nodeColor = node.data.label;
		// if (target) {}
		// const targetColor = target?.data.label;

		// setNodes((nodes) =>
		// 	nodes.map((n) => {
		// 		if (n.id === node.id && target) {
		// 			n.data = { ...n.data, color: targetColor, label: targetColor };
		// 		}
		// 		return n;
		// 	})
		// );

		if (target) {
			console.log(node.id);
			target ? console.log(target.id) : console.log('no target');
		}

		// setTarget(null);
		// dragRef.current = null;
	};

	// End of Drag and drop -----------------------------------------------------------

	// console.log(nodes);
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
				onNodeDrag={onNodeDrag}
				onNodeDragStart={onNodeDragStart}
				onNodeDragStop={onNodeDragStop}
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
