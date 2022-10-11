import React, { useEffect, useState } from 'react';
import Data from './data/Data';
import Tree from './components/Tree';
import './App.css';
import LayoutFlow from './components/Dagre';
import TitleForm from './components/TitleForm'
import MoveForm from './components/MoveForm';

function App() {

	return (
		<div className="App">
			{/* {data ? data : 'Loading...'} */}
			{/* <Data /> */}
			{/* <Tree /> */}
			{/* <div><h1>Hello</h1></div> */}
			<TitleForm />
			<MoveForm />
			<LayoutFlow />
		</div>
	);
}

export default App;
