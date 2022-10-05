import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import Data from './data/Data';
import Tree from './components/Tree';
import './App.css';
import LayoutFlow from './components/Dagre';

function App() {

	return (
		<div className="App">
			{/* {data ? data : 'Loading...'} */}
			{/* <Data /> */}
			{/* <Tree /> */}
			<LayoutFlow />
		</div>
	);
}

export default App;
