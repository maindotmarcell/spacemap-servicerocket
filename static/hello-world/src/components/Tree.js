import React, {
	useState,
	useCallback,
	useEffect,
	useContext,
	useRef,
} from 'react';
import ReactFlow, {
	ConnectionLineType,
	useNodesState,
	useEdgesState,
	Controls,
	MiniMap,
} from 'react-flow-renderer';
import { invoke } from '@forge/bridge';
import Select from 'react-select';
import PageContext from '../context/PageContext';
import LoadingContext from '../context/LoadingContext';
import { useSpace } from '../hooks/useSpace.js';
import { pageNodes, pageEdges } from './helpers/nodes-edges.js';
import getLayoutedElements from './helpers/getLayoutedElements.js';
import '../index.css';
import * as ReactBootStrap from 'react-bootstrap';
// import 'reactflow/dist/style.css';

const LayoutFlow = () => {
	// setting the nodes and edges from the fetched data
	const [initialNodes, setInitialNodes] = useState([]);
	const [initialEdges, setInitialEdges] = useState([]);

	// to keep track of current layout
	const [layoutedNodes, setLayoutedNodes] = useState([]);
	const [layoutedEdges, setLayoutedEdges] = useState([]);

	// reactflow's own custom hooks render and re-renders nodes
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	// to keep track of the direction of the layout
	const [direction, setDirection] = useState('TB');

	// getting pages from context, application re-renders when pages change (ex: refreshPages)
	const { pages, refreshPages } = useContext(PageContext);

	// getting loading status from context for rendering
	const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);

	// getting space list
	const { spaceList } = useSpace();

	const dragRef = useRef(null); // this ref stores the current dragged node
	const [target, setTarget] = useState(null); // target is the node that the node is dragged over

	// selecting default space, hardcoded for now, will be the first in the space array
	const [selectedOption, setSelectedOption] = useState({
		label: 'BC',
		value: 'BC',
	});

	// initialising page by calling the refresh function from context
	useEffect(() => {
		startLoading();
		refreshPages(selectedOption.value).then(() => stopLoading());
	}, [selectedOption.value]);

	useEffect(() => {
		setInitialNodes(pageNodes(pages, selectedOption.value));
		setInitialEdges(pageEdges(pages));
	}, [pages]);

	// after nodes are set, we get layout from them
	useEffect(() => {
		const [layoutNodes, layoutEdges] = getLayoutedElements(
			initialNodes,
			initialEdges,
			direction
		);
		setLayoutedNodes(layoutNodes);
		setLayoutedEdges(layoutEdges);
	}, [initialNodes, initialEdges, direction]);

	// we set the react flow custom state nodes to trigger render
	useEffect(() => {
		setNodes(layoutedNodes);
		setEdges(layoutedEdges);
	}, [layoutedNodes, layoutedEdges]);

	// we set the color of the nodes based on which one is the target
	useEffect(() => {
		setNodes((nodes) =>
			nodes.map((node) => {
				if (target) {
					if (node.id === target.id) {
						node.style = {
							...node.style,
							backgroundColor: '#9CA8B3',
						};
					} else if (node.id === dragRef.current.id && target) {
					}
				} else {
					node.style = { ...node.style, backgroundColor: '#ffffff' };
					node.data = { ...node.data, label: node.data.label };
				}
				return node;
			})
		);
	}, [target]);

	// DRAG AND DROP, collision detection code here -----------------------------------

	// We extract node that is being dragged
	const onNodeDragStart = (evt, node) => {
		dragRef.current = node;
	};

	// we compare positions to know when they overlay and set target
	const onNodeDrag = (evt, node) => {
		// calculate the center point of the node from position and dimensions
		const centerX = node.position.x + node.width / 2;
		const centerY = node.position.y + node.height / 2;

		// find a node where the center point is inside
		const targetNode = nodes.find((n) => {
			// console.log(n);
			return (
				centerX > n.position.x &&
				centerX < n.position.x + n.width &&
				centerY > n.position.y &&
				centerY < n.position.y + n.height &&
				n.id !== node.id // this is needed, otherwise we would always find the dragged node
			);
		});

		setTarget(targetNode);
	};

	// we trigger movePage api call when user drops element
	const onNodeDragStop = (evt, node) => {
		if (target) {
			startLoading();
			invoke('movePage', {
				pageID: node.id,
				targetID: target.id,
			})
				.then((data) => {
					console.log(data);
					refreshPages(selectedOption.value).then(() => stopLoading());
				})
				.catch((err) => console.log(err));
		}

		setTarget(null);
		dragRef.current = null;
	};

	// End of Drag and drop -----------------------------------------------------------

	// called to change layout direction
	const onLayout = useCallback(
		(direction) => {
			const [layoutNodes, layoutEdges] = getLayoutedElements(
				initialNodes,
				initialEdges,
				direction
			);
			setLayoutedNodes(layoutNodes);
			setLayoutedEdges(layoutEdges);

			setNodes([...layoutedNodes]);
			setEdges([...layoutedEdges]);
			setDirection(direction);
		},
		[nodes, edges]
	);

	return (
		<div className="layoutflow">
			{isLoading && (
				<div className='semi-transparent'>
					<ReactBootStrap.Spinner className="spinner" animation="border" />
				</div>
			)}
			<Select
				className="select"
				placeholder="select a space"
				value={selectedOption}
				onChange={setSelectedOption}
				options={spaceList}
			/>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
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
